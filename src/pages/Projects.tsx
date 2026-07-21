import React, { useState } from 'react';
import { PageId, Language } from '../types';
import { uiTranslations } from '../data/translations';
import { FIELD_PROJECTS } from '../data/content';
import { MapPin, Calendar, CheckCircle2, ChevronRight, ArrowRight, Sprout, Heart, X, Layers, Users } from 'lucide-react';

interface ProjectsProps {
  onNavigate: (page: PageId) => void;
  currentLang: Language;
}

export const Projects: React.FC<ProjectsProps> = ({ onNavigate, currentLang }) => {
  const t = uiTranslations[currentLang];
  const [activeProject, setActiveProject] = useState<typeof FIELD_PROJECTS[0] | null>(null);

  return (
    <div className="space-y-16 pt-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="max-w-2xl space-y-2">
            <span className="text-[#006b2d] font-bold text-xs uppercase tracking-widest block">Action Locale</span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 leading-tight">
              Nos Projets sur le terrain
            </h1>
            <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
              Découvrez nos interventions stratégiques dans le département du Nord-Ouest, axées sur l'autonomisation durable des femmes rurales et le développement communautaire.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 text-[#006b2d] px-4 py-2.5 rounded-xl border border-emerald-200 text-xs font-bold shrink-0">
            <MapPin className="h-4 w-4 text-amber-600" />
            <span>Département du Nord-Ouest, Haïti</span>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* PROJECT CARDS GRID */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {FIELD_PROJECTS.map((project) => {
              const locationText = project.region || project.location || 'Port-de-Paix';
              const summaryText = project.summary || project.description || '';
              const metricsList = project.impactMetrics || project.metrics || [];
              const periodText = project.year || project.period || '';

              return (
                <div
                  key={project.id}
                  className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs ${
                          project.status === 'En cours' ? 'bg-[#006b2d] text-white' : 'bg-slate-800 text-white'
                        }`}>
                          {project.status}
                        </span>
                        <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
                          <MapPin className="h-3 w-3 text-[#006b2d]" />
                          <span>{locationText}</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-[#006b2d] transition">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {summaryText}
                      </p>

                      {/* Metrics list */}
                      {metricsList.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          {metricsList.map((m, idx) => (
                            <div key={idx} className="bg-slate-50 p-2 rounded-xl border border-slate-100 text-center">
                              <span className="block font-heading font-bold text-xs text-[#006b2d]">{m.value}</span>
                              <span className="text-[10px] text-slate-500">{m.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span>{periodText}</span>
                    </span>
                    <button
                      onClick={() => setActiveProject(project)}
                      className="text-xs font-bold text-[#006b2d] hover:underline"
                    >
                      Détails du projet
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SIDEBAR: ZONES & STATS */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* ZONES D'INTERVENTION CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs space-y-4 p-6">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="font-heading font-bold text-base text-slate-900">
                  Zones d'Intervention Phares
                </h3>
                <p className="text-xs text-slate-500">Département du Nord-Ouest, Haïti</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="font-bold text-slate-800">Port-de-Paix</span>
                  <span className="bg-[#006b2d]/10 text-[#006b2d] px-2.5 py-1 rounded-lg font-bold">12 Projets</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="font-bold text-slate-800">Jean-Rabel</span>
                  <span className="bg-[#006b2d]/10 text-[#006b2d] px-2.5 py-1 rounded-lg font-bold">8 Projets</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="font-bold text-slate-800">Saint-Louis-du-Nord</span>
                  <span className="bg-[#006b2d]/10 text-[#006b2d] px-2.5 py-1 rounded-lg font-bold">5 Projets</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="font-bold text-slate-800">Môle-Saint-Nicolas</span>
                  <span className="bg-[#006b2d]/10 text-[#006b2d] px-2.5 py-1 rounded-lg font-bold">4 Projets</span>
                </div>
              </div>
            </div>

            {/* IMPACT GLOBAL CARD */}
            <div className="bg-[#006b2d] text-white p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <h3 className="font-heading font-bold text-lg text-white">
                  Impact Global Réalisé
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <span className="font-heading font-black text-3xl text-amber-300 block">3,800+</span>
                    <span className="text-xs text-emerald-100 font-medium">Bénéficiaires directs accompagnées</span>
                  </div>
                  <div>
                    <span className="font-heading font-black text-3xl text-amber-300 block">7 Communes</span>
                    <span className="text-xs text-emerald-100 font-medium">Couvertes dans le Nord-Ouest</span>
                  </div>
                  <div>
                    <span className="font-heading font-black text-3xl text-amber-300 block">85%</span>
                    <span className="text-xs text-emerald-100 font-medium">Taux de pérennité des micro-projets</span>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 -bottom-6 opacity-10 text-white">
                <Sprout className="h-48 w-48" />
              </div>
            </div>

          </aside>

        </div>
      </section>

      {/* PROJECT DETAILS MODAL */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-[#006b2d] text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                  {activeProject.status}
                </span>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-[#006b2d]" />
                  <span>{activeProject.region || activeProject.location}</span>
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-slate-900">
                {activeProject.title}
              </h3>
            </div>

            <img
              src={activeProject.image}
              alt={activeProject.title}
              referrerPolicy="no-referrer"
              className="w-full h-64 object-cover rounded-2xl border border-slate-200"
            />

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeProject.details || activeProject.summary || activeProject.description}
            </p>

            {(activeProject.impactMetrics || activeProject.metrics) && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-heading font-bold text-xs text-slate-900 uppercase">Impacts & Chiffres clés :</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(activeProject.impactMetrics || activeProject.metrics || []).map((m, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                      <span className="font-heading font-bold text-base text-[#006b2d] block">{m.value}</span>
                      <span className="text-[11px] text-slate-600">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveProject(null);
                  onNavigate('donate');
                }}
                className="bg-[#006b2d] hover:bg-[#004d1f] text-white font-bold px-6 py-2.5 rounded-xl text-xs transition"
              >
                Soutenir ce projet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-100 rounded-3xl p-8 sm:p-12 space-y-4 border border-slate-200">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Contribuez au changement
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Chaque projet est une étape vers l'indépendance économique des femmes rurales du Nord-Ouest. Votre soutien permet de financer les infrastructures et les formations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#006b2d] hover:bg-[#004d1f] text-white px-8 py-3.5 rounded-full font-heading font-bold text-xs shadow-md transition"
            >
              Devenir partenaire
            </button>
            <button
              onClick={() => onNavigate('donate')}
              className="bg-[#1e3aa1] hover:bg-[#162a7d] text-white px-8 py-3.5 rounded-full font-heading font-bold text-xs shadow-md transition"
            >
              Faire un don
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
