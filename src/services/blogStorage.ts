import { BlogPost } from '../types';
import treeImg from '../assets/images/asofeder_tree_nursery_1784664209449.jpg';
import musoImg from '../assets/images/asofeder_muso_meeting_1784664199035.jpg';
import cleanWaterImg from '../assets/images/asofeder_clean_water_1784664221013.jpg';
import heroImg from '../assets/images/hero_asofeder_women_1784664187658.jpg';

const STORAGE_KEY = 'asofeder_crm_posts_v1';
const SESSION_KEY = 'asofeder_admin_session_v1';

export interface AdminUser {
  username: string;
  name: string;
}

export const ADMIN_CREDENTIALS = [
  { username: 'Justilien', password: '2027@@@@jus', name: 'Justilien' },
  { username: 'PRL', password: '2026@@@@jus', name: 'PRL' }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-init-1',
    title: 'test 1',
    category: 'Général',
    excerpt: 'Article de test publié récemment dans le système ASOFEDER.',
    content: 'Ceci est le contenu de l\'article de test. ASOFEDER continue d\'oeuvrer sur le terrain dans le Nord-Ouest.',
    imageUrl: heroImg,
    date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
    author: 'Justilien'
  },
  {
    id: 'post-init-2',
    title: 'L’ASOFEDER franchit une étape importante pour les femmes du Nord-Ouest',
    category: 'Autonomisation',
    excerpt: 'Retour sur les dernières réalisations communautaires et les nouvelles initiatives pour l\'autonomisation des femmes rurales.',
    content: 'L’Association Sociale des Femmes Engagées pour le Développement Rural (ASOFEDER) franchit une étape importante avec l’extension des Mutuelles de Solidarité (MUSO) et l’organisation de nouvelles pépinières environnementales.',
    imageUrl: treeImg,
    date: '21 juillet 2026',
    author: 'PRL'
  },
  {
    id: 'post-init-3',
    title: 'Lancement des nouvelles pépinières communautaires à Jean-Rabel',
    category: 'Environnement',
    excerpt: 'Inauguration de trois pépinières produisant 15 000 plants d\'arbres fruitiers et forestiers pour l\'agroforesterie.',
    content: 'Pour lutter contre la déforestation et l\'érosion des sols dans le Nord-Ouest, les membres d\'ASOFEDER à Jean-Rabel ont implanté trois pépinières pilotes. Ces arbres permettront aux agricultrices de diversifier leurs revenus tout en protégeant les bassins versants.',
    imageUrl: treeImg,
    date: '15 Juin 2026',
    author: 'Justilien'
  },
  {
    id: 'post-init-4',
    title: 'Assemblée Générale des Mutuelles de Solidarité (MUSO) 2026',
    category: 'Micro-finance',
    excerpt: 'Plus de 200 déléguées réunies à Port-de-Paix pour faire le bilan financier et définir les micro-crédits prioritaires.',
    content: 'L\'Assemblée Générale Annuelle des MUSO d\'ASOFEDER a réuni les représentant-es de 45 mutuelles rurales. Le taux de remboursement atteint 98.4%, prouvant la solidité et la confiance du modèle d\'épargne communautaire.',
    imageUrl: musoImg,
    date: '02 Mai 2026',
    author: 'PRL'
  },
  {
    id: 'post-init-5',
    title: 'Accès à l’eau potable : Réhabilitation de deux sources à Bassin-Bleu',
    category: 'WASH',
    excerpt: 'Un projet communautaire soulage le quotidien de plus de 1 200 familles et réduit la pénibilité pour les femmes.',
    content: 'Grâce à la mobilisation citoyenne et aux comités de gestion de l\'eau, deux points d\'eau essentiels ont été protégés et équipés de réservoirs de décantation à Bassin-Bleu.',
    imageUrl: cleanWaterImg,
    date: '18 Mars 2026',
    author: 'Justilien'
  }
];

// --- AUTHENTICATION FUNCTIONS ---

export function loginAdmin(usernameInput: string, passwordInput: string): AdminUser | null {
  const cleanUsername = usernameInput.trim();
  const found = ADMIN_CREDENTIALS.find(
    acc => acc.username.toLowerCase() === cleanUsername.toLowerCase() && acc.password === passwordInput
  );

  if (found) {
    const userSession: AdminUser = { username: found.username, name: found.name };
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(userSession));
    } catch (e) {
      console.error('Error saving session:', e);
    }
    return userSession;
  }

  return null;
}

export function getCurrentAdmin(): AdminUser | null {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading session:', e);
  }
  return null;
}

export function logoutAdmin(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (e) {
    console.error('Error clearing session:', e);
  }
}

// --- BLOG POSTS STORAGE FUNCTIONS ---

export function getStoredBlogPosts(): BlogPost[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading stored blog posts:', e);
  }

  // Initialize if empty or error
  saveAllBlogPosts(INITIAL_BLOG_POSTS);
  return INITIAL_BLOG_POSTS;
}

export function saveAllBlogPosts(posts: BlogPost[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (e) {
    console.error('Error saving blog posts to localStorage:', e);
  }
}

export function createOrUpdateBlogPost(postData: {
  id?: string | number;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  author?: string;
}): BlogPost {
  const currentPosts = getStoredBlogPosts();
  const currentAdmin = getCurrentAdmin();
  const authorName = postData.author || currentAdmin?.name || 'Direction ASOFEDER';

  const defaultImages = [heroImg, treeImg, musoImg, cleanWaterImg];
  const finalImage = postData.imageUrl && postData.imageUrl.trim().length > 5 
    ? postData.imageUrl.trim() 
    : defaultImages[Math.floor(Math.random() * defaultImages.length)];

  if (postData.id) {
    // Update existing
    const existingIndex = currentPosts.findIndex(p => String(p.id) === String(postData.id));
    if (existingIndex !== -1) {
      const updatedPost: BlogPost = {
        ...currentPosts[existingIndex],
        title: postData.title,
        category: postData.category,
        excerpt: postData.excerpt,
        content: postData.content,
        imageUrl: finalImage,
        author: authorName,
      };
      currentPosts[existingIndex] = updatedPost;
      saveAllBlogPosts(currentPosts);
      return updatedPost;
    }
  }

  // Create new post
  const newPost: BlogPost = {
    id: `post-${Date.now()}`,
    title: postData.title,
    category: postData.category || 'Général',
    excerpt: postData.excerpt || postData.content.slice(0, 150) + '...',
    content: postData.content,
    imageUrl: finalImage,
    date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
    author: authorName,
  };

  const newPostsList = [newPost, ...currentPosts];
  saveAllBlogPosts(newPostsList);
  return newPost;
}

export function deleteStoredBlogPost(id: string | number): boolean {
  const currentPosts = getStoredBlogPosts();
  const filtered = currentPosts.filter(p => String(p.id) !== String(id));
  if (filtered.length !== currentPosts.length) {
    saveAllBlogPosts(filtered);
    return true;
  }
  return false;
}

export function resetStoredBlogPosts(): BlogPost[] {
  saveAllBlogPosts(INITIAL_BLOG_POSTS);
  return INITIAL_BLOG_POSTS;
}
