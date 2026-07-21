export type Language = 'fr' | 'ht' | 'en';

export type PageId = 
  | 'home' 
  | 'about' 
  | 'programs' 
  | 'projects' 
  | 'partners' 
  | 'gallery' 
  | 'blog' 
  | 'faq' 
  | 'contact' 
  | 'donate';

export interface ProgramDomain {
  id: string;
  title: string;
  iconName?: string;
  shortDesc?: string;
  fullDesc?: string;
  description?: string;
  keyActions?: string[];
  actions?: string[];
  beneficiariesCount: string;
  image: string;
  badgeColor?: string;
}

export interface FieldProject {
  id: string;
  title: string;
  region?: 'Port-de-Paix' | 'Jean-Rabel' | 'Môle-Saint-Nicolas' | 'Saint-Louis-du-Nord' | 'Bassin-Bleu' | 'Chansolme' | 'Nord-Ouest Global' | string;
  location?: string;
  category: string;
  status: 'En cours' | 'Réalisé' | 'Terminé' | 'Projet à venir' | string;
  year?: string;
  period?: string;
  summary?: string;
  description?: string;
  impactMetrics?: { label: string; value: string }[];
  metrics?: { label: string; value: string }[];
  image: string;
  details?: string;
}

export interface Partner {
  id: string;
  name: string;
  category?: 'Institutionnel' | 'Technique & Financier' | 'Réseau National' | 'Partenaire Local' | string;
  type?: string;
  description: string;
  logoUrl?: string;
  website?: string;
  country?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Agriculture' | 'WASH' | 'Éducation' | 'Événements' | 'Communauté' | string;
  imageUrl: string;
  caption: string;
  location: string;
  year: string;
}

export interface BlogPost {
  id: string | number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
  category: string;
  link?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Général' | 'Adhésion & Bénévolat' | 'Donation & Financement' | 'Projets' | string;
}
