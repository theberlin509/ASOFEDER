import React, { useState } from 'react';
import { PageId, Language } from '../types';
import { FAQ_ITEMS } from '../data/content';
import { HelpCircle, ChevronDown, Search, MessageSquare, ArrowRight } from 'lucide-react';

interface FaqProps {
  onNavigate: (page: PageId) => void;
  currentLang: Language;
}

export const Faq: React.FC<FaqProps> = ({ onNavigate, currentLang }) => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const categories = ['Tous', 'Général', 'Adhésion & Bénévolat', 'Donation & Financement', 'Projets'];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'Tous' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-16 pb-16">
      
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-[#004d1f] via-[#006b2d] to-[#1e3aa1] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="bg-amber-400 text-slate-950 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            Réponses aux questions fréquentes
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl">
            Foire Aux Questions (FAQ)
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto">
            Retrouvez toutes les informations utiles concernant le fonctionnement, les adhésions et les financements d'ASOFEDER.
          </p>
        </div>
      </section>

      {/* SEARCH AND CATEGORIES */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher une question ou un mot clé..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#006b2d]"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCategory === cat
                  ? 'bg-[#006b2d] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ ACCORDION LIST */}
        <div className="space-y-3 pt-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-heading font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2.5">
                    <HelpCircle className="h-5 w-5 text-[#006b2d] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#006b2d]' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-2 space-y-2">
                    <p className="pt-3">{faq.answer}</p>
                    <div className="pt-2">
                      <span className="bg-emerald-50 text-[#006b2d] font-bold text-[10px] px-2 py-0.5 rounded-md">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* HAVE MORE QUESTIONS */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white text-center space-y-4">
          <MessageSquare className="h-8 w-8 text-amber-400 mx-auto" />
          <h3 className="font-heading font-bold text-lg">
            Vous avez une autre question ?
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Notre équipe à Port-de-Paix est disponible par téléphone ou email pour répondre à toutes vos interrogations.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 bg-[#006b2d] hover:bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition"
          >
            <span>Posez-nous votre question</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
