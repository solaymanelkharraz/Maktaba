import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

export default function AjouterEmpruntApi() {
  const { t } = useTranslation();
  const [livres, setLivres] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  
  // Seeded members hardcoded matching our database seeders
  const membres = [
    { id: 1, nom_complet: "Jean Dupont", email: "jean.dupont@example.com" },
    { id: 2, nom_complet: "Marie Martin", email: "marie.martin@example.com" },
    { id: 3, nom_complet: "Pierre Leroy", email: "pierre.leroy@example.com" },
    { id: 4, nom_complet: "Sophie Bernard", email: "sophie.bernard@example.com" },
    { id: 5, nom_complet: "Thomas Dubois", email: "thomas.dubois@example.com" }
  ];

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
  
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const fetchBooks = async () => {
    setLoadingBooks(true);
    try {
      const response = await axios.get('/livres');
      const available = response.data.filter(b => b.nombre_exemplaires > 0 && b.statut === 'disponible');
      setLivres(available);
    } catch (err) {
      console.error(err);
      setError(t('Impossible de charger les livres depuis le serveur Laravel.'));
    } finally {
      setLoadingBooks(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!livreId || !membreId || !dateEmprunt || !dateRetourPrevue) {
      setError(t('Veuillez renseigner tous les champs.'));
      return;
    }

    setLoadingSubmit(true);
    try {
      const payload = {
        livre_id: Number(livreId),
        membre_id: Number(membreId),
        date_emprunt: dateEmprunt,
        date_retour_prevue: dateRetourPrevue,
        statut: 'en cours'
      };

      await axios.post('/emprunts', payload);
      setSuccess(true);
      setLivreId('');
      setMembreId('');
      
      // Refresh books list to update available inventory
      fetchBooks();
      
      setTimeout(() => setSuccess(false), 4500);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(t('Une erreur est survenue lors de l’enregistrement de l’emprunt.'));
      }
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-800 tracking-wide">{t('Nouvel Emprunt Live')}</h3>
        <p className="text-xs text-slate-500">{t('Mode Connecté (Laravel API Client)')}</p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 bg-white/70 shadow-sm">
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200/50 text-emerald-700 text-xs font-semibold flex items-center shadow-sm"
            >
              <svg className="h-4 w-4 mr-2 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {t("L'emprunt a été enregistré sur le serveur Laravel avec succès !")}
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-200/50 text-rose-700 text-xs font-semibold flex items-center shadow-sm"
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
            <label htmlFor="api-book" className="block text-xs font-bold text-slate-700 mb-2">
              {t('Livre à emprunter')}
            </label>
            <div className="relative">
              <select
                id="api-book"
                value={livreId}
                onChange={(e) => setLivreId(e.target.value)}
                disabled={loadingBooks}
                className="block w-full text-xs bg-white border border-slate-200 rounded-xl py-3.5 px-4 text-slate-800 focus:outline-none appearance-none cursor-pointer disabled:opacity-50 shadow-sm glow-input"
              >
                {loadingBooks ? (
                  <option>{t('Chargement des livres disponibles...')}</option>
                ) : (
                  <>
                    <option value="">{t('Sélectionnez un livre disponible...')}</option>
                    {livres.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.titre} (ISBN: {b.isbn}) — [{b.nombre_exemplaires} {t('ex. disponibles')}]
                      </option>
                    ))}
                  </>
                )}
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
            <label htmlFor="api-member" className="block text-xs font-bold text-slate-700 mb-2">
              {t('Membre emprunteur')}
            </label>
            <div className="relative">
              <select
                id="api-member"
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
              <label htmlFor="api-borrow-date" className="block text-xs font-bold text-slate-700 mb-2">
                {t("Date d'emprunt")}
              </label>
              <input
                type="date"
                id="api-borrow-date"
                value={dateEmprunt}
                onChange={(e) => setDateEmprunt(e.target.value)}
                className="block w-full text-xs bg-white border border-slate-200 rounded-xl py-3.5 px-4 text-slate-800 focus:outline-none shadow-sm glow-input"
              />
            </div>

            <div>
              <label htmlFor="api-return-date" className="block text-xs font-bold text-slate-700 mb-2">
                {t('Date de retour prévue')}
              </label>
              <input
                type="date"
                id="api-return-date"
                value={dateRetourPrevue}
                onChange={(e) => setDateRetourPrevue(e.target.value)}
                className="block w-full text-xs bg-white border border-slate-200 rounded-xl py-3.5 px-4 text-slate-800 focus:outline-none shadow-sm glow-input"
              />
            </div>
          </div>

          <div className="pt-2">
            <motion.button
              type="submit"
              disabled={loadingSubmit}
              whileHover={{ scale: loadingSubmit ? 1 : 1.01 }}
              whileTap={{ scale: loadingSubmit ? 1 : 0.99 }}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-550 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/10 cursor-pointer transition-all duration-300 disabled:opacity-50"
            >
              {loadingSubmit ? t('Enregistrement en cours...') : t('Enregistrer l\'emprunt sur l\'API')}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
