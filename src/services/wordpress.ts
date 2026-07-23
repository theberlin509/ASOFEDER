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
 * Fetch articles via WordPress RSS Feed (bypasses SiteGround Anti-Bot blocking)
 */
async function fetchRssFeedPosts(limit: number = 12): Promise<BlogPost[] | null> {
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(WP_RSS_FEED_URL)}&_t=${Date.now()}`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timer);

    if (!res.ok) return null;
    const json = await res.json();
    if (json.status !== 'ok' || !Array.isArray(json.items) || json.items.length === 0) {
      return null;
    }

    const items = json.items.slice(0, limit);
    return items.map((item: any, index: number) => {
      const rawTitle = item.title || 'Article ASOFEDER';
      const cleanTitle = decodeHtmlEntities(rawTitle);

      const rawContent = item.content || item.description || '';
      const cleanExcerpt = decodeHtmlEntities(stripHtmlTags(item.description || rawContent));

      // Extract image from thumbnail, enclosure or content body
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
        content: item.content || item.description || '',
        imageUrl,
        date: formattedDate,
        author: item.author || 'Direction ASOFEDER',
        category: categoryName,
        link: item.link
      };
    });
  } catch {
    return null;
  }
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
  const timestamp = Date.now();
  const directUrl = `${WP_API_URL}&per_page=${limit}&_t=${timestamp}`;

  const urlsToTry = [
    directUrl,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(directUrl)}`
  ];

  for (const url of urlsToTry) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(url, { signal: controller.signal });
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
      headers: { 'Content-Type': 'application/json' },
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

export async function fetchWordPressPosts(limit: number = 12): Promise<BlogPost[]> {
  // 1. First try RSS Feed via rss2json (Bypasses SiteGround Anti-Bot completely)
  const rssPosts = await fetchRssFeedPosts(limit);
  if (rssPosts && rssPosts.length > 0) {
    return rssPosts;
  }

  // 2. Try REST API
  const restPosts = await fetchRestApiPosts(limit);
  if (restPosts && restPosts.length > 0) {
    return restPosts;
  }

  // 3. Try WPGraphQL
  const gqlPosts = await fetchGraphQLPosts(limit);
  if (gqlPosts && gqlPosts.length > 0) {
    return gqlPosts;
  }

  // 4. Fallback to local default posts if all external methods fail
  return FALLBACK_BLOG_POSTS;
}
