import React, { useState } from 'react';
import { PageId, Language } from '../types';
import { uiTranslations } from '../data/translations';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Facebook, Share2, Youtube, ExternalLink } from 'lucide-react';
import heroImg from '../assets/images/hero_asofeder_women_1784664187658.jpg';
import cleanWaterImg from '../assets/images/asofeder_clean_water_1784664221013.jpg';

interface ContactProps {
  onNavigate: (page: PageId) => void;
  currentLang: Language;
}

export const Contact: React.FC<ContactProps> = ({ onNavigate, currentLang }) => {
  const t = uiTranslations[currentLang];
  const [submitted, setSubscribed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubscribed(false);
    }, 4000);
  };

  return (
    <div className="space-y-16 pt-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="relative rounded-[32px] overflow-hidden min-h-[320px] flex items-center bg-[#006b2d]">
          <div
            className="absolute inset-0 opacity-30 bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url('${heroImg}')` }}
          />
          <div className="relative z-10 p-8 sm:p-14 max-w-2xl bg-gradient-to-r from-[#006b2d] via-[#006b2d]/90 to-transparent text-white space-y-4">
            <span className="bg-emerald-400/20 text-emerald-300 px-4 py-1 rounded-full font-heading font-bold text-xs uppercase tracking-wider inline-block">
              Contactez-nous
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl leading-tight">
              Ensemble pour le <br />
              <span className="text-emerald-300">progrès communautaire</span>
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed opacity-95">
              Vous avez des questions ou souhaitez collaborer ? Notre équipe à Port-de-Paix est à votre écoute pour bâtir l'avenir des femmes rurales.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: CONTACT FORM */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl shadow-xs border border-slate-200/80 space-y-6">
            <div className="space-y-1">
              <h2 className="font-heading font-extrabold text-2xl text-slate-900">
                Envoyez-nous un message
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Nous vous répondrons dans les plus brefs délais.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm space-y-2 text-center">
                <CheckCircle2 className="h-8 w-8 text-[#006b2d] mx-auto" />
                <p className="font-heading font-bold">Message envoyé avec succès !</p>
                <p className="text-xs text-slate-600">L'équipe ASOFEDER à Port-de-Paix vous recontactera sous peu.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Nom complet</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Marie Dubois"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-[#006b2d] focus:border-[#006b2d] outline-none transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="marie@exemple.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-[#006b2d] focus:border-[#006b2d] outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Sujet</label>
                  <input
                    type="text"
                    required
                    placeholder="Comment pouvons-nous vous aider ?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-[#006b2d] focus:border-[#006b2d] outline-none transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Votre message ici..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-[#006b2d] focus:border-[#006b2d] outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#006b2d] hover:bg-[#004d1f] text-white px-8 py-3.5 rounded-xl font-heading font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                >
                  <span>Envoyer le message</span>
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: INFO BLOCKS & MAP */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* CONTACT INFO BLOCK */}
            <div className="bg-slate-100 p-8 rounded-3xl space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#006b2d]/10 flex items-center justify-center text-[#006b2d] shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xs text-slate-900 uppercase tracking-wider">Adresse</h3>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">21, Rue Beaudin, Port-de-Paix, Dept. Nord-Ouest, Haïti</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#006b2d]/10 flex items-center justify-center text-[#006b2d] shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xs text-slate-900 uppercase tracking-wider">Téléphone</h3>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">+509 3369-1734 / 4417-4469</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#006b2d]/10 flex items-center justify-center text-[#006b2d] shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xs text-slate-900 uppercase tracking-wider">Email</h3>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium break-all">associationsociale2018@gmail.com</p>
                </div>
              </div>
            </div>

            {/* OPENING HOURS BLOCK */}
            <div className="bg-white p-8 rounded-3xl shadow-xs border border-slate-200/80 space-y-4">
              <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#006b2d]" />
                <span>Heures d'ouverture</span>
              </h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Lundi - Vendredi</span>
                  <span className="font-bold text-[#006b2d]">08:00 - 16:00</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Samedi</span>
                  <span className="font-bold text-[#006b2d]">09:00 - 13:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Dimanche</span>
                  <span className="text-rose-600 font-bold">Fermé</span>
                </div>
              </div>
            </div>

            {/* SOCIAL MEDIA */}
            <div className="flex items-center justify-between p-4 bg-[#1e3aa1]/5 rounded-2xl border border-[#1e3aa1]/10">
              <span className="text-xs font-bold text-slate-700">Suivez notre action :</span>
              <div className="flex gap-2">
                <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1e3aa1] shadow-xs hover:bg-[#1e3aa1] hover:text-white transition">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1e3aa1] shadow-xs hover:bg-[#1e3aa1] hover:text-white transition">
                  <Share2 className="h-4 w-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1e3aa1] shadow-xs hover:bg-[#1e3aa1] hover:text-white transition">
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* MAP SECTION CARD */}
        <div className="mt-12 h-96 w-full rounded-3xl overflow-hidden shadow-md relative border border-slate-200 bg-slate-900 flex items-center justify-center text-center p-6">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url('${cleanWaterImg}')` }}
          />
          <div className="relative z-10 bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xl max-w-sm space-y-3 text-slate-900">
            <div className="w-12 h-12 bg-[#006b2d] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <MapPin className="h-6 w-6" />
            </div>
            <p className="font-heading font-extrabold text-base">Siège National ASOFEDER</p>
            <p className="text-xs text-slate-600 font-medium">21, Rue Beaudin, Port-de-Paix, Dept. Nord-Ouest, Haïti</p>
            <a
              href="https://maps.google.com/?q=Port-de-Paix+Haiti"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006b2d] hover:underline pt-1"
            >
              <span>Ouvrir dans Google Maps</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
