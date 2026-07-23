import { BlogPost } from '../types';
import treeImg from '../assets/images/asofeder_tree_nursery_1784664209449.jpg';
import musoImg from '../assets/images/asofeder_muso_meeting_1784664199035.jpg';
import cleanWaterImg from '../assets/images/asofeder_clean_water_1784664221013.jpg';
import heroImg from '../assets/images/hero_asofeder_women_1784664187658.jpg';
import { FALLBACK_BLOG_POSTS } from '../data/content';

export const WP_API_URL = 'https://crm.asofeder.org/wp-json/wp/v2/posts?_embed';
export const GRAPHQL_API_URL = 'https://crm.asofeder.org/graphql';
export const WP_RSS_FEED_URL = 'https://crm.asofeder.org/feed/';

const FALLBACK_IMAGES = [treeImg, musoImg, cleanWaterImg, heroImg];

function decodeHtmlEntities(text: string): string {
  if (!text) return '';
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    return doc.body.textContent || text;
  } catch {
    return text.replace(/&amp;/g, '&').replace(/&#8211;/g, '-').replace(/&rsquo;/g, "'").replace(/&quot;/g, '"');
  }
}

function stripHtmlTags(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '').trim();
}

function mapCategory(termName: string, titleAndExcerpt: string, index: number): string {
  const cleanTerm = termName ? termName.trim() : '';
  const lowerTerm = cleanTerm.toLowerCase();
  
  if (cleanTerm && lowerTerm !== 'uncategorized' && lowerTerm !== 'non classé' && lowerTerm !== 'général') {
    return cleanTerm;
  }

  const text = titleAndExcerpt.toLowerCase();
  if (text.includes('eau') || text.includes('wash') || text.includes('hygiène') || text.includes('assainissement')) {
    return 'WASH';
  }
  if (text.includes('arbre') || text.includes('pépinière') || text.includes('reboisement') || text.includes('environnement')) {
    return 'Environnement';
  }
  if (text.includes('muso') || text.includes('épargne') || text.includes('crédit') || text.includes('finance') || text.includes('micro')) {
    return 'Micro-finance';
  }
  if (text.includes('agri') || text.includes('semence') || text.includes('culture') || text.includes('cassave') || text.includes('champ')) {
    return 'Agriculture';
  }
  if (text.includes('école') || text.includes('élève') || text.includes('formation') || text.includes('alphabétisation')) {
    return 'Éducation';
  }

  const defaults = ['Agriculture', 'Environnement', 'Micro-finance', 'WASH', 'Éducation'];
  return defaults[index % defaults.length];
}

/**
 * Parse raw RSS XML string using browser DOMParser
 */
