import React, { useState, useEffect } from 'react';
import { PageId, Language, BlogPost } from '../types';
import { uiTranslations } from '../data/translations';
import { FIELD_PROJECTS, FALLBACK_BLOG_POSTS } from '../data/content';
import { 
  Heart, ArrowRight, ArrowUpRight, ChevronRight, Sprout, Droplets, Users, TreePine, 
  Utensils, GraduationCap, HeartPulse, Calendar
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageId) => void;
  currentLang: Language;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, currentLang }) => {
  const t = uiTranslations[currentLang];
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(FALLBACK_BLOG_POSTS.slice(0, 3));

  useEffect(() => {
    const fetchWpPosts = async () => {
      try {
        const res = await fetch('https://asofeder.org/wp-json/wp/v2/posts?_embed&per_page=3');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const mapped: BlogPost[] = data.map((item: any) => {
              const featuredImage = item._embedded?.['wp:featuredmedia']?.[0]?.source_url 
                || '/src/assets/images/asofeder_tree_nursery_1784664209449.jpg';
              const cleanExcerpt = item.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '';
              return {
                id: item.id,
                title: item.title?.rendered || 'Article ASOFEDER',
                excerpt: cleanExcerpt.slice(0, 140) + '...',
                content: item.content?.rendered || '',
                imageUrl: featuredImage,
                date: new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
                author: 'ASOFEDER',
                category: 'Actualité',
                link: item.link
              };
            });
            setBlogPosts(mapped);
          }
        }
      } catch (err) {
        console.warn('WordPress API unreachable, using fallback ASOFEDER posts:', err);
      }
    };
    fetchWpPosts();
  }, []);

  return (
    <div className="space-y-0 pt-16">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[720px] sm:min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url('/src/assets/images/hero_asofeder_women_1784664187658.jpg')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-900/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white space-y-6">
          <div className="inline-block bg-[#006b2d]/90 backdrop-blur-md px-5 py-2 rounded-full text-white font-heading font-semibold text-xs sm:text-sm shadow-lg border border-white/20 animate-fade-in">
            Association Sociale des Femmes Engagées pour le Développement Rural
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl max-w-4xl mx-auto leading-tight tracking-tight">
            Ensemble pour l'autonomie des femmes rurales
          </h1>

          <p className="text-slate-200 text-sm sm:text-lg max-w-2xl mx-auto opacity-95 leading-relaxed font-medium">
            Nous œuvrons à Port-de-Paix pour renforcer le pouvoir d'action des femmes haïtiennes à travers l'éducation, l'agriculture durable et l'accès à la santé.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('donate')}
              className="w-full sm:w-auto bg-[#1e3aa1] hover:bg-[#162a7d] text-white px-9 py-4 rounded-full font-heading font-bold text-sm shadow-xl shadow-[#1e3aa1]/40 hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <Heart className="h-4 w-4 fill-amber-300 text-amber-300" />
              <span>{t.donateBtn}</span>
            </button>

            <button
              onClick={() => onNavigate('programs')}
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 px-9 py-4 rounded-full font-heading font-bold text-sm transition-all"
            >
              Nos programmes
            </button>
          </div>
        </div>

        {/* STATS OVERLAY STRIP AT BOTTOM OF HERO */}
        <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-lg py-6 sm:py-8 shadow-2xl border-t border-slate-200/50 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-3 gap-4 sm:gap-8">
            <div className="flex flex-col items-center border-r border-slate-200/80 last:border-0">
              <span className="font-heading font-extrabold text-2xl sm:text-4xl text-[#006b2d] mb-0.5">2018</span>
              <span className="text-slate-600 font-bold text-[10px] sm:text-xs uppercase tracking-wider">Depuis</span>
            </div>
            <div className="flex flex-col items-center border-r border-slate-200/80 last:border-0">
              <span className="font-heading font-extrabold text-2xl sm:text-4xl text-[#006b2d] mb-0.5">15+</span>
              <span className="text-slate-600 font-bold text-[10px] sm:text-xs uppercase tracking-wider text-center">Communautés Servies</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-heading font-extrabold text-2xl sm:text-4xl text-[#006b2d] mb-0.5">42</span>
              <span className="text-slate-600 font-bold text-[10px] sm:text-xs uppercase tracking-wider text-center">Projets Complétés</span>
            </div>
          </div>
        </div>
      </section>

      {/* DOMAINES D'INTERVENTION (PROGRAMS PREVIEW) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div className="max-w-2xl">
            <span className="text-[#006b2d] font-bold text-xs uppercase tracking-widest block mb-2">Impact & Action</span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900">
              Nos Domaines d'Intervention
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Une approche holistique pour briser le cycle de la pauvreté et favoriser un développement communautaire durable.
            </p>
          </div>
          <button
            onClick={() => onNavigate('programs')}
            className="hidden md:flex items-center gap-2 text-[#1e3aa1] font-bold text-sm hover:gap-3 transition-all"
          >
            <span>Voir tout</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* 7 DOMAIN CARDS BENTO GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {[
            { id: 'agriculture', title: 'Agriculture', icon: <Sprout className="h-7 w-7 text-[#006b2d]" />, bg: 'bg-[#006b2d]/10' },
            { id: 'wash', title: 'WASH', icon: <Droplets className="h-7 w-7 text-[#1e3aa1]" />, bg: 'bg-[#1e3aa1]/10' },
            { id: 'economie-solidaire', title: 'Économie', icon: <Users className="h-7 w-7 text-amber-700" />, bg: 'bg-amber-100' },
            { id: 'environnement', title: 'Environnement', icon: <TreePine className="h-7 w-7 text-[#006b2d]" />, bg: 'bg-[#006b2d]/10' },
            { id: 'securite-alimentaire', title: 'Alimentation', icon: <Utensils className="h-7 w-7 text-amber-700" />, bg: 'bg-amber-100' },
            { id: 'education', title: 'Éducation', icon: <GraduationCap className="h-7 w-7 text-[#1e3aa1]" />, bg: 'bg-[#1e3aa1]/10' },
            { id: 'sante', title: 'Santé', icon: <HeartPulse className="h-7 w-7 text-[#006b2d]" />, bg: 'bg-[#006b2d]/10' },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate('programs')}
              className="bento-card-hover cursor-pointer bg-white p-6 rounded-2xl flex flex-col items-center text-center shadow-xs border border-slate-200/80 group"
            >
              <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#1e3aa1] transition">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED STORY & HIGHLIGHT BANNER */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="bg-[#006b2d] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Haïti • Nord-Ouest
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl leading-tight">
              Souveraineté Alimentaire & Autonomisation des Mères de Famille
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              À Port-de-Paix et dans les sections rurales du Nord-Ouest, ASOFEDER réunit plus de 2,100 femmes au sein de mutuelles de solidarité (MUSO) et de coopératives agricoles pour faire émerger une économie rurale résiliente.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1">
                <span className="text-amber-400 font-heading font-bold text-xl">2,100+</span>
                <p className="text-xs text-slate-300">Femmes membres des Mutuelles MUSO</p>
              </div>
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1">
                <span className="text-amber-400 font-heading font-bold text-xl">25,000+</span>
                <p className="text-xs text-slate-300">Arbres fruitiers & forestiers reboisés</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 bg-[#006b2d] hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition"
              >
                <span>Découvrir notre histoire</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <img
              src="/src/assets/images/asofeder_muso_meeting_1784664199035.jpg"
              alt="Femmes réunies ASOFEDER"
              referrerPolicy="no-referrer"
              className="rounded-2xl h-56 sm:h-64 w-full object-cover shadow-lg border border-slate-700"
            />
            <img
              src="/src/assets/images/asofeder_tree_nursery_1784664209449.jpg"
              alt="Pépinière ASOFEDER"
              referrerPolicy="no-referrer"
              className="rounded-2xl h-56 sm:h-64 w-full object-cover shadow-lg border border-slate-700 mt-6"
            />
          </div>
        </div>
      </section>

      {/* BLOG / DERNIÈRES ACTUALITÉS */}
      <section className="bg-slate-100/70 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[#006b2d] font-bold text-xs uppercase tracking-widest block mb-1">Informer & Témoigner</span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900">
                Dernières Actualités
              </h2>
            </div>
            <button
              onClick={() => onNavigate('blog')}
              className="text-[#1e3aa1] font-bold text-xs sm:text-sm flex items-center gap-1 hover:translate-x-1 transition-transform"
            >
              <span>Toutes les nouvelles</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => onNavigate('blog')}
                className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition group border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#006b2d] text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span>{post.date}</span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-[#1e3aa1] transition line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <span className="text-[#1e3aa1] font-bold text-xs flex items-center gap-1 group-hover:underline">
                    <span>Lire la suite</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS STRIP */}
      <section className="py-12 border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-slate-500 font-heading font-bold text-xs uppercase tracking-widest">
            Ils nous font confiance et nous soutiennent
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 opacity-70 grayscale hover:grayscale-0 transition duration-500">
            <span className="font-heading font-extrabold text-slate-700 text-sm sm:text-base">MTPTC Nord-Ouest</span>
            <span className="font-heading font-extrabold text-slate-700 text-sm sm:text-base">MARNDR Port-de-Paix</span>
            <span className="font-heading font-extrabold text-slate-700 text-sm sm:text-base">Gouvernance Locale HT</span>
            <span className="font-heading font-extrabold text-slate-700 text-sm sm:text-base">Réseau MUSO Haïti</span>
            <span className="font-heading font-extrabold text-slate-[#006b2d] text-sm sm:text-base">Partenaires Internationaux</span>
          </div>
        </div>
      </section>

    </div>
  );
};
