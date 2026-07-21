import { ProgramDomain, FieldProject, Partner, GalleryItem, BlogPost, FaqItem } from '../types';
import heroImg from '../assets/images/hero_asofeder_women_1784664187658.jpg';
import musoImg from '../assets/images/asofeder_muso_meeting_1784664199035.jpg';
import treeImg from '../assets/images/asofeder_tree_nursery_1784664209449.jpg';
import cleanWaterImg from '../assets/images/asofeder_clean_water_1784664221013.jpg';

export const ORG_INFO = {
  name: 'ASOFEDER',
  fullName: 'Association Sociale des Femmes Engagées pour le Développement Rural',
  creationDate: '18 Février 2018',
  type: 'Organisation de la Société Civile (OSC)',
  address: '21, Rue Beaudin, Port-de-Paix, Nord-Ouest, Haïti',
  phonePrimary: '+509 3369-1734',
  phoneSecondary: '+509 4417-4469',
  email: 'associationsociale2018@gmail.com',
  hours: 'Lundi à Vendredi : 08h00 - 16h00',
  wpFeedUrl: 'https://asofeder.org/wp-json/wp/v2/posts',
  mission: `Promouvoir l'égalité entre les femmes et les hommes, défendre les droits fondamentaux des femmes et lutter contre toutes les formes de discrimination et de violence basées sur le genre. Autonomiser économiquement et socialement les femmes rurales, renforcer leur pouvoir de décision et améliorer leurs conditions de vie à travers un développement rural durable et participatif.`,
  vision: `Une société haïtienne juste, égalitaire et inclusive, où chaque femme rurale vit dans la dignité, jouit pleinement de ses droits et participe activement au développement durable de sa communauté.`,
  historyText: `Fondée le 18 février 2018 à Port-de-Paix dans le département du Nord-Ouest d'Haïti, l'ASOFEDER est née de la détermination collective de femmes rurales et de militantes locales résolues à briser les cercles de la pauvreté et de la marginalisation. Confrontées aux crises climatiques à répétition, aux difficultés d'accès au crédit et à la sous-représentation des femmes dans les instances décisionnelles locales, les fondatrices ont structuré une Organisation de la Société Civile (OSC) ancrée sur le terrain.\n\nDepuis sa création, l'ASOFEDER a fait passer son action d'un petit rassemblement communautaire à un réseau reconnu qui touche aujourd'hui des milliers de femmes à travers les communes de Port-de-Paix, Jean-Rabel, Saint-Louis-du-Nord, Bassin-Bleu, Môle-Saint-Nicolas et Chansolme. Par des programmes intégrés allant des Mutuelles de Solidarité (MUSO) à la protection environnementale et la transformation agricole, ASOFEDER incarne la voix et la force motrice du développement rural féminin en Haïti.`,
  values: [
    {
      title: 'Égalité et Justice Sociale',
      desc: 'Combat contre les discriminations et promotion de l’accès équitable aux ressources et opportunités.'
    },
    {
      title: 'Solidarité et Sororité',
      desc: 'Entraide mutuelle entre femmes rurales pour faire face aux vulnérabilités économiques et sociales.'
    },
    {
      title: 'Autonomisation et Leadership',
      desc: 'Renforcement continu des compétences décisionnelles, financières et civiques des femmes.'
    },
    {
      title: 'Transparence et Redevabilité',
      desc: 'Gestion éthique et rigoureuse de chaque projet et ressource confiée par nos partenaires et membres.'
    },
    {
      title: 'Développement Durable et Résilience',
      desc: 'Soutien aux pratiques agricoles respectueuses de la terre et de la biodiversité haïtienne.'
    }
  ],
  stats: [
    { value: '3,800+', label: 'Femmes accompagnées' },
    { value: '45+', label: 'Mutuelles de Solidarité (MUSO)' },
    { value: '7', label: 'Communes couvertes dans le N.O.' },
    { value: '25,000+', label: 'Arbres replantés' },
    { value: '8 Ans', label: 'D\'impact continu sur le terrain' }
  ]
};

