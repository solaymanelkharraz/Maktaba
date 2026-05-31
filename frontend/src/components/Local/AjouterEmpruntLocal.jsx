import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBorrowing } from '../../store/librarySlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

export default function AjouterEmpruntLocal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { livres, membres } = useSelector((state) => state.library);

  // Filter books that are actually available (nombre_exemplaires > 0)
  const availableLivres = livres.filter(b => b.nombre_exemplaires > 0);

  // Pre-fill date values
  const getTodayDateString = () => new Date().toISOString().split('T')[0];
  const getTwoWeeksDateString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  };

  const [livreId, setLivreId] = useState('');
  const [membreId, setMembreId] = useState('');
  const [dateEmprunt, setDateEmprunt] = useState(getTodayDateString());
  const [dateRetourPrevue, setDateRetourPrevue] = useState(getTwoWeeksDateString());
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!livreId || !membreId || !dateEmprunt || !dateRetourPrevue) {
      setError(t('Veuillez remplir tous les champs du formulaire.'));
      return;
    }

    if (new Date(dateRetourPrevue) < new Date(dateEmprunt)) {
      setError(t('La date de retour prévue doit être postérieure ou égale à la date d’emprunt.'));
      return;
    }

    const selectedBook = livres.find(b => b.id === Number(livreId));
    if (!selectedBook || selectedBook.nombre_exemplaires <= 0) {
      setError(t('Ce livre n’est plus disponible.'));
      return;
    }

    // Dispatch the action to Redux Toolkit
    dispatch(addBorrowing({
      livre_id: Number(livreId),
      membre_id: Number(membreId),
      date_emprunt: dateEmprunt,
      date_retour_prevue: dateRetourPrevue
    }));

    // Trigger success state and clear form selections
    setSuccess(true);
    setLivreId('');
    setMembreId('');
    
    // Clear success banner after 4 seconds
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-800 tracking-wide">{t('Nouvel Emprunt Sandbox')}</h3>
        <p className="text-xs text-slate-500">{t('Sandbox Local (Redux Offline State)')}</p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 bg-white/70 shadow-sm relative">
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200/55 text-emerald-700 text-xs font-semibold flex items-center shadow-sm"
            >
              <svg className="h-4 w-4 mr-2 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {t("L'emprunt a été enregistré dans le store Redux !")}
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-200/55 text-rose-700 text-xs font-semibold flex items-center shadow-sm"
            >
              <svg className="h-4 w-4 mr-2 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Select Book */}
          <div>
            <label htmlFor="local-book" className="block text-xs font-bold text-slate-700 mb-2">
              {t('Livre à emprunter')}
            </label>
            <div className="relative">
              <select
                id="local-book"
                value={livreId}
                onChange={(e) => setLivreId(e.target.value)}
                className="block w-full text-xs bg-white border border-slate-200 rounded-xl py-3.5 px-4 text-slate-800 focus:outline-none appearance-none cursor-pointer shadow-sm glow-input"
              >
                <option value="">{t('Sélectionnez un livre...')}</option>
                {availableLivres.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.titre} ({t('restants')}: {b.nombre_exemplaires})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Select Member */}
          <div>
            <label htmlFor="local-member" className="block text-xs font-bold text-slate-700 mb-2">
              {t('Membre emprunteur')}
            </label>
            <div className="relative">
              <select
                id="local-member"
                value={membreId}
                onChange={(e) => setMembreId(e.target.value)}
                className="block w-full text-xs bg-white border border-slate-200 rounded-xl py-3.5 px-4 text-slate-800 focus:outline-none appearance-none cursor-pointer shadow-sm glow-input"
              >
                <option value="">{t('Sélectionnez un membre...')}</option>
                {membres.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nom_complet} — {m.email}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Dates Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="local-borrow-date" className="block text-xs font-bold text-slate-700 mb-2">
                {t("Date d'emprunt")}
              </label>
              <input
                type="date"
                id="local-borrow-date"
                value={dateEmprunt}
                onChange={(e) => setDateEmprunt(e.target.value)}
                className="block w-full text-xs bg-white border border-slate-200 rounded-xl py-3.5 px-4 text-slate-800 focus:outline-none shadow-sm glow-input"
              />
            </div>

            <div>
              <label htmlFor="local-return-date" className="block text-xs font-bold text-slate-700 mb-2">
                {t('Date de retour prévue')}
              </label>
              <input
                type="date"
                id="local-return-date"
                value={dateRetourPrevue}
                onChange={(e) => setDateRetourPrevue(e.target.value)}
                className="block w-full text-xs bg-white border border-slate-200 rounded-xl py-3.5 px-4 text-slate-800 focus:outline-none shadow-sm glow-input"
              />
            </div>
          </div>

          <div className="pt-2">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-555 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/10 cursor-pointer transition-all duration-300"
            >
              {t("Enregistrer l'emprunt local")}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
