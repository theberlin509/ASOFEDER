import React, { useState } from 'react';
import { PageId, Language, GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/content';
import { Image as ImageIcon, MapPin, Calendar, X, ZoomIn, Filter } from 'lucide-react';

interface GalleryProps {
  onNavigate: (page: PageId) => void;
  currentLang: Language;
}

export const Gallery: React.FC<GalleryProps> = ({ currentLang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const categories = ['Tous', 'Agriculture', 'WASH', 'Éducation', 'Événements', 'Communauté'];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => selectedCategory === 'Tous' || item.category === selectedCategory
  );

  return (
    <div className="space-y-16 pb-16">
      
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-[#004d1f] via-[#006b2d] to-[#1e3aa1] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="bg-amber-400 text-slate-950 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            Reportages Photographiques
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl">
            Galerie d'Images ASOFEDER
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto">
            Découvrez en images les actions menées sur le terrain avec les femmes rurales de Port-de-Paix et du Nord-Ouest.
          </p>
        </div>
      </section>

      {/* FILTER CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedCategory === cat
                  ? 'bg-[#006b2d] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GALLERY PHOTO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="group cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-full">
                    <ZoomIn className="h-6 w-6" />
                  </div>
                </div>
                <span className="absolute top-3 left-3 bg-[#006b2d] text-white text-[10px] font-bold px-2 py-1 rounded-md">
                  {item.category}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-heading font-bold text-sm text-slate-900 group-hover:text-[#006b2d] transition">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-1 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-[#006b2d]" />
                    <span>{item.location}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-[#006b2d]" />
                    <span>{item.year}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {activeLightbox && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative text-white space-y-4">
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-10"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative max-h-[70vh] flex items-center justify-center bg-black">
              <img
                src={activeLightbox.imageUrl}
                alt={activeLightbox.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 space-y-2 bg-slate-900 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="bg-[#006b2d] text-white text-xs font-bold px-2.5 py-1 rounded-md">
                  {activeLightbox.category}
                </span>
                <span className="text-xs text-slate-400">
                  {activeLightbox.location} • {activeLightbox.year}
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-white">
                {activeLightbox.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeLightbox.caption}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
