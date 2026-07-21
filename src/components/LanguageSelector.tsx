import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LanguageSelectorProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  compact?: boolean;
}

const languages: { code: Language; name: string; flag: string; nativeName: string }[] = [
  { code: 'fr', name: 'Français', flag: '🇭🇹', nativeName: 'Français (FR)' },
  { code: 'ht', name: 'Kreyòl Ayisyen', flag: '🇭🇹', nativeName: 'Kreyòl (HT)' },
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English (EN)' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang, onSelectLang, compact = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentObj = languages.find((l) => l.code === currentLang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-[#006b2d] focus:outline-none focus:ring-2 focus:ring-[#006b2d]/30 ${
          compact ? 'py-1 px-2 text-[11px]' : ''
        }`}
        aria-expanded={isOpen}
      >
        <Globe className="h-3.5 w-3.5 text-[#006b2d]" />
        <span>{currentObj.nativeName}</span>
        <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-slate-100 bg-white py-1.5 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Choisir la langue / Chwazi lang
          </div>
          <div className="my-1 border-t border-slate-100" />
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onSelectLang(lang.code);
                setIsOpen(false);
              }}
              className={`flex w-full items-center justify-between px-3 py-2 text-xs transition ${
                currentLang === lang.code
                  ? 'bg-[#006b2d]/10 font-bold text-[#006b2d]'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </span>
              {currentLang === lang.code && <Check className="h-3.5 w-3.5 text-[#006b2d]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
