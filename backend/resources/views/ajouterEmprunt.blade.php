@extends('layouts.app')

@section('title', __('Maktaba - Ajouter un Emprunt'))

@section('content')
<div class="max-w-3xl mx-auto space-y-8">

    <!-- Header Section -->
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">
                {{ __('Nouvel Emprunt') }}
            </h1>
            <p class="mt-2 text-sm text-slate-500">
                {{ __('Enregistrez une nouvelle sortie de livre de la bibliothèque.') }}
            </p>
        </div>
        <a href="{{ route('emprunts.index') }}" 
           class="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition duration-300">
            <!-- Left Arrow SVG -->
            <svg class="mr-2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {{ __('Retour') }}
        </a>
    </div>

    <!-- Form Panel -->
    <div class="glass-panel rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 bg-white/70">
        <form action="{{ route('emprunts.store') }}" method="POST" class="space-y-6">
            @csrf

            <!-- Selection: Livre -->
            <div>
                <label for="livre_id" class="block text-sm font-bold text-slate-700 mb-2">
                    {{ __('Livre à emprunter') }}
                </label>
                <div class="relative">
                    <select id="livre_id" name="livre_id" required 
                            class="block w-full rounded-xl bg-white border @error('livre_id') border-rose-400 @else border-slate-200 @enderror text-slate-800 py-3.5 px-4 pr-10 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition duration-200 appearance-none cursor-pointer">
                        <option value="" disabled {{ old('livre_id') ? '' : 'selected' }}>{{ __('Sélectionnez un livre...') }}</option>
                        @foreach($livres as $livre)
                            <option value="{{ $livre->id }}" {{ old('livre_id') == $livre->id ? 'selected' : '' }}>
                                {{ $livre->titre }} — (ISBN: {{ $livre->isbn }}) [{{ $livre->nombre_exemplaires }} {{ __('restants') }}]
                            </option>
                        @endforeach
                    </select>
                    <!-- Custom Select Arrow -->
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                @error('livre_id')
                    <p class="mt-1.5 text-xs text-rose-500 font-semibold flex items-center">
                        <span class="w-1.5 h-1.5 bg-rose-500 rounded-full mr-1.5"></span>
                        {{ $message }}
                    </p>
                @enderror
            </div>

            <!-- Selection: Membre -->
            <div>
                <label for="membre_id" class="block text-sm font-bold text-slate-700 mb-2">
                    {{ __('Membre emprunteur') }}
                </label>
                <div class="relative">
                    <select id="membre_id" name="membre_id" required 
                            class="block w-full rounded-xl bg-white border @error('membre_id') border-rose-400 @else border-slate-200 @enderror text-slate-800 py-3.5 px-4 pr-10 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition duration-200 appearance-none cursor-pointer">
                        <option value="" disabled {{ old('membre_id') ? '' : 'selected' }}>{{ __('Sélectionnez un membre...') }}</option>
                        @foreach($membres as $membre)
                            <option value="{{ $membre->id }}" {{ old('membre_id') == $membre->id ? 'selected' : '' }}>
                                {{ $membre->nom_complet }} — (Email: {{ $membre->email }})
                            </option>
                        @endforeach
                    </select>
                    <!-- Custom Select Arrow -->
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                @error('membre_id')
                    <p class="mt-1.5 text-xs text-rose-500 font-semibold flex items-center">
                        <span class="w-1.5 h-1.5 bg-rose-500 rounded-full mr-1.5"></span>
                        {{ $message }}
                    </p>
                @enderror
            </div>

            <!-- Date Fields Group -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Date Emprunt -->
                <div>
                    <label for="date_emprunt" class="block text-sm font-bold text-slate-700 mb-2">
                        {{ __("Date d'emprunt") }}
                    </label>
                    <input type="date" id="date_emprunt" name="date_emprunt" required 
                           value="{{ old('date_emprunt', date('Y-m-d')) }}"
                           class="block w-full rounded-xl bg-white border @error('date_emprunt') border-rose-400 @else border-slate-200 @enderror text-slate-800 py-3.5 px-4 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition duration-200">
                    @error('date_emprunt')
                        <p class="mt-1.5 text-xs text-rose-500 font-semibold flex items-center">
                            <span class="w-1.5 h-1.5 bg-rose-500 rounded-full mr-1.5"></span>
                            {{ $message }}
                        </p>
                    @enderror
                </div>

                <!-- Date Retour Prévue -->
                <div>
                    <label for="date_retour_prevue" class="block text-sm font-bold text-slate-700 mb-2">
                        {{ __('Date de retour prévue') }}
                    </label>
                    <input type="date" id="date_retour_prevue" name="date_retour_prevue" required 
                           value="{{ old('date_retour_prevue', date('Y-m-d', strtotime('+14 days'))) }}"
                           class="block w-full rounded-xl bg-white border @error('date_retour_prevue') border-rose-400 @else border-slate-200 @enderror text-slate-800 py-3.5 px-4 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition duration-200">
                    @error('date_retour_prevue')
                        <p class="mt-1.5 text-xs text-rose-500 font-semibold flex items-center">
                            <span class="w-1.5 h-1.5 bg-rose-500 rounded-full mr-1.5"></span>
                            {{ $message }}
                        </p>
                    @enderror
                </div>
            </div>

            <!-- Submit Button Section -->
            <div class="pt-4 border-t border-slate-100 flex justify-end">
                <button type="submit" 
                        class="w-full md:w-auto px-6 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-550 shadow-md shadow-blue-500/20 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 cursor-pointer">
                    {{ __("Enregistrer l'emprunt") }}
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
