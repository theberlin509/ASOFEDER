import React, { useState } from 'react';
import { PageId, Language } from '../types';
import { uiTranslations } from '../data/translations';
import { PROGRAM_DOMAINS } from '../data/content';
import { Sprout, Droplets, Users, TreePine, Utensils, GraduationCap, HeartPulse, ArrowRight, CheckCircle2, Award, ChevronRight, X } from 'lucide-react';

interface ProgramsProps {
  onNavigate: (page: PageId) => void;
  currentLang: Language;
}

const iconMap: Record<string, React.ReactNode> = {
  'agriculture-elevage': <Sprout className="h-6 w-6 text-[#006b2d]" />,
  agriculture: <Sprout className="h-6 w-6 text-[#006b2d]" />,
  wash: <Droplets className="h-6 w-6 text-[#1e3aa1]" />,
  'economie-solidaire': <Users className="h-6 w-6 text-amber-700" />,
  environnement: <TreePine className="h-6 w-6 text-[#006b2d]" />,
  'securite-alimentaire': <Utensils className="h-6 w-6 text-amber-700" />,
  education: <GraduationCap className="h-6 w-6 text-[#1e3aa1]" />,
  sante: <HeartPulse className="h-6 w-6 text-[#006b2d]" />,
};

export const Programs: React.FC<ProgramsProps> = ({ onNavigate, currentLang }) => {
  const t = uiTranslations[currentLang];
  const [selectedDomain, setSelectedDomain] = useState<typeof PROGRAM_DOMAINS[0] | null>(null);

  return (
    <div className="space-y-16 pt-16 pb-16">
      
      {/* PAGE HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006b2d]/10 text-[#006b2d] font-heading font-bold text-xs uppercase tracking-wider">
          <Award className="h-4 w-4" />
          <span>Impact Durable • Nord-Ouest</span>
        </div>

        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 max-w-3xl mx-auto leading-tight">
          Autonomisation des femmes rurales de Port-de-Paix
        </h1>

        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Nous intervenons à travers sept piliers stratégiques pour transformer les défis en opportunités de croissance, de dignité et de résilience communautaire.
        </p>
      </section>

      {/* PROGRAMS GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAM_DOMAINS.map((domain) => {
            const icon = iconMap[domain.id] || <Sprout className="h-6 w-6 text-[#006b2d]" />;
            const desc = domain.shortDesc || domain.description || domain.fullDesc || '';
            const actionsList = domain.keyActions || domain.actions || [];

            return (
              <div
                key={domain.id}
                className="bg-white rounded-2xl overflow-hidden program-card-shadow transition-all group flex flex-col border border-slate-200/80"
              >
                <div className="h-56 relative overflow-hidden bg-slate-100">
                  <img
                    src={domain.image}
                    alt={domain.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-sm">
                    {icon}
                  </div>
                  <span className="absolute top-4 right-4 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                    {domain.beneficiariesCount}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-heading font-bold text-xl text-slate-900 group-hover:text-[#006b2d] transition">
                      {domain.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {desc}
                    </p>

                    {actionsList.length > 0 && (
                      <div className="pt-2">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Actions clés :</p>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {actionsList.map((act, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#006b2d] shrink-0 mt-0.5" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedDomain(domain)}
                      className="inline-flex items-center gap-2 text-[#006b2d] font-bold text-xs sm:text-sm hover:gap-3 transition-all"
                    >
                      <span>En savoir plus</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DOMAIN DETAILS MODAL */}
      {selectedDomain && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedDomain(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-2">
              <span className="bg-emerald-100 text-[#006b2d] font-bold text-[10px] uppercase px-3 py-1 rounded-full">
                {selectedDomain.beneficiariesCount}
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-slate-900">
                {selectedDomain.title}
              </h3>
            </div>

            <img
              src={selectedDomain.image}
              alt={selectedDomain.title}
              referrerPolicy="no-referrer"
              className="w-full h-56 object-cover rounded-2xl border border-slate-200"
            />

            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedDomain.fullDesc || selectedDomain.shortDesc || selectedDomain.description}
            </p>

            {(selectedDomain.keyActions || selectedDomain.actions) && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-heading font-bold text-xs text-slate-900 uppercase">Initiatives & Interventions :</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {(selectedDomain.keyActions || selectedDomain.actions || []).map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#006b2d] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setSelectedDomain(null);
                  onNavigate('donate');
                }}
                className="bg-[#006b2d] hover:bg-[#004d1f] text-white font-bold px-6 py-2.5 rounded-xl text-xs transition"
              >
                Soutenir ce programme
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CALL TO ACTION SECTION */}
      <section className="bg-[#006b2d] py-16 px-4 sm:px-6 lg:px-8 text-center text-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl">
            Faites partie du changement
          </h2>
          <p className="text-emerald-100 text-xs sm:text-base opacity-90 leading-relaxed">
            Votre soutien permet de financer ces programmes essentiels. Ensemble, nous pouvons construire une Haïti plus forte et plus résiliente.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('donate')}
              className="bg-white text-[#006b2d] px-8 py-3.5 rounded-full font-heading font-bold text-xs sm:text-sm shadow-xl hover:scale-105 transition-transform"
            >
              Faire un don maintenant
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="border-2 border-white/30 text-white px-8 py-3.5 rounded-full font-heading font-bold text-xs sm:text-sm hover:bg-white/10 transition-colors"
            >
              Devenir partenaire
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
