import { BlogPost } from '../types';

export const WP_API_URL = 'https://crm.asofeder.org/wp-json/wp/v2/posts?_embed';

export interface WPFetchResult {
  posts: BlogPost[];
  isSgCaptchaBlocked: boolean;
  error?: string;
}

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

export async function fetchWordPressPostsDetailed(limit: number = 10): Promise<WPFetchResult> {
  const url = `${WP_API_URL}&per_page=${limit}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const contentType = res.headers.get('content-type') || '';
    const text = await res.text();

    // Check if SiteGround captcha or HTML protection was returned instead of JSON
    if (text.includes('sgcaptcha') || text.includes('/.well-known/sgcaptcha') || contentType.includes('text/html')) {
      console.warn('SiteGround Anti-Bot (sgcaptcha) bloque l\'accès REST API sur crm.asofeder.org');
      return {
        posts: [],
        isSgCaptchaBlocked: true,
        error: 'SG_CAPTCHA_BLOCKED'
      };
    }

    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      return {
        posts: [],
        isSgCaptchaBlocked: true,
        error: 'INVALID_JSON'
      };
    }

    if (!Array.isArray(data)) {
      return { posts: [], isSgCaptchaBlocked: false };
    }

    const posts: BlogPost[] = data.map((item: any) => {
      const featuredMedia = item._embedded?.['wp:featuredmedia']?.[0];
      const imageUrl = featuredMedia?.source_url 
        || featuredMedia?.media_details?.sizes?.large?.source_url
        || featuredMedia?.media_details?.sizes?.full?.source_url
        || '/src/assets/images/asofeder_tree_nursery_1784664209449.jpg';

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

    return {
      posts,
      isSgCaptchaBlocked: false
    };
  } catch (error: any) {
    console.warn('Erreur de réseau ou CORS lors de la connexion à WordPress:', error);
    return {
      posts: [],
      isSgCaptchaBlocked: true,
      error: error?.message || 'NETWORK_ERROR'
    };
  }
}

export async function fetchWordPressPosts(limit: number = 10): Promise<BlogPost[]> {
  const result = await fetchWordPressPostsDetailed(limit);
  return result.posts;
}

