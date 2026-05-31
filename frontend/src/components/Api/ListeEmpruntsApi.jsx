import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

export default function ListeEmpruntsApi() {
  const { t } = useTranslation();
  const [emprunts, setEmprunts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEmprunts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/emprunts');
      setEmprunts(response.data);
    } catch (err) {
      console.error(err);
      setError(t('Erreur lors du chargement du journal des emprunts.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmprunts();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -8 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 85 } }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800 tracking-wide">{t('Journal Live')}</h3>
          <p className="text-xs text-slate-500">{t('Mode Connecté (Laravel API Client)')}</p>
        </div>

        {!loading && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchEmprunts}
            className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 shadow-sm cursor-pointer hover:bg-slate-50 transition duration-150"
            title={t('Réessayer')}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3" />
            </svg>
          </motion.button>
        )}
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm bg-white/70">
        <AnimatePresence mode="wait">
          {loading ? (
            /* Skeleton Loading State Rows */
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 space-y-3 bg-white animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div className="h-4 w-12 bg-slate-100 rounded"></div>
                  <div className="h-4 w-1/4 bg-slate-100 rounded"></div>
                  <div className="h-4 w-1/5 bg-slate-100 rounded"></div>
                  <div className="h-4 w-16 bg-slate-100 rounded"></div>
                </div>
              ))}
            </motion.div>
          ) : error ? (
            /* Error State Block */
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
              <p className="text-xs text-rose-505 font-semibold">{error}</p>
              <button onClick={fetchEmprunts} className="mt-3 text-[11px] font-bold text-blue-600 hover:underline cursor-pointer">
                {t('Réessayer')}
              </button>
            </motion.div>
          ) : emprunts.length === 0 ? (
            /* Empty State Block */
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 text-slate-400 text-sm">
              {t('Aucun emprunt enregistré dans la base de données.')}
            </motion.div>
          ) : (
            /* Responsive Table Output */
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200/60 bg-white/60">
                <thead>
                  <tr className="bg-slate-100/70 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-5 py-4">{t('ID')}</th>
                    <th className="px-5 py-4">{t('Livre')}</th>
                    <th className="px-5 py-4">{t('Membre')}</th>
                    <th className="px-5 py-4">{t('Date Emprunt')}</th>
                    <th className="px-5 py-4">{t('Retour Prévu')}</th>
                    <th className="px-5 py-4">{t('Statut')}</th>
                  </tr>
                </thead>
                <motion.tbody
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="divide-y divide-slate-200/50 text-xs text-slate-655"
                >
                  {emprunts.map((emprunt) => (
                    <motion.tr
                      key={emprunt.id}
                      variants={rowVariants}
                      className="hover:bg-slate-50/50 transition-colors duration-150"
                    >
                      <td className="px-5 py-4 font-mono font-bold text-blue-600">
                        #{String(emprunt.id).padStart(4, '0')}
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-800">
                        {emprunt.livre?.titre || t('Livre supprimé')}
                      </td>
                      <td className="px-5 py-4 font-medium">
                        {emprunt.membre?.nom_complet || t('Membre supprimé')}
                      </td>
                      <td className="px-5 py-4 font-medium text-slate-500">
                        {formatDate(emprunt.date_emprunt)}
                      </td>
                      <td className="px-5 py-4 font-medium text-slate-500">
                        {formatDate(emprunt.date_retour_prevue)}
                      </td>
                      <td className="px-5 py-4">
                        {emprunt.statut === 'rendu' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50 shadow-sm">
                            {t('Rendu')}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/50 shadow-sm">
                            {t('En cours')}
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
