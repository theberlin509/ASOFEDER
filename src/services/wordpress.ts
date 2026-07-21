import { BlogPost } from '../types';

export const WP_API_URL = 'https://crm.asofeder.org/wp-json/wp/v2/posts?_embed';

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

function parseWpPosts(data: any[]): BlogPost[] {
  if (!Array.isArray(data)) return [];

  return data.map((item: any) => {
    const featuredMedia = item._embedded?.['wp:featuredmedia']?.[0];
    const imageUrl = featuredMedia?.source_url 
      || featuredMedia?.media_details?.sizes?.large?.source_url
      || featuredMedia?.media_details?.sizes?.full?.source_url
      || '/images/asofeder_tree_nursery_1784664209449.jpg';

    const authorObj = item._embedded?.['author']?.[0];
    const authorName = authorObj?.name || 'ASOFEDER';

    const terms = item._embedded?.['wp:term']?.[0];
    const categoryName = terms && terms.length > 0 ? decodeHtmlEntities(terms[0].name) : 'Actualité';

    const rawTitle = item.title?.rendered || 'Article ASOFEDER';
    const cleanTitle = decodeHtmlEntities(rawTitle);

    const rawExcerpt = item.excerpt?.rendered || '';
    const cleanExcerpt = decodeHtmlEntities(stripHtmlTags(rawExcerpt));

    const postDate = item.date ? new Date(item.date) : new Date();
    const formattedDate = postDate.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    return {
      id: item.id,
      title: cleanTitle,
      excerpt: cleanExcerpt ? (cleanExcerpt.length > 180 ? cleanExcerpt.slice(0, 180) + '...' : cleanExcerpt) : 'Lire la suite de cet article...',
      content: item.content?.rendered || '',
      imageUrl,
      date: formattedDate,
      author: authorName,
      category: categoryName,
      link: item.link
    };
  });
}

export async function fetchWordPressPosts(limit: number = 10): Promise<BlogPost[]> {
  const targetUrl = `${WP_API_URL}&per_page=${limit}`;

  // List of strategies to fetch: direct, CORS proxy 1, CORS proxy 2
  const fetchUrls = [
    targetUrl,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
    `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`
  ];

  for (const url of fetchUrls) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!res.ok) continue;

      const contentType = res.headers.get('content-type') || '';
      const text = await res.text();

      // Skip HTML or Captcha responses
      if (text.includes('sgcaptcha') || text.includes('<!DOCTYPE html') || contentType.includes('text/html')) {
        continue;
      }

      const data = JSON.parse(text);
      if (Array.isArray(data) && data.length > 0) {
        return parseWpPosts(data);
      }
    } catch (err) {
      console.warn(`Failed fetching WP posts from ${url}:`, err);
    }
  }

  return [];
}


