import React from 'react';
import { PageId, Language } from '../types';
import { uiTranslations } from '../data/translations';
import { ORG_INFO } from '../data/content';
import { Calendar, Flag, Eye, Heart, CheckCircle2, ShieldCheck, Award, Users, ArrowRight, BookOpen, Coins, Sprout } from 'lucide-react';

interface AboutProps {
  onNavigate: (page: PageId) => void;
  currentLang: Language;
}

export const About: React.FC<AboutProps> = ({ onNavigate, currentLang }) => {
  const t = uiTranslations[currentLang];

  return (
    <div className="space-y-16 pt-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006b2d]/10 text-[#006b2d] border border-[#006b2d]/20 text-xs font-bold">
              <Calendar className="h-4 w-4" />
              <span>Fondée le 18 Février 2018</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 leading-tight">
              Au service de la dignité et de l'autonomie des femmes.
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              ASOFEDER (Association de Solidarité des Femmes pour le Développement Rural) est une organisation haïtienne basée à Port-de-Paix, dédiée à transformer les défis en opportunités pour les femmes vivant dans les zones rurales du Nord-Ouest.
            </p>
          </div>

          <div className="relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="/src/assets/images/hero_asofeder_women_1784664187658.jpg"
              alt="Femmes ASOFEDER à Port-de-Paix"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <p className="font-heading font-bold text-lg sm:text-xl italic">
                « Ensemble, nous cultivons l'avenir. »
              </p>
              <p className="text-xs text-emerald-200">
                Port-de-Paix • Nord-Ouest, Haïti
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION, VISION, VALUES (BENTO GRID) */}
      <section className="bg-slate-100/70 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[#006b2d] font-bold text-xs uppercase tracking-widest block">Nos Piliers</span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900">
              Notre Fondement
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Nous croyons en un monde où chaque femme rurale dispose des outils, de la confiance et du soutien nécessaires pour diriger son propre développement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* MISSION */}
            <div className="bg-white p-8 rounded-3xl shadow-xs border border-slate-200 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#006b2d]/10 flex items-center justify-center text-[#006b2d]">
                  <Flag className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  Notre Mission
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Promouvoir l’autonomisation socio-économique des femmes rurales à travers l’éducation, l’accès aux ressources agricoles et financières, et la défense de leurs droits fondamentaux.
                </p>
              </div>
            </div>

            {/* VISION */}
            <div className="bg-[#006b2d] text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Notre Vision
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                  Devenir le pilier central de l’émancipation féminine dans le Nord-Ouest d’Haïti, créant des communautés rurales autonomes, résilientes et équitables.
                </p>
              </div>
            </div>

            {/* VALUES */}
            <div className="bg-white p-8 rounded-3xl shadow-xs border border-slate-200 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1e3aa1]/10 flex items-center justify-center text-[#1e3aa1]">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  Nos Valeurs
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#006b2d]" />
                    <span>Solidarité & Transparence</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#006b2d]" />
                    <span>Intégrité & Respect de la personne</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#006b2d]" />
                    <span>Persévérance face aux crises</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#006b2d]" />
                    <span>Innovation Sociale Rurale</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[#006b2d] font-bold text-xs uppercase tracking-widest block">Notre Parcours</span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900">
            Notre Histoire
          </h2>
        </div>

        <div className="space-y-12">
          {/* 2018 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
            <div className="space-y-3">
              <span className="font-heading font-black text-3xl sm:text-4xl text-[#006b2d]">2018</span>
              <h3 className="font-heading font-bold text-xl text-slate-900">La Fondation de l'Association</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Naissance d'ASOFEDER le 18 Février 2018 à Port-de-Paix par un collectif de femmes déterminées à apporter des réponses concrètes à la précarité des mères de famille rurales.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden h-48 shadow-md">
              <img
                src="/src/assets/images/asofeder_muso_meeting_1784664199035.jpg"
                alt="Fondation ASOFEDER 2018"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 2020 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
            <div className="rounded-2xl overflow-hidden h-48 shadow-md order-2 md:order-1">
              <img
                src="/src/assets/images/asofeder_tree_nursery_1784664209449.jpg"
                alt="Premiers Programmes ASOFEDER"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-3 order-1 md:order-2">
              <span className="font-heading font-black text-3xl sm:text-4xl text-[#1e3aa1]">2020</span>
              <h3 className="font-heading font-bold text-xl text-slate-900">Expansion des Programmes</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Mise en place des premières Mutuelles de Solidarité (MUSO) et des pépinières environnementales communautaires dans plusieurs sections rurales de la région.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OBJECTIVES & IMPACT STATS */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-4">
              <span className="bg-amber-400 text-slate-950 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                Impact Mesurable
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                Nos Objectifs Prioritaires
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Chaque action que nous entreprenons est mesurée par son impact concret sur la vie quotidienne des femmes et de leurs familles.
              </p>

              <div className="p-6 bg-[#1e3aa1] rounded-2xl space-y-1 shadow-lg border border-blue-800">
                <span className="font-heading font-black text-3xl text-white">2,100+</span>
                <p className="text-xs text-blue-100 font-bold uppercase tracking-wider">Femmes Impactées Directement</p>
              </div>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700 space-y-2">
                <ShieldCheck className="h-6 w-6 text-emerald-400" />
                <h4 className="font-heading font-bold text-sm text-white">Sensibilisation & Droits</h4>
                <p className="text-xs text-slate-300">Prévention des violences basées sur le genre et accompagnement des femmes rurales.</p>
              </div>

              <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700 space-y-2">
                <Coins className="h-6 w-6 text-amber-400" />
                <h4 className="font-heading font-bold text-sm text-white">Indépendance Financière</h4>
                <p className="text-xs text-slate-300">Micro-crédit rotatif via les Mutuelles MUSO pour soutenir le petit commerce.</p>
              </div>

              <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700 space-y-2">
                <BookOpen className="h-6 w-6 text-blue-400" />
                <h4 className="font-heading font-bold text-sm text-white">Éducation Inclusive</h4>
                <p className="text-xs text-slate-300">Alphabétisation fonctionnelle et gestion de micro-entreprise.</p>
              </div>

              <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700 space-y-2">
                <Sprout className="h-6 w-6 text-emerald-400" />
                <h4 className="font-heading font-bold text-sm text-white">Sécurité Alimentaire</h4>
                <p className="text-xs text-slate-300">Accès aux semences certifiées et techniques agroécologiques.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-emerald-50 rounded-3xl p-8 sm:p-14 border border-emerald-200 space-y-6">
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900">
            Faites partie du changement
          </h2>
          <p className="text-xs sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Votre soutien permet à une femme de Port-de-Paix de devenir un leader dans sa communauté. Rejoignez notre mission aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <button
              onClick={() => onNavigate('donate')}
              className="bg-[#006b2d] hover:bg-[#004d1f] text-white px-8 py-3.5 rounded-full font-heading font-bold text-xs sm:text-sm shadow-md transition"
            >
              Faire un don
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white text-[#006b2d] border-2 border-[#006b2d] hover:bg-emerald-100 px-8 py-3.5 rounded-full font-heading font-bold text-xs sm:text-sm transition"
            >
              Devenir partenaire
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
