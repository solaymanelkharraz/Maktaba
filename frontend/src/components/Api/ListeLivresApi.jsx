import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

export default function ListeLivresApi() {
  const { t } = useTranslation();
  const [livres, setLivres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLivres = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/livres');
      setLivres(response.data);
    } catch (err) {
      console.error(err);
      setError(t('Erreur lors du chargement des livres. Assurez-vous que l’API Laravel est démarrée.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLivres();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90 } }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800 tracking-wide">{t('Catalogue Live')}</h3>
          <p className="text-xs text-slate-500">{t('Mode Connecté (Laravel API Client)')}</p>
        </div>
        
        {/* Refresh Action Button */}
        {!loading && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchLivres}
            className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 shadow-sm cursor-pointer hover:bg-slate-50 transition duration-150"
            title={t('Réessayer')}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3" />
            </svg>
          </motion.button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          /* Staggered Tailwind Skeleton Screens */
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-panel p-5 rounded-2xl border border-slate-200/80 bg-white space-y-4 animate-pulse">
                <div className="flex justify-between items-center">
                  <div className="h-3 w-28 bg-slate-100 rounded"></div>
                  <div className="h-5 w-16 bg-slate-100 rounded-full"></div>
                </div>
                <div className="h-5 w-3/4 bg-slate-100 rounded mt-2"></div>
                <div className="h-8 w-full bg-slate-100 rounded mt-4"></div>
              </div>
            ))}
          </motion.div>
        ) : error ? (
          /* Error State Panel */
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-10 px-5 bg-rose-50 rounded-2xl border border-rose-200/40 shadow-sm"
          >
            <svg className="h-10 w-10 text-rose-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm font-semibold text-rose-700">{error}</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={fetchLivres}
              className="mt-4 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-50 cursor-pointer shadow-sm transition"
            >
              {t('Réessayer')}
            </motion.button>
          </motion.div>
        ) : livres.length === 0 ? (
          /* Empty State Panel */
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white/50 rounded-2xl border border-slate-200/80"
          >
            <p className="text-sm text-slate-500">{t('Aucun livre trouvé dans le catalogue.')}</p>
          </motion.div>
        ) : (
          /* Live Book Catalog Grid */
          <motion.div
            key="content"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {livres.map((livre) => (
              <motion.div
                key={livre.id}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="glass-panel p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between border border-slate-200/80 hover:border-blue-500/20 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300 bg-white/70"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-slate-400">{t('ISBN')}: {livre.isbn}</span>
                    {livre.nombre_exemplaires > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50 shadow-sm">
                        {t('Disponible')}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/50 shadow-sm">
                        {t('Indisponible')}
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-slate-800 tracking-wide mb-1 leading-snug">{livre.titre}</h4>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">{t('Statut stock:')}</span>
                  <span className="font-extrabold text-slate-700 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                    {livre.nombre_exemplaires} {t('ex. disponibles')}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
