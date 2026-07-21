import { BlogPost } from '../types';
import treeImg from '../assets/images/asofeder_tree_nursery_1784664209449.jpg';
import musoImg from '../assets/images/asofeder_muso_meeting_1784664199035.jpg';
import cleanWaterImg from '../assets/images/asofeder_clean_water_1784664221013.jpg';
import heroImg from '../assets/images/hero_asofeder_women_1784664187658.jpg';
import { FALLBACK_BLOG_POSTS } from '../data/content';

export const WP_API_URL = 'https://crm.asofeder.org/wp-json/wp/v2/posts?_embed';

const FALLBACK_IMAGES = [treeImg, musoImg, cleanWaterImg, heroImg];

let cachedPostsMemory: BlogPost[] | null = null;

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

  // Fallback round-robin
  const defaults = ['Agriculture', 'Environnement', 'Micro-finance', 'WASH', 'Éducation'];
  return defaults[index % defaults.length];
}

function parseWpPosts(data: any[]): BlogPost[] {
  if (!Array.isArray(data)) return [];

  return data.map((item: any, index: number) => {
    const featuredMedia = item._embedded?.['wp:featuredmedia']?.[0];
    let imageUrl = featuredMedia?.source_url 
      || featuredMedia?.media_details?.sizes?.large?.source_url
      || featuredMedia?.media_details?.sizes?.full?.source_url;

    // Convert http to https if applicable
    if (imageUrl && imageUrl.startsWith('http:')) {
      imageUrl = imageUrl.replace('http:', 'https:');
    }

    // If no image or invalid media URL, assign a rich local fallback asset
    if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.length < 10) {
      imageUrl = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
    }

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

async function fetchWithTimeout(url: string, timeoutMs: number = 3000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
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
  // 1. Check in-memory cache
  if (cachedPostsMemory && cachedPostsMemory.length > 0) {
    return limit ? cachedPostsMemory.slice(0, limit) : cachedPostsMemory;
  }

  // 2. Check SessionStorage cache
  try {
    const sessionData = sessionStorage.getItem('asofeder_wp_posts');
    if (sessionData) {
      const parsed = JSON.parse(sessionData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        cachedPostsMemory = parsed;
        return limit ? parsed.slice(0, limit) : parsed;
      }
    }
  } catch {
    // Ignore sessionStorage errors
  }

  const targetUrl = `${WP_API_URL}&per_page=${limit}`;

  const fetchUrls = [
    targetUrl,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
    `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`
  ];

  for (const url of fetchUrls) {
    try {
      const res = await fetchWithTimeout(url, 3200);
      if (!res.ok) continue;

      const contentType = res.headers.get('content-type') || '';
      const text = await res.text();

      if (text.includes('sgcaptcha') || text.includes('<!DOCTYPE html') || contentType.includes('text/html')) {
        continue;
      }

      const data = JSON.parse(text);
      if (Array.isArray(data) && data.length > 0) {
        const parsedPosts = parseWpPosts(data);
        if (parsedPosts.length > 0) {
          cachedPostsMemory = parsedPosts;
          try {
            sessionStorage.setItem('asofeder_wp_posts', JSON.stringify(parsedPosts));
          } catch {
            // ignore
          }
          return parsedPosts;
        }
      }
    } catch (err) {
      console.warn(`Attempt failed for ${url}:`, err);
    }
  }

  // Fallback to local curated posts if network/proxy is unavailable
  return FALLBACK_BLOG_POSTS;
}