export const PROGRAM_DOMAINS: ProgramDomain[] = [
  {
    id: 'agriculture-elevage',
    title: 'Agriculture & Élevage Durable',
    iconName: 'Sprout',
    shortDesc: 'Promotion de techniques agricoles agroécologiques résilientes au changement climatique et relance du petit élevage familial.',
    fullDesc: 'L’agriculture est la colonne vertébrale des communautés rurales du Nord-Ouest. ASOFEDER forme les agricultrices à la gestion durable des sols, la diversification des cultures, l’usage de semences locales adaptées au climat et l’élevage paysan (volailles, caprins).',
    keyActions: [
      'Distribution de semences certifiées et outils agricoles adaptés',
      'Ateliers d’agroécologie et de compostage naturel',
      'Appui au petit élevage caprin et avicole redistributif',
      'Gestion communautaire de l’eau d’irrigation villageoise'
    ],
    beneficiariesCount: '1,400+ Agricultrices',
    image: heroImg
  },
  {
    id: 'wash',
    title: 'Eau, Assainissement & Hygiène (WASH)',
    iconName: 'Droplets',
    shortDesc: 'Amélioration de l’accès à l’eau potable et construction d’infrastructures sanitaires dignes dans les zones rurales.',
    fullDesc: 'L’accès difficile à l’eau potable surcharge le quotidien des femmes et filles rurales. ASOFEDER réhabilite des sources, installe des citernes communautaires et dispense des formations à l’hygiène familiale et menstruelle.',
    keyActions: [
      'Aménagement et protection des sources d’eau naturelles',
      'Construction de latrines écologiques dans les écoles et centres',
      'Sensibilisation aux maladies d’origine hydrique (choléra, typhoïde)',
      'Distribution de kits d’hygiène menstruelle réutilisables'
    ],
    beneficiariesCount: '8,500+ Habitants',
    image: cleanWaterImg
  },
  {
    id: 'economie-solidaire',
    title: 'Économie Sociale & Solidaire (ESS)',
    iconName: 'Coins',
    shortDesc: 'Création et supervision de Mutuelles de Solidarité (MUSO) et micro-crédits pour l’autonomie financière féminine.',
    fullDesc: 'Faute d’accès aux banques traditionnelles, les femmes rurales trouvent dans les Mutuelles de Solidarité (MUSO) d’ASOFEDER un levier financier autonome. Elles y épargnent, empruntent à faible taux et investissent dans de petits commerces.',
    keyActions: [
      'Mise en place de 45+ groupes MUSO autogérés',
      'Formation en comptabilité de base et gestion d’activités génératrices de revenus (AGR)',
      'Octroi de micro-crédits rotatifs communautaires',
      'Accompagnement à l’épargne prévoyance santé et éducation'
    ],
    beneficiariesCount: '2,100+ Membres MUSO',
    image: musoImg
  },
  {
    id: 'environnement',
    title: 'Environnement & Reforestation',
    iconName: 'Trees',
    shortDesc: 'Création de pépinières fruitières et forestières pour lutter contre l’érosion des sols et le déboisement.',
    fullDesc: 'Le Nord-Ouest d’Haïti souffre sévèrement de la dégradation environnementale. ASOFEDER implique les femmes dans la production de plantules (manguiers, citronniers, cèdres) et la diffusion de foyers améliorés économes en charbon.',
    keyActions: [
      'Production annuelle de 50 000 plantules en pépinières locales',
      'Reboisement des bassins versants vulnérables',
      'Promotion des foyers améliorés réduisant l’usage de bois de chauffe',
      'Éducation environnementale dans les écoles rurales'
    ],
    beneficiariesCount: '25,000+ Arbres plantés',
    image: treeImg
  },
  {
    id: 'securite-alimentaire',
    title: 'Sécurité Alimentaire & Nutrition',
    iconName: 'Apple',
    shortDesc: 'Développement de jardins potagers de case et éducation nutritionnelle pour prévenir la malnutrition infantile.',
    fullDesc: 'Assurer une alimentation variée et nutritive est essentiel pour la santé des enfants et des femmes enceintes. ASOFEDER encourage la création de potagers familiaux diversifiés (légumes, céréales, plantes médicinales).',
    keyActions: [
      'Aménagement de jardins de case (jardins potagers verticaux et parcelles)',
      'Ateliers de préparation de repas nutritifs à base de produits locaux',
      'Dépistage communautaire précoce de la malnutrition infantile',
      'Soutien aux cantines scolaires rurales alimentées par les fermières'
    ],
    beneficiariesCount: '950+ Familles',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'education-droits',
    title: 'Éducation, Alphabétisation & Droits',
    iconName: 'GraduationCap',
    shortDesc: 'Centres d’alphabétisation fonctionnelle en Créole et sensibilisation active contre les Violences Basées sur le Genre (VBG).',
    fullDesc: 'Savoir lire, écrire et compter est un préalable incontournable à l’émancipation. ASOFEDER gère des centres d’alphabétisation tout en formant les femmes à la défense de leurs droits juridiques et à l’exercice de leur leadership.',
    keyActions: [
      'Cours d’alphabétisation fonctionnelle pour femmes adultes',
      'Sensibilisation aux lois protégeant contre les violences faites aux femmes',
      'Formation au leadership et à la prise de parole en public',
      'Cliniques d’écoute et orientation juridique communautaire'
    ],
    beneficiariesCount: '1,200+ Apprenantes',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'sante-ssr',
    title: 'Santé Communautaire & SSR',
    iconName: 'HeartPulse',
    shortDesc: 'Sensibilisation à la santé sexuelle et reproductive, accompagnement des mères et santé maternelle.',
    fullDesc: 'Dans les zones reculées du département, l’accès aux soins de santé maternelle reste précaire. Nos relais communautaires informent sur la planification familiale, le suivi prénatal et le soutien psychosocial.',
    keyActions: [
      'Réseau d’agentes de santé communautaire en milieu rural',
      'Ateliers sur la santé sexuelle et reproductive pour adolescentes et mères',
      'Accompagnement et orientation vers les centres de santé de Port-de-Paix',
      'Soutien psychosocial aux femmes victimes de traumatismes'
    ],
    beneficiariesCount: '3,200+ Femmes sensibilisées',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'transformation-agricole',
    title: 'Transformation des Produits Agricoles',
    iconName: 'PackageCheck',
    shortDesc: 'Valorisation des récoltes locales : transformation du manioc en cassave, séchage de fruits, emballage et commercialisation.',
    fullDesc: 'Pour éviter le gaspillage post-récolte et générer une réelle valeur ajoutée, ASOFEDER forme les groupements féminins aux techniques d’hygiène et de transformation du manioc, maïs, haricots et fruits de saison.',
    keyActions: [
      'Unités artisanales de transformation du manioc en cassave et de maïs en farine',
      'Techniques modernes de séchage et de conservation solaire des fruits',
      'Conditionnement et étiquetage de produits locaux de qualité',
      'Mise en réseau pour la vente sur les marchés de Port-de-Paix et Cap-Haïtien'
    ],
    beneficiariesCount: '18 Groupements féminins',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1000'
  }
];