function parseRssXml(xmlText: string, limit: number): BlogPost[] | null {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const itemNodes = Array.from(xmlDoc.querySelectorAll('item')).slice(0, limit);

    if (itemNodes.length === 0) return null;

    return itemNodes.map((item, index) => {
      const title = item.querySelector('title')?.textContent || 'Article ASOFEDER';
      const link = item.querySelector('link')?.textContent || '';
      const pubDateStr = item.querySelector('pubDate')?.textContent || '';
      
      let creator = 'Direction ASOFEDER';
      const dcCreator = item.getElementsByTagNameNS('*', 'creator')[0] || item.querySelector('dc\\:creator');
      if (dcCreator?.textContent) {
        creator = dcCreator.textContent;
      }

      const categories = Array.from(item.querySelectorAll('category')).map(c => c.textContent || '');
      const termName = categories.length > 0 ? categories[0] : '';

      const contentEncodedNode = item.getElementsByTagNameNS('*', 'encoded')[0];
      const contentEncoded = contentEncodedNode?.textContent || '';
      const description = item.querySelector('description')?.textContent || '';
      const fullContent = contentEncoded || description;

      const cleanTitle = decodeHtmlEntities(title);
      const cleanExcerpt = decodeHtmlEntities(stripHtmlTags(description || contentEncoded));

      let imageUrl = '';
      const mediaContent = item.getElementsByTagNameNS('*', 'content')[0] || item.querySelector('enclosure');
      if (mediaContent) {
        imageUrl = mediaContent.getAttribute('url') || '';
      }

      if (!imageUrl || imageUrl.length < 5) {
        const imgMatch = fullContent.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (imgMatch && imgMatch[1]) {
          imageUrl = imgMatch[1];
        }
      }

      if (imageUrl && imageUrl.startsWith('/wp-content')) {
        imageUrl = `https://crm.asofeder.org${imageUrl}`;
      }
      if (imageUrl && imageUrl.startsWith('http:')) {
        imageUrl = imageUrl.replace('http:', 'https:');
      }

      if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.length < 10) {
        imageUrl = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
      }

      const categoryName = mapCategory(termName, cleanTitle + ' ' + cleanExcerpt, index);

      const postDate = pubDateStr ? new Date(pubDateStr) : new Date();
      const formattedDate = postDate.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      return {
        id: link || item.querySelector('guid')?.textContent || `${index}-${Date.now()}`,
        title: cleanTitle,
        excerpt: cleanExcerpt ? (cleanExcerpt.length > 180 ? cleanExcerpt.slice(0, 180) + '...' : cleanExcerpt) : 'Découvrez les détails de cette initiative sur le terrain...',
        content: fullContent,
        imageUrl,
        date: formattedDate,
        author: creator,
        category: categoryName,
        link: link
      };
    });
  } catch (err) {
    console.error('Error parsing RSS XML:', err);
    return null;
  }
}

/**
 * Fetch articles via WordPress RSS Feed with real-time cache busting
 */
async function fetchRssFeedPosts(limit: number = 12): Promise<BlogPost[] | null> {
  const nonce = Date.now();
  // Standard WordPress RSS2 URL with timestamp query parameter to bypass both WordPress server cache and proxy/service caching
  const liveWpFeedUrl = `https://crm.asofeder.org/?feed=rss2&_t=${nonce}`;

  // Method 1: Try rss2json with live cache-busting feed URL
  try {
    const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(liveWpFeedUrl)}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(rss2jsonUrl, {
      cache: 'no-store',
      signal: controller.signal
    });
    clearTimeout(timer);

    if (res.ok) {
      const json = await res.json();
      if (json.status === 'ok' && Array.isArray(json.items) && json.items.length > 0) {
        const items = json.items.slice(0, limit);
        return items.map((item: any, index: number) => {
          const rawTitle = item.title || 'Article ASOFEDER';
          const cleanTitle = decodeHtmlEntities(rawTitle);

          const rawContent = item.content || item.description || '';
          const cleanExcerpt = decodeHtmlEntities(stripHtmlTags(item.description || rawContent));

          let imageUrl = item.thumbnail || item.enclosure?.link;
          if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.length < 5) {
            const imgMatch = rawContent.match(/<img[^>]+src=["']([^"']+)["']/i);
            if (imgMatch && imgMatch[1]) {
              imageUrl = imgMatch[1];
            }
          }

          if (imageUrl && imageUrl.startsWith('/wp-content')) {
            imageUrl = `https://crm.asofeder.org${imageUrl}`;
          }
          if (imageUrl && imageUrl.startsWith('http:')) {
            imageUrl = imageUrl.replace('http:', 'https:');
          }

          if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.length < 10) {
            imageUrl = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
          }

          const termName = item.categories && item.categories.length > 0 ? item.categories[0] : '';
          const categoryName = mapCategory(termName, cleanTitle + ' ' + cleanExcerpt, index);

          const postDate = item.pubDate ? new Date(item.pubDate) : new Date();
          const formattedDate = postDate.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });

          return {
            id: item.guid || item.link || String(index),
            title: cleanTitle,
            excerpt: cleanExcerpt ? (cleanExcerpt.length > 180 ? cleanExcerpt.slice(0, 180) + '...' : cleanExcerpt) : 'Découvrez les détails de cette initiative sur le terrain...',
            content: rawContent,
            imageUrl,
            date: formattedDate,
            author: item.author || 'Direction ASOFEDER',
            category: categoryName,
            link: item.link
          };
        });
      }
    }
  } catch {
    // Continue
  }

  // Method 2: Codetabs CORS proxy
  try {
    const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(liveWpFeedUrl)}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(proxyUrl, {
      cache: 'no-store',
      signal: controller.signal
    });
    clearTimeout(timer);

    if (res.ok) {
      const xmlText = await res.text();
      if (xmlText.includes('<item>')) {
        const posts = parseRssXml(xmlText, limit);
        if (posts && posts.length > 0) {
          return posts;
        }
      }
    }
  } catch {
    // Continue
  }

  // Method 3: Direct XML fetch via AllOrigins CORS proxy with clean feed URL
  try {
    const proxyXmlUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(liveWpFeedUrl)}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(proxyXmlUrl, {
      cache: 'no-store',
      signal: controller.signal
    });
    clearTimeout(timer);

    if (res.ok) {
      const xmlText = await res.text();
      if (xmlText.includes('<item>')) {
        const posts = parseRssXml(xmlText, limit);
        if (posts && posts.length > 0) {
          return posts;
        }
      }
    }
  } catch {
    // Fallback
  }

  return null;
}

