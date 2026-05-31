import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBookFilter } from '../../store/librarySlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

export default function ListeLivres() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { livres, bookFilter } = useSelector((state) => state.library);

  const filteredLivres = livres.filter((livre) => {
    if (bookFilter === 'disponible') return livre.nombre_exemplaires > 0 && livre.statut === 'disponible';
    if (bookFilter === 'indisponible') return livre.nombre_exemplaires === 0 || livre.statut === 'indisponible';
    return true;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800 tracking-wide">{t('Catalogue des Livres')}</h3>
          <p className="text-xs text-slate-500">{t('Sandbox Local (Redux Offline State)')}</p>
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center space-x-2">
          <label htmlFor="filter" className="text-xs font-semibold text-slate-500">{t('Filtrer par statut :')}</label>
          <div className="relative">
            <select
              id="filter"
              value={bookFilter}
              onChange={(e) => dispatch(setBookFilter(e.target.value))}
              className="bg-white text-xs font-semibold text-slate-650 border border-slate-200 rounded-xl py-2 pl-3.5 pr-9 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 appearance-none cursor-pointer shadow-sm transition duration-200"
            >
              <option value="tous">{t('Tous les livres')}</option>
              <option value="disponible">{t('Disponibles')}</option>
              <option value="indisponible">{t('Indisponibles')}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filteredLivres.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-12 bg-white/50 rounded-2xl border border-slate-200/80"
          >
            <p className="text-sm text-slate-500">{t('Aucun livre ne correspond au filtre sélectionné.')}</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {filteredLivres.map((livre) => (
              <motion.div
                key={livre.id}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-panel p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between border border-slate-200/80 hover:border-blue-500/30 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300 bg-white/70"
              >
                {/* Background glow decorator */}
                <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-blue-500/5 blur-2xl pointer-events-none"></div>

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-blue-600 font-semibold">{t('ISBN')}: {livre.isbn}</span>
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
                  <span className="text-slate-500">{t('Exemplaires en rayon:')}</span>
                  <span className="font-extrabold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 shadow-inner">
                    {livre.nombre_exemplaires}
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
