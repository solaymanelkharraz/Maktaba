<!DOCTYPE html>
<html lang="fr" class="h-full bg-slate-50 text-slate-800">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', __('Maktaba - Gestion de Bibliothèque'))</title>
    
    <!-- Google Fonts: Plus Jakarta Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS v4 CDN -->
    <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
    
    <style>
        @theme {
            --font-sans: 'Plus Jakarta Sans', sans-serif;
        }
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            position: relative;
        }
        /* Highly Premium Mesh Gradient Decorators */
        body::before {
            content: "";
            position: absolute;
            top: -150px;
            right: -100px;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, rgba(99, 102, 241, 0.02) 60%, transparent 100%);
            filter: blur(60px);
            pointer-events: none;
            z-index: -1;
        }
        body::after {
            content: "";
            position: absolute;
            top: 300px;
            left: -150px;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, rgba(59, 130, 246, 0.02) 70%, transparent 100%);
            filter: blur(80px);
            pointer-events: none;
            z-index: -1;
        }
        /* Subtle Geometric Dot Grid Pattern overlay */
        .dot-grid {
            background-image: radial-gradient(rgba(59, 130, 246, 0.04) 1.5px, transparent 1.5px);
            background-size: 24px 24px;
        }
        /* Premium Neumorphic-Glass Panels */
        .glass-panel {
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.7);
            box-shadow: 
                0 4px 20px -2px rgba(59, 130, 246, 0.02),
                0 20px 40px -15px rgba(15, 23, 42, 0.04),
                inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }
    </style>
    @yield('styles')
</head>
<body class="flex flex-col min-h-screen dot-grid selection:bg-blue-600 selection:text-white">

    <!-- Top Navigation Header -->
    <header class="sticky top-0 z-50 glass-panel border-b border-slate-200/50 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Logo / Title -->
                <div class="flex items-center">
                    <a href="{{ route('emprunts.index') }}" class="flex items-center">
                        <img src="/logo.png" class="h-10 w-auto" alt="Maktaba Logo">
                    </a>
                </div>

                <!-- Navigation Links -->
                <div class="flex items-center space-x-4">
                    <nav class="flex items-center space-x-1 sm:space-x-3">
                        <a href="{{ route('emprunts.index') }}" 
                           class="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 {{ Request::routeIs('emprunts.index') ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent' }}">
                            {{ __('Liste des Emprunts') }}
                        </a>
                        <a href="{{ route('emprunts.create') }}" 
                           class="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 {{ Request::routeIs('emprunts.create') ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent' }}">
                            {{ __('Nouvel Emprunt') }}
                        </a>
                    </nav>

                    <!-- Language Switcher -->
                    <div class="flex items-center space-x-1 border-l border-slate-200 pl-4 h-6">
                        <a href="{{ route('locale.change', 'fr') }}" 
                           class="px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all duration-200 {{ App::getLocale() === 'fr' ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-sm' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100/50' }}">
                            FR
                        </a>
                        <a href="{{ route('locale.change', 'en') }}" 
                           class="px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all duration-200 {{ App::getLocale() === 'en' ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-sm' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100/50' }}">
                            EN
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content Container -->
    <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <!-- Floating Success Notification Toast -->
        @if(session('success'))
            <div id="toast-success" class="fixed top-20 right-4 z-50 flex items-center p-4 mb-4 w-full max-w-sm rounded-2xl glass-panel shadow-2xl border-l-4 border-emerald-500 transform transition-all duration-500 translate-y-0 opacity-100" role="alert">
                <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-emerald-600 bg-emerald-50 rounded-xl">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div class="ml-3 text-sm font-bold text-slate-800">
                    {{ session('success') }}
                </div>
                <button type="button" onclick="closeToast('toast-success')" class="ml-auto -mx-1.5 -my-1.5 rounded-xl p-1.5 inline-flex h-8 w-8 text-slate-400 hover:text-slate-850 hover:bg-slate-100" aria-label="{{ __('Fermer') }}">
                    <span class="sr-only">{{ __('Fermer') }}</span>
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
        @endif

        @yield('content')
    </main>

    <!-- Footer -->
    <footer class="border-t border-slate-200/60 bg-white/20 py-6 text-center text-xs text-slate-500">
        <p>&copy; {{ date('Y') }} {{ __('Maktaba - Plateforme de gestion de bibliothèque intégrée.') }}</p>
    </footer>

    <!-- Global Javascript -->
    <script>
        // Dismiss alert automatically
        setTimeout(() => {
            const toast = document.getElementById('toast-success');
            if (toast) {
                toast.classList.add('opacity-0', 'translate-y-2');
                setTimeout(() => toast.remove(), 500);
            }
        }, 5000);

        function closeToast(id) {
            const toast = document.getElementById(id);
            if (toast) {
                toast.remove();
            }
        }
    </script>
    @yield('scripts')
</body>
</html>