function extractImageUrl(item: any, index: number): string {
  const wpDomain = 'https://crm.asofeder.org';

  const featuredMedia = item._embedded?.['wp:featuredmedia']?.[0];
  let urlCandidate =
    featuredMedia?.source_url ||
    featuredMedia?.media_details?.sizes?.full?.source_url ||
    featuredMedia?.media_details?.sizes?.large?.source_url ||
    featuredMedia?.media_details?.sizes?.medium_large?.source_url ||
    featuredMedia?.media_details?.sizes?.medium?.source_url ||
    featuredMedia?.media_details?.sizes?.thumbnail?.source_url ||
    featuredMedia?.guid?.rendered ||
    item.featured_media_src_url ||
    item.jetpack_featured_media_url ||
    item.better_featured_image?.source_url ||
    item.featured_image_url;

  if (!urlCandidate || typeof urlCandidate !== 'string') {
    const combinedHtml = (item.content?.rendered || '') + ' ' + (item.excerpt?.rendered || '');
    const imgMatch = combinedHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch && imgMatch[1]) {
      urlCandidate = imgMatch[1];
    }
  }

  if (urlCandidate && typeof urlCandidate === 'string') {
    let cleanUrl = urlCandidate.trim().replace(/&amp;/g, '&');

    if (cleanUrl.startsWith('/wp-content')) {
      cleanUrl = `${wpDomain}${cleanUrl}`;
    }

    if (cleanUrl.startsWith('http:')) {
      cleanUrl = cleanUrl.replace('http:', 'https:');
    }

    if (cleanUrl.startsWith('https://') || cleanUrl.startsWith('data:image')) {
      return cleanUrl;
    }
  }

  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

function parseWpPosts(data: any[]): BlogPost[] {
  if (!Array.isArray(data)) return [];

  return data.map((item: any, index: number) => {
    const imageUrl = extractImageUrl(item, index);

    const authorObj = item._embedded?.['author']?.[0];
    const authorName = authorObj?.name || 'Direction ASOFEDER';

    const rawTitle = item.title?.rendered || 'Article ASOFEDER';
    const cleanTitle = decodeHtmlEntities(rawTitle);

    const rawExcerpt = item.excerpt?.rendered || '';
    const cleanExcerpt = decodeHtmlEntities(stripHtmlTags(rawExcerpt));

    const terms = item._embedded?.['wp:term']?.[0];
    const termName = terms && terms.length > 0 ? decodeHtmlEntities(terms[0].name) : '';
    const categoryName = mapCategory(termName, cleanTitle + ' ' + cleanExcerpt, index);

    const postDate = item.date ? new Date(item.date) : new Date();
    const formattedDate = postDate.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    return {
      id: item.id,
      title: cleanTitle,
      excerpt: cleanExcerpt ? (cleanExcerpt.length > 180 ? cleanExcerpt.slice(0, 180) + '...' : cleanExcerpt) : 'Découvrez les détails de cette initiative sur le terrain...',
      content: item.content?.rendered || '',
      imageUrl,
      date: formattedDate,
      author: authorName,
      category: categoryName,
      link: item.link
    };
  });
}

