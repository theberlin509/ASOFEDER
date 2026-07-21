import React, { useState } from 'react';
import { PageId, Language } from '../types';
import { uiTranslations } from '../data/translations';
import { Logo } from './Logo';
import { MapPin, Mail, Phone, Heart, Send, CheckCircle2, Facebook, Share2, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, currentLang }) => {
  const t = uiTranslations[currentLang];
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="w-full bg-slate-900 text-white rounded-t-3xl pt-16 pb-12 px-4 sm:px-6 lg:px-8 mt-16 shadow-2xl border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
        
        {/* COLUMN 1: BRAND & MISSION */}
        <div className="space-y-6 md:col-span-1">
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center text-left focus:outline-none"
          >
            <Logo lightMode={true} />
          </button>

          <p className="text-xs text-slate-300 leading-relaxed">
            Association Sociale des Femmes Engagées pour le Développement Rural. Agir ensemble pour la dignité et le développement des femmes rurales en Haïti.
          </p>

          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-[#006b2d] hover:text-white transition"
              title="Facebook ASOFEDER"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-[#006b2d] hover:text-white transition"
              title="Partager"
            >
              <Share2 className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-[#006b2d] hover:text-white transition"
              title="YouTube ASOFEDER"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* COLUMN 2: QUICK LINKS */}
        <div className="space-y-4">
          <h4 className="font-heading font-bold text-base text-white">
            Liens Rapides
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition">
                Notre Mission & Vision
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('programs')} className="hover:text-amber-400 transition">
                Programmes & Action
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('projects')} className="hover:text-amber-400 transition">
                Projets du Nord-Ouest
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('partners')} className="hover:text-amber-400 transition">
                Partenaires & Alliances
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('faq')} className="hover:text-amber-400 transition">
                Foire Aux Questions (FAQ)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-amber-400 transition">
                Contact & Localisation
              </button>
            </li>
          </ul>
        </div>

        {/* COLUMN 3: CONTACT INFO */}
        <div className="space-y-4">
          <h4 className="font-heading font-bold text-base text-white">
            Siège Social
          </h4>
          <ul className="space-y-3.5 text-xs text-slate-300">
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-[#006b2d] shrink-0 mt-0.5" />
              <span>21, Rue Beaudin, Port-de-Paix, Dept. Nord-Ouest, Haïti</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[#006b2d] shrink-0" />
              <a href="mailto:associationsociale2018@gmail.com" className="hover:text-amber-400 break-all">
                associationsociale2018@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-[#006b2d] shrink-0" />
              <a href="tel:+50933691734" className="hover:text-amber-400 font-mono">
                +509 3369-1734 / 4417-4469
              </a>
            </li>
          </ul>
        </div>

        {/* COLUMN 4: NEWSLETTER */}
        <div className="space-y-4">
          <h4 className="font-heading font-bold text-base text-white">
            Newsletter ASOFEDER
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Restez informé de nos projets sur le terrain et de l'impact auprès des femmes rurales du Nord-Ouest.
          </p>

          {subscribed ? (
            <div className="p-3 bg-emerald-950 border border-emerald-700 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Inscrit avec succès ! Merci.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Votre adresse email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006b2d]"
              />
              <button
                type="submit"
                className="w-full bg-[#006b2d] hover:bg-[#004d1f] text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <Send className="h-3.5 w-3.5" />
                <span>S'abonner</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* FOOTER BOTTOM BAR */}
      <div className="max-w-7xl mx-auto pt-8 mt-12 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <p>© 2024 - 2026 ASOFEDER. Tous droits réservés. Port-de-Paix, Haïti.</p>
        <div className="flex items-center gap-6">
          <button onClick={() => onNavigate('faq')} className="hover:text-white transition">FAQ</button>
          <button onClick={() => onNavigate('contact')} className="hover:text-white transition">Contact</button>
          <button onClick={() => onNavigate('donate')} className="hover:text-amber-400 font-bold transition">Soutenir</button>
        </div>
      </div>
    </footer>
  );
};
