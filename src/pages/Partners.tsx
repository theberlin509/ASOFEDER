import React from 'react';
import { PageId, Language } from '../types';
import { uiTranslations } from '../data/translations';
import { PARTNERS } from '../data/content';
import { Handshake, ArrowRight, GraduationCap, Truck, Sun, Cpu, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import musoImg from '../assets/images/asofeder_muso_meeting_1784664199035.jpg';
import treeImg from '../assets/images/asofeder_tree_nursery_1784664209449.jpg';

interface PartnersProps {
  onNavigate: (page: PageId) => void;
  currentLang: Language;
}

export const Partners: React.FC<PartnersProps> = ({ onNavigate, currentLang }) => {
  const t = uiTranslations[currentLang];

  return (
    <div className="space-y-16 pt-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-slate-100/80 rounded-3xl p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-10 border border-slate-200">
          <div className="md:w-3/5 space-y-6">
            <span className="inline-block px-4 py-1.5 bg-[#006b2d]/10 text-[#006b2d] rounded-full font-heading font-bold text-xs uppercase tracking-wider">
              ALLIANCES POUR LE CHANGEMENT
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 leading-tight">
              Nos Partenaires
            </h1>
            <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
              Le progrès durable en milieu rural haïtien est une œuvre collective. Nous collaborons avec des institutions et des alliés stratégiques qui partagent notre vision d'une autonomie accrue pour les femmes de Port-de-Paix.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 bg-[#006b2d] hover:bg-[#004d1f] text-white px-8 py-3.5 rounded-xl font-heading font-bold text-xs shadow-md transition group"
            >
              <span>Devenir partenaire</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="md:w-2/5 relative">
            <div className="relative z-10 bg-white p-4 rounded-2xl shadow-lg border border-slate-200 rotate-2">
              <img
                src={musoImg}
                alt="Partenariat ASOFEDER"
                referrerPolicy="no-referrer"
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL PARTNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-1 w-10 bg-[#006b2d] rounded-full" />
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Partenaires Institutionnels & Soutiens Locaux
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-center text-center space-y-3 justify-center"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-[#006b2d] font-bold">
                <Handshake className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-sm text-slate-900">
                {partner.name}
              </h3>
              <span className="text-[10px] font-semibold text-[#006b2d] bg-emerald-50 px-2.5 py-0.5 rounded-full">
                {partner.category || partner.type || 'Partenaire'}
              </span>
              <p className="text-[11px] text-slate-500 line-clamp-2">
                {partner.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* STRATEGIC ALLIANCES BENTO GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-1 w-10 bg-[#1e3aa1] rounded-full" />
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Alliances Stratégiques
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="md:col-span-2 relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-10 flex flex-col justify-end min-h-[320px]">
            <img
              src={treeImg}
              alt="Partenariat Agricole"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="relative z-10 space-y-2">
              <span className="text-amber-400 font-bold text-[10px] uppercase tracking-wider block">Partenariat Agricole</span>
              <h3 className="font-heading font-bold text-2xl">Réseau des Producteurs Locaux du Nord-Ouest</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
                Collaboration directe avec plus de 15 coopératives locales pour assurer la sécurité alimentaire et l'accès au marché pour nos membres.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#006b2d] text-white p-8 rounded-3xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl">Éducation & Formation</h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Nos alliances avec les centres de formation technique permettent une certification reconnue pour toutes nos bénéficiaires.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 text-white font-bold text-xs hover:underline pt-2"
            >
              <span>En savoir plus</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-100 p-8 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="font-heading font-bold text-lg text-slate-900">Logistique & Infrastructures</h3>
            <div className="space-y-4 text-xs">
              <div className="flex gap-3">
                <Truck className="h-5 w-5 text-[#006b2d] shrink-0" />
                <div>
                  <p className="font-bold text-slate-900">Transport Solidaire</p>
                  <p className="text-slate-600">Acheminement des récoltes vers les marchés de Port-de-Paix.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Sun className="h-5 w-5 text-[#006b2d] shrink-0" />
                <div>
                  <p className="font-bold text-slate-900">Énergie Verte</p>
                  <p className="text-slate-600">Installation de pompes solaires d'irrigation.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="md:col-span-2 bg-[#1e3aa1]/10 p-8 rounded-3xl border border-[#1e3aa1]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-lg text-[#1e3aa1]">Soutien Technique & Connectivité</h3>
              <p className="text-xs text-slate-600 max-w-md">Digitalisation du suivi des membres MUSO et appui aux télécommunications rurales.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <span className="bg-white text-slate-900 font-heading font-bold text-xs px-4 py-2 rounded-xl shadow-xs border border-slate-200">
                Réseau HT
              </span>
              <span className="bg-white text-slate-900 font-heading font-bold text-xs px-4 py-2 rounded-xl shadow-xs border border-slate-200">
                Tech Solidarité
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 text-center space-y-6">
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
            Prêt à faire la différence avec nous ?
          </h2>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Que vous soyez une institution, une entreprise ou un expert, votre contribution peut transformer durablement la vie des femmes rurales en Haïti.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto bg-[#006b2d] hover:bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-heading font-bold text-xs sm:text-sm shadow-lg transition"
            >
              Contactez notre équipe
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3.5 rounded-xl font-heading font-bold text-xs sm:text-sm transition"
            >
              Découvrir ASOFEDER
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