/**
 * Fetch via WordPress REST API
 */
async function fetchRestApiPosts(limit: number = 12): Promise<BlogPost[] | null> {
  const nonce = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const directUrl = `${WP_API_URL}&per_page=${limit}&_t=${nonce}`;

  const urlsToTry = [
    directUrl,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(directUrl)}`
  ];

  for (const url of urlsToTry) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(url, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' },
        signal: controller.signal
      });
      clearTimeout(timer);

      if (!res.ok) continue;

      const text = await res.text();
      if (text.includes('sgcaptcha') || text.includes('<!DOCTYPE html')) {
        continue;
      }

      const data = JSON.parse(text);
      if (Array.isArray(data) && data.length > 0) {
        return parseWpPosts(data);
      }
    } catch {
      // Ignore and continue
    }
  }

  return null;
}

/**
 * Fetch via WPGraphQL
 */
async function fetchGraphQLPosts(limit: number = 12): Promise<BlogPost[] | null> {
  const query = `
    query GetPosts($first: Int) {
      posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          databaseId
          id
          title
          excerpt
          content
          date
          link
          author {
            node {
              name
            }
          }
          categories {
            nodes {
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(GRAPHQL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      },
      cache: 'no-store',
      body: JSON.stringify({
        query,
        variables: { first: limit }
      }),
      signal: controller.signal
    });
    clearTimeout(timer);

    if (!res.ok) return null;
    const json = await res.json();
    if (!json.data?.posts?.nodes) return null;

    const nodes = json.data.posts.nodes;
    if (nodes.length === 0) return null;

    return nodes.map((node: any, index: number) => {
      let imageUrl = node.featuredImage?.node?.sourceUrl;

      if (!imageUrl || typeof imageUrl !== 'string') {
        const combinedHtml = (node.content || '') + ' ' + (node.excerpt || '');
        const imgMatch = combinedHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (imgMatch && imgMatch[1]) {
          imageUrl = imgMatch[1];
        }
      }

      if (imageUrl && imageUrl.startsWith('/wp-content')) {
        imageUrl = `https://crm.asofeder.org${imageUrl}`;
      }
      if (imageUrl && imageUrl.startsWith('http:')) {
        imageUrl = imageUrl.replace('http:', 'https:');
      }

      if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.length < 10) {
        imageUrl = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
      }

      const rawTitle = node.title || 'Article ASOFEDER';
      const cleanTitle = decodeHtmlEntities(rawTitle);
      const rawExcerpt = node.excerpt || '';
      const cleanExcerpt = decodeHtmlEntities(stripHtmlTags(rawExcerpt));

      const categoryName = node.categories?.nodes?.[0]?.name 
        ? decodeHtmlEntities(node.categories.nodes[0].name)
        : mapCategory('', cleanTitle + ' ' + cleanExcerpt, index);

      const postDate = node.date ? new Date(node.date) : new Date();
      const formattedDate = postDate.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      return {
        id: node.databaseId || node.id,
        title: cleanTitle,
        excerpt: cleanExcerpt ? (cleanExcerpt.length > 180 ? cleanExcerpt.slice(0, 180) + '...' : cleanExcerpt) : 'Découvrez les détails de cette initiative sur le terrain...',
        content: node.content || '',
        imageUrl,
        date: formattedDate,
        author: node.author?.node?.name || 'Direction ASOFEDER',
        category: categoryName,
        link: node.link
      };
    });
  } catch {
    return null;
  }
}

import { getStoredBlogPosts } from './blogStorage';

export async function fetchWordPressPosts(limit: number = 12): Promise<BlogPost[]> {
  // Always return stored CRM posts first to guarantee instant updates, deletions, and additions
  const storedPosts = getStoredBlogPosts();
  return storedPosts.slice(0, limit);
}
