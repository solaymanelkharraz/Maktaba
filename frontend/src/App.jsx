import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setLocale } from './store/librarySlice';
import { useTranslation } from './hooks/useTranslation';

// Local Sandbox Components
import ListeLivres from './components/Local/ListeLivres';
import ListeEmprunts from './components/Local/ListeEmprunts';
import AjouterEmpruntLocal from './components/Local/AjouterEmpruntLocal';

// Live API Components
import ListeLivresApi from './components/Api/ListeLivresApi';
import ListeEmpruntsApi from './components/Api/ListeEmpruntsApi';
import AjouterEmpruntApi from './components/Api/AjouterEmpruntApi';

// Layout shell component with gorgeous header
function Layout({ children, mode }) {
  const { t, locale } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-slate-50 to-blue-50/20 text-slate-700 flex flex-col selection:bg-blue-600 selection:text-white dot-grid">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" className="h-9 w-auto" alt="Maktaba Logo" />
          </Link>

          {/* Indicators and Lang Switcher */}
          <div className="flex items-center space-x-4">
            <AnimatePresence mode="wait">
              {mode === 'local' && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center space-x-2 bg-blue-50 border border-blue-200/50 px-3 py-1.5 rounded-full"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase">{t('Sandbox Active')}</span>
                </motion.div>
              )}

              {mode === 'api' && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200/50 px-3 py-1.5 rounded-full"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-bold tracking-wider text-emerald-600 uppercase">{t('Live API Active')}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Language Switcher */}
            <div className="flex items-center space-x-1 border-l border-slate-200/80 pl-4 h-6">
              <button 
                onClick={() => dispatch(setLocale('fr'))}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all duration-200 ${locale === 'fr' ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-sm cursor-pointer' : 'text-slate-400 hover:text-slate-650 hover:bg-slate-100/50 cursor-pointer'}`}
              >
                FR
              </button>
              <button 
                onClick={() => dispatch(setLocale('en'))}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all duration-200 ${locale === 'en' ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-sm cursor-pointer' : 'text-slate-400 hover:text-slate-650 hover:bg-slate-100/50 cursor-pointer'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center">
        {children}
      </main>

      <footer className="border-t border-slate-200/60 bg-white/20 py-4 text-center text-[10px] text-slate-500">
        &copy; {new Date().getFullYear()} Maktaba. Codebase d'exécution hybride (Redux Offline / Laravel REST API).
      </footer>
    </div>
  );
}

// Sleek Landing/Hero Selection Page
function HeroPage() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto text-center space-y-12 py-10"
    >
      {/* Brand Big Logo */}
      <div className="flex flex-col items-center justify-center">
        <img src="/logo.png" className="h-24 w-auto drop-shadow-sm" alt="Maktaba Logo" />
        <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-medium mt-6">
          {t("Accédez au catalogue d'administration. Testez l'application en mode local Sandbox, ou connectez-vous directement avec le backend en direct Laravel.")}
        </p>
      </div>

      {/* Double Huge Action Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        
        {/* Sandbox Local Mode card */}
        <Link to="/local">
          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="glass-panel p-8 rounded-3xl border border-slate-200/80 hover:border-blue-500/30 transition-all duration-300 text-left h-full flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="h-12 w-12 bg-blue-50 border border-blue-200/40 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-105 transition-transform duration-300">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-3">{t("Mode Sandbox")}</h2>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {t("Exécution hors-ligne instantanée utilisant Redux Toolkit. Permet de simuler des emprunts sur des livres et membres pré-enregistrés sans démarrer de serveur.")}
              </p>
            </div>
            
            <div className="mt-8 flex items-center text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
              {t("Lancer le Sandbox")}
              <svg className="h-4 w-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>
        </Link>

        {/* Live API Mode card */}
        <Link to="/api">
          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="glass-panel p-8 rounded-3xl border border-slate-200/80 hover:border-emerald-500/30 transition-all duration-300 text-left h-full flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="h-12 w-12 bg-emerald-50 border border-emerald-200/40 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-105 transition-transform duration-300">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-3">{t("Mode Live API")}</h2>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {t("Communique avec le serveur Laravel via Axios. Idéal pour synchroniser la base de données réelle (MySQL / WAMP) et effectuer des tests d'intégration complets.")}
              </p>
            </div>
            
            <div className="mt-8 flex items-center text-xs font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors duration-200">
              {t("Lancer le Mode Live")}
              <svg className="h-4 w-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>
        </Link>

      </div>
    </motion.div>
  );
}

export default function App() {
  const { t } = useTranslation();
  const location = useLocation();
  const getMode = () => {
    if (location.pathname.startsWith('/local')) return 'local';
    if (location.pathname.startsWith('/api')) return 'api';
    return 'none';
  };

  return (
    <Routes>
      
      {/* Route: Hero Landing Page */}
      <Route path="/" element={
        <Layout mode={getMode()}>
          <HeroPage />
        </Layout>
      } />

      {/* Route: Local Sandbox Dashboard */}
      <Route path="/local" element={
        <Layout mode="local">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Header / Navigation bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
              <div>
                <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase">{t('Espace Sandbox')}</span>
                <h2 className="text-2xl font-black text-slate-900">{t('Administration Sandbox')}</h2>
              </div>
              <Link 
                to="/"
                className="px-4.5 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition duration-200"
              >
                {t('Quitter le Sandbox')}
              </Link>
            </div>

            {/* Dashboard Workspace Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form and Book lists */}
              <div className="lg:col-span-5 space-y-8">
                <AjouterEmpruntLocal />
                <ListeLivres />
              </div>
              
              {/* Right Column: Borrowing Journal */}
              <div className="lg:col-span-7">
                <ListeEmprunts />
              </div>
            </div>
          </motion.div>
        </Layout>
      } />

      {/* Route: Live API Connect Dashboard */}
      <Route path="/api" element={
        <Layout mode="api">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 tracking-widest uppercase">{t('Espace Connecté')}</span>
                <h2 className="text-2xl font-black text-slate-900">{t('Administration Live API')}</h2>
              </div>
              <Link 
                to="/"
                className="px-4.5 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition duration-200"
              >
                {t('Quitter le mode Live')}
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form and Book list */}
              <div className="lg:col-span-5 space-y-8">
                <AjouterEmpruntApi />
                <ListeLivresApi />
              </div>

              {/* Right Column: Borrowing Journal */}
              <div className="lg:col-span-7">
                <ListeEmpruntsApi />
              </div>
            </div>
          </motion.div>
        </Layout>
      } />

    </Routes>
  );
}