export const FIELD_PROJECTS: FieldProject[] = [
  {
    id: 'proj-muso-port-de-paix',
    title: 'Réseau des Mutuelles de Solidarité (MUSO) du Bas de Port-de-Paix',
    region: 'Port-de-Paix',
    category: 'Économie Sociale & Solidaire',
    status: 'En cours',
    year: '2024 - 2026',
    summary: 'Consolidation de 15 groupes MUSO réunissant plus de 450 commerçantes et agricultrices pour l’autofinancement et le crédit rotatif.',
    impactMetrics: [
      { label: 'Femmes membres', value: '450+' },
      { label: 'Fonds d\'épargne mobilisé', value: '2.5M HTG' },
      { label: 'Micro-projets financés', value: '310' }
    ],
    image: musoImg,
    details: 'Les commerçantes de Port-de-Paix et des sections rurales environnantes ont pu maintenir leurs activités économiques malgré les chocs d’inflation grâce au système d’épargne et de crédit solidaire de proximité.'
  },
  {
    id: 'proj-pepiniere-jean-rabel',
    title: 'Pépinières Communautaires et Reboisement à Jean-Rabel',
    region: 'Jean-Rabel',
    category: 'Environnement & Reforestation',
    status: 'En cours',
    year: '2023 - 2025',
    summary: 'Création de deux grandes pépinières gérées par les fermières de Jean-Rabel pour la reforestation des montagnes sujettes aux glissements de terrain.',
    impactMetrics: [
      { label: 'Plantules produites', value: '35,000' },
      { label: 'Femmes pépiniéristes', value: '80' },
      { label: 'Hectares reboisés', value: '120 ha' }
    ],
    image: treeImg,
    details: 'Production mixte de manguiers francique, cèdres, moringa et citronniers permettant à la fois la protection des sols et des revenus futurs grâce aux ventes de fruits.'
  },
  {
    id: 'proj-wash-mole',
    title: 'Eau Potable et Latrines Dignes à Môle-Saint-Nicolas',
    region: 'Môle-Saint-Nicolas',
    category: 'WASH & Santé',
    status: 'Réalisé',
    year: '2023 - 2024',
    summary: 'Réhabilitation de 3 points d’eau collectifs et aménagement de blocs sanitaires séparés dans 2 écoles rurales.',
    impactMetrics: [
      { label: 'Bénéficiaires eau', value: '2,800' },
      { label: 'Latrines construites', value: '8' },
      { label: 'Élèves sensibilisés', value: '650' }
    ],
    image: cleanWaterImg,
    details: 'Ce projet a permis de réduire le temps de corvée d’eau des jeunes filles de plus de 2 heures par jour tout en diminuant considérablement les risques de maladies diarrhéiques.'
  },
  {
    id: 'proj-cassave-saint-louis',
    title: 'Atelier Communautaire de Transformation de Cassave à Saint-Louis-du-Nord',
    region: 'Saint-Louis-du-Nord',
    category: 'Transformation Agricole',
    status: 'En cours',
    year: '2024 - 2025',
    summary: 'Équipement d’un atelier moderne de râpage, pressage et cuisson hygiénique de la cassave à base de manioc amer local.',
    impactMetrics: [
      { label: 'Transformatrices formées', value: '60' },
      { label: 'Production mensuelle', value: '1,500 kg' },
      { label: 'Augmentation des revenus', value: '+40%' }
    ],
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1000',
    details: 'Mise aux normes d’hygiène des emballages de cassave pour approvisionner les supermarchés locaux et les marchés régionaux du Nord et Nord-Ouest.'
  },
  {
    id: 'proj-jardins-bassin-bleu',
    title: 'Jardins de Case et Cantines Nutritives à Bassin-Bleu',
    region: 'Bassin-Bleu',
    category: 'Sécurité Alimentaire',
    status: 'Réalisé',
    year: '2022 - 2023',
    summary: 'Mise en place de jardins potagers de proximité pour 150 mères de famille et approvisionnement en amarante (lalo), carottes et épinards.',
    impactMetrics: [
      { label: 'Jardins installés', value: '150' },
      { label: 'Enfants dépistés', value: '420' },
      { label: 'Taux de récupération', value: '94%' }
    ],
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1000',
    details: 'Les jardins potagers fournissent des légumes frais au quotidien, améliorant drastiquement l’apport en fer et vitamines pour les enfants en bas âge.'
  },
  {
    id: 'proj-alpha-chansolme',
    title: 'Centre d’Alphabétisation et Droits Civiques à Chansolme',
    region: 'Chansolme',
    category: 'Éducation & Droits',
    status: 'En cours',
    year: '2024 - 2025',
    summary: 'Session de cours du soir d’alphabétisation en Kreyòl complétée par des modules de formation sur le Code civil et la prévention des violences.',
    impactMetrics: [
      { label: 'Femmes inscrites', value: '120' },
      { label: 'Taux de réussite', value: '88%' },
      { label: 'Mentores communautaires', value: '12' }
    ],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000',
    details: 'Permet aux femmes de signer leurs propres pièces d’identité, de tenir les livrets de comptes de leurs petits commerces et d’aider leurs enfants à faire leurs devoirs.'
  }
];

