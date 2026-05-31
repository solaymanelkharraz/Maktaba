import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

export default function ListeEmprunts() {
  const { t } = useTranslation();
  const { emprunts, livres, membres } = useSelector((state) => state.library);

  // Helper to look up related entity details
  const getBookTitle = (bookId) => {
    const book = livres.find((b) => b.id === bookId);
    return book ? book.titre : `${t('Livre inconnu')} (ID: ${bookId})`;
  };

  const getMemberName = (memberId) => {
    const member = membres.find((m) => m.id === memberId);
    return member ? member.nom_complet : `${t('Membre inconnu')} (ID: ${memberId})`;
  };

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
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80 } }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-800 tracking-wide">{t('Journal des Emprunts')}</h3>
        <p className="text-xs text-slate-500">{t('Sandbox Local (Redux Offline State)')}</p>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm bg-white/70">
        {emprunts.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            {t('Aucun emprunt enregistré dans la sandbox.')}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200/60">
              <thead>
                <tr className="bg-slate-100/70 text-left text-[11px] font-bold text-slate-555 uppercase tracking-wider">
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
                className="divide-y divide-slate-200/50 bg-white/40 text-xs text-slate-655"
              >
                {emprunts.map((emprunt) => (
                  <motion.tr 
                    key={emprunt.id} 
                    variants={rowVariants}
                    className="hover:bg-slate-50/50 transition-colors duration-150"
                  >
                    {/* ID */}
                    <td className="px-5 py-4 font-mono font-bold text-blue-600">
                      #{String(emprunt.id).padStart(4, '0')}
                    </td>
                    {/* Livre */}
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {getBookTitle(emprunt.livre_id)}
                    </td>
                    {/* Membre */}
                    <td className="px-5 py-4 font-medium">
                      {getMemberName(emprunt.membre_id)}
                    </td>
                    {/* Date Emprunt */}
                    <td className="px-5 py-4 font-medium text-slate-500">
                      {formatDate(emprunt.date_emprunt)}
                    </td>
                    {/* Retour Prévu */}
                    <td className="px-5 py-4 font-medium text-slate-500">
                      {formatDate(emprunt.date_retour_prevue)}
                    </td>
                    {/* Statut Badge */}
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
      </div>
    </div>
  );
}
