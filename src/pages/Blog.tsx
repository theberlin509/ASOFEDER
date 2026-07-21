import React, { useState, useEffect } from 'react';
import { PageId, Language, BlogPost } from '../types';
import { uiTranslations } from '../data/translations';
import { FALLBACK_BLOG_POSTS } from '../data/content';
import { Calendar, Clock, ArrowRight, ArrowUpRight, User, Tag, ChevronRight, X, Heart, Bookmark, Share2, CheckCircle2 } from 'lucide-react';

interface BlogProps {
  onNavigate: (page: PageId) => void;
  currentLang: Language;
}

export const Blog: React.FC<BlogProps> = ({ onNavigate, currentLang }) => {
  const t = uiTranslations[currentLang];
  const [posts, setPosts] = useState<BlogPost[]>(FALLBACK_BLOG_POSTS);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Tous');

  useEffect(() => {
    const fetchWpPosts = async () => {
      try {
        const res = await fetch('https://asofeder.org/wp-json/wp/v2/posts?_embed&per_page=10');
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
                excerpt: cleanExcerpt.slice(0, 160) + '...',
                content: item.content?.rendered || '',
                imageUrl: featuredImage,
                date: new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
                author: 'Équipe ASOFEDER',
                category: 'Actualité',
                link: item.link
              };
            });
            setPosts(mapped);
          }
        }
      } catch (err) {
        console.warn('WordPress API unreachable, using fallback ASOFEDER posts:', err);
      }
    };
    fetchWpPosts();
  }, []);

  const categories = ['Tous', 'Agriculture', 'Éducation', 'Santé', 'WASH', 'Micro-finance'];

  const filteredPosts = activeCategory === 'Tous'
    ? posts
    : posts.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const featuredPost = posts[0];

  return (
    <div className="space-y-16 pt-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200">
          <div className="max-w-2xl space-y-2">
            <span className="text-[#006b2d] font-bold text-xs uppercase tracking-widest block">
              Impact & Communauté
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 leading-tight">
              Histoires du Terrain
            </h1>
            <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
              Découvrez comment nos initiatives transforment la vie des femmes rurales et de leurs familles à Port-de-Paix et au-delà.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                  activeCategory === cat
                    ? 'bg-[#006b2d] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED STORY (ASYMMETRIC LAYOUT) */}
      {featuredPost && activeCategory === 'Tous' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-100 rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs">
            <div className="lg:col-span-7 h-72 sm:h-96 relative overflow-hidden">
              <img
                src={featuredPost.imageUrl}
                alt={featuredPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-10 space-y-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-[#006b2d] text-white px-3 py-0.5 rounded-full font-bold text-[10px] uppercase">
                  {featuredPost.category}
                </span>
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>{featuredPost.date}</span>
                </span>
              </div>

              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 leading-snug">
                {featuredPost.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <button
                onClick={() => setSelectedPost(featuredPost)}
                className="inline-flex items-center gap-2 text-[#1e3aa1] font-bold text-xs sm:text-sm hover:gap-3 transition-all pt-2"
              >
                <span>Lire l'histoire complète</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ARTICLES BENTO GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 relative overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#006b2d] text-white text-[10px] font-bold px-2 py-1 rounded-md">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{post.date}</span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-[#006b2d] transition line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-[#006b2d]" />
                  <span>{post.author}</span>
                </span>
                <span className="text-xs font-bold text-[#1e3aa1] flex items-center gap-1 group-hover:underline">
                  <span>Lire</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* DETAILED ARTICLE READER MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-10 space-y-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="bg-[#006b2d] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {selectedPost.category}
                </span>
                <span className="text-xs text-slate-500 font-medium">{selectedPost.date}</span>
              </div>

              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 leading-snug">
                {selectedPost.title}
              </h2>

              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium pb-2 border-b border-slate-100">
                <User className="h-4 w-4 text-[#006b2d]" />
                <span>Publié par {selectedPost.author}</span>
              </div>
            </div>

            <img
              src={selectedPost.imageUrl}
              alt={selectedPost.title}
              referrerPolicy="no-referrer"
              className="w-full h-72 object-cover rounded-2xl border border-slate-200"
            />

            <div className="prose text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
              <p className="font-medium text-slate-800 text-sm sm:text-base">
                {selectedPost.excerpt}
              </p>

              {selectedPost.content ? (
                <div 
                  className="space-y-4 border-t border-slate-100 pt-4"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }} 
                />
              ) : (
                <p>
                  Dans les zones rurales de Port-de-Paix et du département du Nord-Ouest, ASOFEDER continue de structurer et d'accompagner les initiatives menées par les femmes. Grâce aux mutuelles de solidarité (MUSO) et aux partenariats agricoles, des centaines de mères de famille accèdent aujourd'hui à des revenus stables et garantissent la scolarisation de leurs enfants.
                </p>
              )}
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
              <p className="text-xs text-emerald-900 font-bold">Inspiré par cette initiative ?</p>
              <button
                onClick={() => {
                  setSelectedPost(null);
                  onNavigate('donate');
                }}
                className="bg-[#006b2d] hover:bg-[#004d1f] text-white font-bold px-5 py-2 rounded-xl text-xs transition shadow-xs"
              >
                Soutenir nos actions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEWSLETTER CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1e3aa1]/10 rounded-3xl p-8 sm:p-12 text-center space-y-4 border border-[#1e3aa1]/20">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Ne manquez aucune nouvelle du terrain
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Inscrivez-vous à notre bulletin d'information pour recevoir directement les actualités et les témoignages des femmes rurales de Port-de-Paix.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006b2d] flex-1"
            />
            <button
              onClick={() => alert('Merci pour votre inscription !')}
              className="bg-[#006b2d] hover:bg-[#004d1f] text-white px-6 py-3 rounded-xl font-heading font-bold text-xs shadow-md transition"
            >
              S'abonner
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
