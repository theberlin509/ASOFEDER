import { BlogPost } from '../types';
import treeImg from '../assets/images/asofeder_tree_nursery_1784664209449.jpg';
import musoImg from '../assets/images/asofeder_muso_meeting_1784664199035.jpg';
import cleanWaterImg from '../assets/images/asofeder_clean_water_1784664221013.jpg';
import heroImg from '../assets/images/hero_asofeder_women_1784664187658.jpg';
import { FALLBACK_BLOG_POSTS } from '../data/content';

export const WP_API_URL = 'https://crm.asofeder.org/wp-json/wp/v2/posts?_embed';
export const GRAPHQL_API_URL = 'https://crm.asofeder.org/graphql';

const FALLBACK_IMAGES = [treeImg, musoImg, cleanWaterImg, heroImg];

function decodeHtmlEntities(text: string): string {
  if (!text) return '';
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    return doc.body.textContent || text;
  } catch {
    return text.replace(/&amp;/g, '&').replace(/&#8211;/g, '-').replace(/&rsquo;/g, "'");
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

  // Infer category from title/content
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
 * Attempt fetching via WPGraphQL first if installed on crm.asofeder.org
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
    const res = await fetch(GRAPHQL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { first: limit }
      })
    });

    if (!res.ok) return null;
    const json = await res.json();
    if (!json.data?.posts?.nodes) return null;

    const nodes = json.data.posts.nodes;
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

async function fetchWithTimeout(url: string, timeoutMs: number = 4000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 
        'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store'
      },
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export async function fetchWordPressPosts(limit: number = 12): Promise<BlogPost[]> {
  // 1. First try WPGraphQL endpoint
  const gqlPosts = await fetchGraphQLPosts(limit);
  if (gqlPosts && gqlPosts.length > 0) {
    return gqlPosts;
  }

  // 2. Otherwise try REST API with CORS proxy
  const timestamp = Date.now();
  const targetUrl = `${WP_API_URL}&per_page=${limit}&_t=${timestamp}`;

  const fetchUrls = [
    targetUrl,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`
  ];

  for (const url of fetchUrls) {
    try {
      const res = await fetchWithTimeout(url, 4000);
      if (!res.ok) continue;

      const contentType = res.headers.get('content-type') || '';
      const text = await res.text();

      if (text.includes('sgcaptcha') || text.includes('<!DOCTYPE html') || contentType.includes('text/html')) {
        continue;
      }

      const data = JSON.parse(text);
      if (Array.isArray(data)) {
        return parseWpPosts(data);
      }
    } catch {
      // Continue to next
    }
  }

  return FALLBACK_BLOG_POSTS;
}