export const PARTNERS: Partner[] = [
  {
    id: 'p-mcfdf',
    name: 'Ministère de la Condition Féminine et des Droits des Femmes (MCFDF)',
    category: 'Institutionnel',
    description: 'Partenaire étatique de référence pour l’alignement des politiques d’égalité de genre et la protection des droits des femmes en Haïti.',
    country: 'Haïti'
  },
  {
    id: 'p-fao',
    name: 'Gropements & Coopératives Paysannes du Nord-Ouest',
    category: 'Partenaire Local',
    description: 'Alliance stratégique avec les réseaux de producteurs ruraux de Port-de-Paix, Saint-Louis-du-Nord et Jean-Rabel.',
    country: 'Haïti'
  },
  {
    id: 'p-ong-inter',
    name: 'Organisations Non-Gouvernementales Partenaires',
    category: 'Technique & Financier',
    description: 'Appui technique pour les programmes d’eau, assainissement, agroécologie et résilience climatique dans le département.',
    country: 'International'
  },
  {
    id: 'p-reseau-femmes',
    name: 'Réseau National des Femmes Rurales Haïtiennes',
    category: 'Réseau National',
    description: 'Coordination plaidoyer pour porter la voix des femmes agricultrices auprès des décideurs nationaux et internationaux.',
    country: 'Haïti'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Atelier de formation en gestion MUSO',
    category: 'Éducation',
    imageUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=1000',
    caption: 'Les responsables des Mutuelles de Solidarité se réunissent à Port-de-Paix pour ajuster le livre de compte communautaire.',
    location: 'Port-de-Paix',
    year: '2024'
  },
  {
    id: 'g-2',
    title: 'Pépinière forestière de Jean-Rabel',
    category: 'Agriculture',
    imageUrl: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&q=80&w=1000',
    caption: 'Pépiniéristes préparant des sacs de terreau pour les plantules de manguiers francique.',
    location: 'Jean-Rabel',
    year: '2024'
  },
  {
    id: 'g-3',
    title: 'Réhabilitation d’une source d’eau claire',
    category: 'WASH',
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=1000',
    caption: 'Inauguration du point d’eau protégé au bénéfice des familles de la 2e section communale.',
    location: 'Môle-Saint-Nicolas',
    year: '2023'
  },
  {
    id: 'g-4',
    title: 'Rassemblement pour la Journée de la Femme Rurale',
    category: 'Événements',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000',
    caption: 'Célébration annuelle avec les délégations de femmes venues de tout le département du Nord-Ouest.',
    location: 'Port-de-Paix',
    year: '2024'
  },
  {
    id: 'g-5',
    title: 'Atelier de préparation de cassave traditionnelle',
    category: 'Communauté',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1000',
    caption: 'Femmes membres de la coopérative agricole lors de la cuisson de la cassave.',
    location: 'Saint-Louis-du-Nord',
    year: '2024'
  },
  {
    id: 'g-6',
    title: 'Distribution de kits scolaires et d\'hygiène',
    category: 'Éducation',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000',
    caption: 'Distribution de fournitures pour favoriser la scolarisation des jeunes filles en milieu rural.',
    location: 'Chansolme',
    year: '2024'
  }
];

