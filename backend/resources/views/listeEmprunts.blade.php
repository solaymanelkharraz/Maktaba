@extends('layouts.app')

@section('title', __('Maktaba - Liste des Emprunts'))

@section('content')
<div class="space-y-8">

    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">
                {{ __('Suivi des Emprunts') }}
            </h1>
            <p class="mt-2 text-sm text-slate-500">
                {{ __("Visualisez et gérez l'ensemble des livres empruntés par les membres de la bibliothèque.") }}
            </p>
        </div>
        <div>
            <a href="{{ route('emprunts.create') }}" 
               class="inline-flex items-center px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-550 shadow-md shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-300">
                <!-- Plus Icon SVG -->
                <svg class="-ml-1 mr-2 h-5 w-5 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                {{ __('Nouvel Emprunt') }}
            </a>
        </div>
    </div>

    <!-- Table Section -->
    <div class="glass-panel rounded-2xl shadow-sm overflow-hidden border border-slate-200/80">
        @if($emprunts->isEmpty())
            <!-- Clean Empty State -->
            <div class="text-center py-20 px-6 bg-white/40">
                <div class="inline-flex items-center justify-center p-4 bg-slate-100 rounded-full text-slate-400 mb-6 border border-slate-200/60">
                    <svg class="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-slate-800 mb-2">{{ __('Aucun emprunt enregistré') }}</h3>
                <p class="text-slate-500 max-w-sm mx-auto text-sm leading-relaxed">
                    {{ __("Il n'y a aucun historique d'emprunt dans le système pour le moment. Commencez par en ajouter un.") }}
                </p>
                <div class="mt-6">
                    <a href="{{ route('emprunts.create') }}" class="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition duration-300">
                        {{ __('Ajouter le premier emprunt') }}
                    </a>
                </div>
            </div>
        @else
            <!-- Responsive Table Wrapper -->
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-slate-200/60 bg-white/60">
                    <thead>
                        <tr class="bg-slate-100/70">
                            <th scope="col" class="px-6 py-4.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                {{ __('ID') }}
                            </th>
                            <th scope="col" class="px-6 py-4.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                {{ __('Livre / ISBN') }}
                            </th>
                            <th scope="col" class="px-6 py-4.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                {{ __('Membre') }}
                            </th>
                            <th scope="col" class="px-6 py-4.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                {{ __('Date Emprunt') }}
                            </th>
                            <th scope="col" class="px-6 py-4.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                {{ __('Retour Prévu') }}
                            </th>
                            <th scope="col" class="px-6 py-4.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                                {{ __('Statut') }}
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200/40">
                        @foreach($emprunts as $emprunt)
                            <tr class="hover:bg-slate-50/70 transition-colors duration-200">
                                <!-- Borrowing ID -->
                                <td class="px-6 py-4.5 whitespace-nowrap text-sm font-mono text-blue-600 font-bold">
                                    #{{ sprintf('%04d', $emprunt->id) }}
                                </td>
                                <!-- Book Title & ISBN -->
                                <td class="px-6 py-4.5">
                                    <div class="flex flex-col">
                                        <span class="text-sm font-semibold text-slate-900 tracking-wide">
                                            {{ $emprunt->livre->titre ?? __('Livre inconnu') }}
                                        </span>
                                        <span class="text-xs text-slate-400 font-mono mt-0.5">
                                            ISBN: {{ $emprunt->livre->isbn ?? 'N/A' }}
                                        </span>
                                    </div>
                                </td>
                                <!-- Member Info -->
                                <td class="px-6 py-4.5">
                                    <div class="flex flex-col">
                                        <span class="text-sm font-medium text-slate-800">
                                            {{ $emprunt->membre->nom_complet ?? __('Membre inconnu') }}
                                        </span>
                                        <span class="text-xs text-slate-400 mt-0.5">
                                            {{ $emprunt->membre->email ?? 'N/A' }}
                                        </span>
                                    </div>
                                </td>
                                <!-- Date Emprunt -->
                                <td class="px-6 py-4.5 whitespace-nowrap text-sm text-slate-600 font-medium">
                                    {{ \Carbon\Carbon::parse($emprunt->date_emprunt)->format('d/m/Y') }}
                                </td>
                                <!-- Date Retour Prevue -->
                                <td class="px-6 py-4.5 whitespace-nowrap text-sm font-medium text-slate-600">
                                    <span class="{{ \Carbon\Carbon::parse($emprunt->date_retour_prevue)->isPast() && ($emprunt->statut === 'en cours' || $emprunt->statut === 'en_cours') ? 'text-rose-600 font-bold' : '' }}">
                                        {{ \Carbon\Carbon::parse($emprunt->date_retour_prevue)->format('d/m/Y') }}
                                    </span>
                                </td>
                                <!-- Borrowing Status Badge -->
                                <td class="px-6 py-4.5 whitespace-nowrap text-sm">
                                    @php
                                        $normalizedStatus = strtolower(trim($emprunt->statut));
                                    @endphp
                                    @if($normalizedStatus === 'rendu')
                                        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50 shadow-sm">
                                            <span class="w-1.5 h-1.5 mr-1.5 bg-emerald-500 rounded-full"></span>
                                            {{ __('Rendu') }}
                                        </span>
                                    @elseif($normalizedStatus === 'en retard' || $normalizedStatus === 'en_retard' || (\Carbon\Carbon::parse($emprunt->date_retour_prevue)->isPast() && ($normalizedStatus === 'en cours' || $normalizedStatus === 'en_cours')))
                                        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/50 shadow-sm">
                                            <span class="w-1.5 h-1.5 mr-1.5 bg-rose-500 rounded-full animate-pulse"></span>
                                            {{ __('En Retard') }}
                                        </span>
                                    @else
                                        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/50 shadow-sm">
                                            <span class="w-1.5 h-1.5 mr-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                                            {{ __('En cours') }}
                                        </span>
                                    @endif
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @endif
    </div>
</div>
@endsection
