<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Emprunt;
use App\Models\Livre;
use Illuminate\Http\Request;

class LibraryApiController extends Controller
{
    /**
     * Get all books.
     */
    public function getLivres()
    {
        $livres = Livre::orderBy('titre')->get();
        return response()->json($livres, 200);
    }

    /**
     * Get all borrowings with their respective book and member data.
     */
    public function getEmprunts()
    {
        $emprunts = Emprunt::with(['livre', 'membre'])
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json($emprunts, 200);
    }

    /**
     * Store a new borrowing via API request.
     */
    public function storeEmprunt(Request $request)
    {
        $validated = $request->validate([
            'livre_id' => 'required|exists:livres,id',
            'membre_id' => 'required|exists:membres,id',
            'date_emprunt' => 'required|date',
            'date_retour_prevue' => 'required|date|after_or_equal:date_emprunt',
            'statut' => 'sometimes|string|in:en cours,rendu,en retard,en_cours',
        ]);

        // Default status if not specified
        if (!isset($validated['statut'])) {
            $validated['statut'] = 'en cours';
        }

        // Validate book availability
        $livre = Livre::findOrFail($request->livre_id);
        if ($livre->nombre_exemplaires <= 0 || $livre->statut !== 'disponible') {
            return response()->json([
                'message' => 'Ce livre n’est pas disponible pour l’emprunt.'
            ], 422);
        }

        // Save new borrowing record
        $emprunt = Emprunt::create($validated);

        // Update book copy count
        $livre->decrement('nombre_exemplaires');
        if ($livre->nombre_exemplaires === 0) {
            $livre->update(['statut' => 'indisponible']);
        }

        // Load associations to return in response
        $emprunt->load(['livre', 'membre']);

        return response()->json([
            'message' => 'L’emprunt a été enregistré avec succès.',
            'data' => $emprunt
        ], 201);
    }
}