export const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'fb-1',
    title: 'Lancement officiel de la campagne de reboisement et pépinières fruitières dans le Nord-Ouest',
    excerpt: 'L’ASOFEDER franchit une nouvelle étape décisive dans son engagement environnemental avec le lancement d’un réseau de pépinières villageoises gérées par des femmes à Port-de-Paix et Jean-Rabel.',
    content: `Port-de-Paix, Haïti – Ce mois-ci, l'Association Sociale des Femmes Engagées pour le Développement Rural (ASOFEDER) a inauguré une grande campagne de reforestation départementale.\n\nFace à l’accélération de l’érosion des sols et à la fréquence accrue des sécheresses dans la région du Nord-Ouest, les femmes rurales se positionnent en première ligne de la transition écologique.\n\nGrace à l'installation de pépinières gérées par nos membres, plus de 35 000 plantules d'arbres fruitiers (manguiers francique, citronniers, avocado) et forestiers (cèdres, moringa) sont produites chaque saison. Outre la protection des versants montagneux, cette initiative assure des revenus durables aux familles grâce à la future récolte des fruits.`,
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000',
    date: '12 Février 2025',
    author: 'Direction Communication ASOFEDER',
    category: 'Environnement',
    link: 'https://asofeder.org'
  },
  {
    id: 'fb-2',
    title: 'Autonomisation financière : 12 nouvelles Mutuelles de Solidarité (MUSO) créées à Port-de-Paix',
    excerpt: 'Grâce à notre modèle d’épargne et de crédit communautaire, plus de 300 nouvelles commerçantes rurales accèdent à des micro-financements sans intérêt usuraire.',
    content: `Port-de-Paix – L'accès aux banques traditionnelles restant un obstacle majeur pour les femmes du milieu rural haïtien, ASOFEDER poursuit l'extension de ses Mutuelles de Solidarité (MUSO).\n\nLes MUSO permettent à chaque groupe de 25 à 30 femmes de déposer une petite épargne hebdomadaire dans une caisse solidaire. Ces fonds sont immédiatement réinvestis sous forme de prêts à taux très avantageux pour financer la vente de vivres, l'achat de semences ou les frais scolaires des enfants.\n\nLes témoignages recueillis lors de la dernière assemblée générale montrent une hausse moyenne de 35% des revenus des ménages adhérents.`,
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67daf64f42?auto=format&fit=crop&q=80&w=1000',
    date: '28 Janvier 2025',
    author: 'Équipe Programme ESS',
    category: 'Économie Solidaire',
    link: 'https://asofeder.org'
  },
  {
    id: 'fb-3',
    title: 'Valorisation de la cassave et du maïs : Formation des transformatrices de Saint-Louis-du-Nord',
    excerpt: 'Un atelier pratique de trois jours a réuni 45 transformatrices locales pour moderniser les méthodes de fabrication de la cassave tout en garantissant des normes d’hygiène strictes.',
    content: `Saint-Louis-du-Nord – La transformation des produits agricoles locaux constitue un gisement d'emplois essentiels pour les femmes d'Haïti.\n\nASOFEDER a organisé une session intensive sur les procédés d'extraction, de pressage du manioc amer et de cuisson sur platines améliorées. L'objectif est double : réduire la consommation de combustible grâce à des foyers performants et fabriquer une cassave croustillante de haute qualité destinée aux marchés de Port-de-Paix et du Cap-Haïtien.\n\nUn module spécifique sur le packaging et l'étiquetage aux normes nationales permettra à nos groupements de commercialiser leurs produits sous la marque collective ASOFEDER.`,
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1000',
    date: '15 Décembre 2024',
    author: 'Section Agro-Industrie',
    category: 'Agriculture',
    link: 'https://asofeder.org'
  },
  {
    id: 'fb-4',
    title: 'Sensibilisation à l’hygiène menstruelle et distribution de kits dans les écoles rurales',
    excerpt: 'Lutter contre le tabou de la menstruation et l’absentéisme scolaire des filles dans les zones reculées de Chansolme et Bassin-Bleu.',
    content: `Chansolme – Le manque de protections hygiéniques adaptées provoque souvent l'abandon temporaire ou définitif de l'école chez les adolescentes rurales.\n\nDans le cadre de son programme WASH et Droits des Femmes, ASOFEDER a distribué plus de 500 kits d'hygiène contenant des serviettes réutilisables lavables fabriquées localement, du savon et un guide éducatif explicatif.\n\nDes séances de discussion ouvertes ont permis de briser les stéréotypes avec la participation des enseignants, des mères et des élèves.`,
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=1000',
    date: '20 Novembre 2024',
    author: 'Comité Santé & WASH',
    category: 'WASH',
    link: 'https://asofeder.org'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Qu\'est-ce que l\'ASOFEDER et où se trouve son siège social ?',
    answer: 'L\'ASOFEDER (Association Sociale des Femmes Engagées pour le Développement Rural) est une Organisation de la Société Civile (OSC) fondée le 18 février 2018. Notre siège principal est situé au 21, Rue Beaudin à Port-de-Paix, département du Nord-Ouest d\'Haïti.',
    category: 'Général'
  },
  {
    id: 'faq-2',
    question: 'Comment puis-je devenir membre ou bénévoles au sein de l\'association ?',
    answer: 'Toute femme rurale, citoyen ou citoyenne engagée partageant nos valeurs d\'égalité et de développement durable peut adhérer à ASOFEDER. Vous pouvez vous rendre directement à nos bureaux à Port-de-Paix ou remplir le formulaire d\'adhésion / bénévolat disponible sur notre site web.',
    category: 'Adhésion & Bénévolat'
  },
  {
    id: 'faq-3',
    question: 'Quels sont les 7 grands domaines d\'intervention d\'ASOFEDER ?',
    answer: 'Nos 7 piliers d\'action stratégiques sont : 1) Agriculture et Élevage, 2) Eau, Assainissement et Hygiène (WASH), 3) Économie Sociale et Solidaire (MUSO et micro-crédit), 4) Protection de l\'Environnement et Reforestation, 5) Sécurité Alimentaire et Nutrition, 6) Éducation, Alphabétisation et Droits des Femmes, 7) Santé Communautaire et Santé Sexuelle/Reproductive (SSR), complétés par la Transformation des produits agricoles.',
    category: 'Projets'
  },
  {
    id: 'faq-4',
    question: 'Comment fonctionnent les Mutuelles de Solidarité (MUSO) organisées par ASOFEDER ?',
    answer: 'Les MUSO réunissent 20 à 30 femmes d\'une même localité. Elles cotisent régulièrement une petite somme d\'épargne. Cet argent constitue une caisse de crédit rotatif permettant aux membres d\'emprunter à un taux minime pour développer de petites activités commerciales ou faire face aux urgences familiales sans dépendre des usuriers.',
    category: 'Projets'
  },
  {
    id: 'faq-5',
    question: 'Comment sont utilisés les dons et financements reçus par l\'organisation ?',
    answer: 'ASOFEDER applique une politique de transparence et de redevabilité rigoureuse. Au moins 85% des fonds sont directement affectés aux projets sur le terrain (achat de semences, pépinières, points d\'eau, matériel d\'alphabétisation), le reste couvrant la coordination locale et le suivi évaluation.',
    category: 'Donation & Financement'
  },
  {
    id: 'faq-6',
    question: 'Quels moyens de paiement sont acceptés pour soutenir ASOFEDER depuis Haïti ou l\'étranger ?',
    answer: 'En Haïti, vous pouvez effectuer un don via MonCash au +509 3369-1734 ou par virement bancaire sur notre compte à Port-de-Paix. Depuis l\'étranger, vous pouvez faire une promesse de don en ligne ou nous contacter pour un virement international direct.',
    category: 'Donation & Financement'
  },
  {
    id: 'faq-7',
    question: 'Dans quelles communes du Nord-Ouest ASOFEDER intervient-elle ?',
    answer: 'Nos actions couvrent en priorité les communes de Port-de-Paix, Jean-Rabel, Saint-Louis-du-Nord, Bassin-Bleu, Môle-Saint-Nicolas et Chansolme, avec la volonté d\'étendre progressivement notre réseau à tout le département.',
    category: 'Projets'
  },
  {
    id: 'faq-8',
    question: 'Comment les partenaires institutionnels et ONG peuvent-ils collaborer avec ASOFEDER ?',
    answer: 'Nous accueillons avec enthousiasme les partenariats stratégiques, techniques ou financiers. Contactez notre direction par email à associationsociale2018@gmail.com ou par téléphone aux (+509) 3369-1734 / 4417-4469 pour élaborer une convention de partenariat.',
    category: 'Général'
  }
];
