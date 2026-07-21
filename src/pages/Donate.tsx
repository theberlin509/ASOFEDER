import React, { useState } from 'react';
import { PageId, Language } from '../types';
import { uiTranslations } from '../data/translations';
import { ORG_INFO } from '../data/content';
import { Heart, ShieldCheck, CheckCircle2, Copy, Smartphone, Landmark, Users, Send, Award, ArrowRight } from 'lucide-react';

interface DonateProps {
  onNavigate: (page: PageId) => void;
  currentLang: Language;
}

export const Donate: React.FC<DonateProps> = ({ currentLang }) => {
  const t = uiTranslations[currentLang];
  const [copiedMoncash, setCopiedMoncash] = useState(false);
  const [pledgeSent, setPledgeSent] = useState(false);
  const [pledgeAmount, setPledgeAmount] = useState('50');

  const copyMoncash = () => {
    navigator.clipboard.writeText('+509 3369-1734');
    setCopiedMoncash(true);
    setTimeout(() => setCopiedMoncash(false), 3000);
  };

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPledgeSent(true);
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-br from-[#003816] via-[#006b2d] to-[#1e3aa1] text-white py-16 px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-amber-400 text-slate-950 font-bold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
            Soutenir l'autonomisation des femmes rurales
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl">
            Faire un don à ASOFEDER
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Chaque don contribue directement à former une agricultrice, financer une Mutuelle MUSO, reboiser les montagnes du Nord-Ouest ou alfabetiser une mère de famille.
          </p>
        </div>
      </section>

      {/* DONATION METHODS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Moyens de contribution
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Choisissez l'option qui vous convient le mieux, depuis Haïti ou l'international.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Method 1: MonCash (Haïti) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Smartphone className="h-6 w-6" />
              </div>

              <div className="space-y-1">
                <span className="bg-amber-100 text-amber-800 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md">
                  Paiement Mobile Haïti
                </span>
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  MonCash
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Effectuez un transfert MonCash direct vers notre compte officiel ASOFEDER à Port-de-Paix.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between font-mono font-bold text-sm text-slate-900">
                <span>+509 3369-1734</span>
                <button
                  onClick={copyMoncash}
                  className="p-1.5 rounded-lg bg-emerald-100 text-[#006b2d] hover:bg-[#006b2d] hover:text-white transition"
                  title="Copier le numéro"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>

              {copiedMoncash && (
                <p className="text-[11px] font-bold text-[#006b2d] flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Numéro MonCash copié !</span>
                </p>
              )}
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Indiquez « DON ASOFEDER » en motif de transfert.
            </p>
          </div>

          {/* Method 2: Virement Bancaire */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#006b2d] flex items-center justify-center">
                <Landmark className="h-6 w-6" />
              </div>

              <div className="space-y-1">
                <span className="bg-emerald-100 text-[#006b2d] font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md">
                  Virement Compte Officiel
                </span>
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  Virement Bancaire
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Pour les dons institutionnels ou virements bancaires en Gourdes (HTG) ou Dollars (USD).
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-800">
                <div><strong>Titulaire :</strong> ASOFEDER</div>
                <div><strong>Banque :</strong> Banque Nationale de Crédit (BNC) / UNIBANK</div>
                <div><strong>Succursale :</strong> Port-de-Paix</div>
                <div><strong>Tél Contact :</strong> +509 3369-1734</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Contactez-nous pour le RIB/SWIFT complet pour les virements internationaux.
            </p>
          </div>

          {/* Method 3: Promesse de Don en ligne */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#1e3aa1] flex items-center justify-center">
                <Heart className="h-6 w-6 fill-[#1e3aa1]" />
              </div>

              <div className="space-y-1">
                <span className="bg-blue-100 text-[#1e3aa1] font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md">
                  Promesse de Don
                </span>
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  Engagement en Ligne
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Remplissez notre formulaire pour planifier un don récurrent ou par chèque.
              </p>

              <div className="grid grid-cols-3 gap-2">
                {['25$', '50$', '100$'].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setPledgeAmount(amt.replace('$', ''))}
                    className={`p-2 rounded-xl text-xs font-bold transition border ${
                      pledgeAmount === amt.replace('$', '')
                        ? 'bg-[#006b2d] text-white border-[#006b2d]'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {amt}
                  </button>
                ))}
              </div>
            </div>

            <a
              href="#pledge-form"
              className="w-full bg-[#006b2d] hover:bg-[#004d1f] text-white font-bold py-2.5 rounded-xl text-xs text-center transition block"
            >
              Compléter l'engagement
            </a>
          </div>

        </div>
      </section>

      {/* PLEDGE FORM SECTION */}
      <section id="pledge-form" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1 text-center">
            <h3 className="font-heading font-extrabold text-xl text-slate-900">
              Formulaire de promesse de don
            </h3>
            <p className="text-xs text-slate-600">
              Un membre de notre équipe financière prendra contact avec vous pour finaliser la transaction.
            </p>
          </div>

          {pledgeSent ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-[#006b2d] text-center space-y-3">
              <CheckCircle2 className="h-8 w-8 text-[#006b2d] mx-auto" />
              <h4 className="font-heading font-bold text-base text-slate-900">
                Merci du fond du cœur !
              </h4>
              <p>Votre promesse de don de {pledgeAmount}$ a bien été enregistrée. Nous vous contacterons à l'adresse indiquée pour la suite.</p>
              <button
                onClick={() => setPledgeSent(false)}
                className="bg-[#006b2d] text-white font-bold px-4 py-2 rounded-xl text-xs"
              >
                Effectuer une autre promesse
              </button>
            </div>
          ) : (
            <form onSubmit={handlePledgeSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nom & Prénom :</label>
                  <input
                    type="text"
                    required
                    placeholder="Votre nom"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#006b2d]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Email :</label>
                  <input
                    type="email"
                    required
                    placeholder="email@exemple.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#006b2d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Montant de la promesse ($ USD / HTG) :</label>
                  <input
                    type="text"
                    required
                    value={pledgeAmount}
                    onChange={(e) => setPledgeAmount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#006b2d] focus:outline-none focus:ring-2 focus:ring-[#006b2d]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Axe d'affectation souhaité :</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#006b2d]">
                    <option>Fonds Général (Besoins les plus urgents)</option>
                    <option>Agriculture & Semences</option>
                    <option>Mutuelles MUSO & Micro-crédit</option>
                    <option>Reforestation & Pépinières</option>
                    <option>WASH & Points d'Eau</option>
                    <option>Alphabétisation des Femmes</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#006b2d] hover:bg-[#004d1f] text-white font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="h-4 w-4" />
                <span>Valider la promesse de don</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* TRANSPARENCY GUARANTEE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-200 text-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="bg-[#006b2d] text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md">
              Engagement de Transparence
            </span>
            <h3 className="font-heading font-extrabold text-xl text-slate-900">
              Chaque Gourde et chaque Dollar compte
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ASOFEDER s'engage à publier ses rapports financiers annuels et à affecter au moins 85% de chaque contribution aux actions directes sur le terrain auprès des femmes rurales du Nord-Ouest.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs text-center shrink-0">
            <ShieldCheck className="h-8 w-8 text-[#006b2d] mx-auto mb-1" />
            <span className="font-heading font-extrabold text-2xl text-[#006b2d]">85%+</span>
            <p className="text-[11px] font-bold text-slate-600">Directement sur le terrain</p>
          </div>
        </div>
      </section>

    </div>
  );
};
