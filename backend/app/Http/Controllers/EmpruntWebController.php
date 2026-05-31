<?php

namespace App\Http\Controllers;

use App\Models\Emprunt;
use App\Models\Livre;
use App\Models\Membre;
use Illuminate\Http\Request;

class EmpruntWebController extends Controller
{
    /**
     * Display a listing of the borrowings.
     */
    public function index()
    {
        $emprunts = Emprunt::with(['livre', 'membre'])
            ->orderBy('created_at', 'desc')
            ->get();

        return view('listeEmprunts', compact('emprunts'));
    }

    /**
     * Show the form for creating a new borrowing.
     */
    public function create()
    {
        // Books that are available for borrowing (nombre_exemplaires > 0 and statut is 'disponible')
        $livres = Livre::where('nombre_exemplaires', '>', 0)
            ->where('statut', 'disponible')
            ->orderBy('titre')
            ->get();

        $membres = Membre::orderBy('nom_complet')->get();

        return view('ajouterEmprunt', compact('livres', 'membres'));
    }

    /**
     * Store a newly created borrowing in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'livre_id' => 'required|exists:livres,id',
            'membre_id' => 'required|exists:membres,id',
            'date_emprunt' => 'required|date',
            'date_retour_prevue' => 'required|date|after_or_equal:date_emprunt',
        ]);

        // Default new borrowing status to 'en cours'
        $validated['statut'] = 'en cours';

        // Check if book is actually available
        $livre = Livre::findOrFail($request->livre_id);
        if ($livre->nombre_exemplaires <= 0 || $livre->statut !== 'disponible') {
            return redirect()->back()
                ->withInput()
                ->withErrors(['livre_id' => 'Ce livre n’est pas disponible pour l’emprunt.']);
        }

        // Create the borrowing record
        Emprunt::create($validated);

        // Decrement available copies
        $livre->decrement('nombre_exemplaires');
        if ($livre->nombre_exemplaires === 0) {
            $livre->update(['statut' => 'indisponible']);
        }

        return redirect()->route('emprunts.index')
            ->with('success', 'L’emprunt a été enregistré avec succès.');
    }
}
