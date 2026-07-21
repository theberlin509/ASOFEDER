import React, { useState } from 'react';
import { PageId, Language } from '../types';
import { uiTranslations } from '../data/translations';
import { Logo } from './Logo';
import { HeartHandshake, Menu, X, Heart, Globe, Home as HomeIcon, Info, Grid, Share2, Handshake, FileText, Mail, Phone, MapPin } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  currentLang,
  onSelectLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = uiTranslations[currentLang];

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { id: PageId; label: Record<Language, string>; icon: React.ReactNode }[] = [
    { id: 'home', label: { fr: 'Accueil', en: 'Home', ht: 'Akèy' }, icon: <HomeIcon className="h-4 w-4" /> },
    { id: 'about', label: { fr: 'À Propos', en: 'About', ht: 'Konsènan' }, icon: <Info className="h-4 w-4" /> },
    { id: 'programs', label: { fr: 'Programmes', en: 'Programs', ht: 'Pwogram' }, icon: <Grid className="h-4 w-4" /> },
    { id: 'projects', label: { fr: 'Projets', en: 'Projects', ht: 'Pwojè' }, icon: <Share2 className="h-4 w-4" /> },
    { id: 'partners', label: { fr: 'Partenaires', en: 'Partners', ht: 'Patnè' }, icon: <Handshake className="h-4 w-4" /> },
    { id: 'blog', label: { fr: 'Blog', en: 'Blog', ht: 'Nouvèl' }, icon: <FileText className="h-4 w-4" /> },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-xs border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3.5">
          
          {/* LOGO */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-none"
          >
            <Logo />
          </button>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`font-heading font-bold text-xs uppercase tracking-wide transition-all pb-1 ${
                    isActive
                      ? 'text-[#1e3aa1] border-b-2 border-[#1e3aa1]'
                      : 'text-slate-600 hover:text-[#1e3aa1]'
                  }`}
                >
                  {link.label[currentLang]}
                </button>
              );
            })}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 rounded-full p-1 text-[11px] font-bold text-slate-700">
              {(['fr', 'en', 'ht'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onSelectLang(lang)}
                  className={`px-2 py-0.5 rounded-full uppercase transition ${
                    currentLang === lang ? 'bg-[#006b2d] text-white shadow-xs' : 'hover:text-[#006b2d]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Support CTA */}
            <button
              onClick={() => handleNavClick('donate')}
              className="bg-[#1e3aa1] hover:bg-[#162a7d] text-white px-5 sm:px-6 py-2.5 rounded-full font-heading font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <Heart className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
              <span>{t.donateBtn}</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDE NAV OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Side Drawer */}
          <aside className="relative z-10 w-72 max-w-full bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-heading font-black text-xl text-[#006b2d]">ASOFEDER</span>
                <p className="text-[11px] text-slate-500 font-medium leading-tight">
                  Port-de-Paix • Nord-Ouest, Haïti
                </p>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition text-left ${
                      isActive
                        ? 'bg-[#1e3aa1]/10 text-[#1e3aa1]'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label[currentLang]}</span>
                  </button>
                );
              })}

              <div className="pt-4 border-t border-slate-100 mt-4 space-y-2 px-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Langue / Langaj</p>
                <div className="flex gap-2">
                  {(['fr', 'en', 'ht'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        onSelectLang(lang);
                      }}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold uppercase border ${
                        currentLang === lang
                          ? 'bg-[#006b2d] text-white border-[#006b2d]'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2">
              <button
                onClick={() => handleNavClick('donate')}
                className="w-full bg-[#1e3aa1] text-white py-3 rounded-xl font-heading font-bold text-xs text-center shadow-md block"
              >
                {t.donateBtn}
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
