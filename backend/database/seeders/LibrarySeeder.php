<?php

namespace Database\Seeders;

use App\Models\Livre;
use App\Models\Membre;
use App\Models\Emprunt;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class LibrarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Seed Livres
        $livres = [
            [
                'titre' => 'Le Petit Prince',
                'isbn' => '9780156012195',
                'nombre_exemplaires' => 3,
                'statut' => 'disponible',
            ],
            [
                'titre' => 'L’Étranger',
                'isbn' => '9782070360024',
                'nombre_exemplaires' => 0,
                'statut' => 'indisponible',
            ],
            [
                'titre' => '1984',
                'isbn' => '9782070409242',
                'nombre_exemplaires' => 5,
                'statut' => 'disponible',
            ],
            [
                'titre' => 'Le Seigneur des Anneaux',
                'isbn' => '9782266154116',
                'nombre_exemplaires' => 2,
                'statut' => 'disponible',
            ],
            [
                'titre' => 'Dune',
                'isbn' => '9782266283120',
                'nombre_exemplaires' => 4,
                'statut' => 'disponible',
            ],
            [
                'titre' => 'Les Misérables',
                'isbn' => '9782070408504',
                'nombre_exemplaires' => 1,
                'statut' => 'disponible',
            ],
        ];

        $insertedLivres = [];
        foreach ($livres as $livre) {
            $insertedLivres[] = Livre::create($livre);
        }

        // 2. Seed Membres
        $membres = [
            [
                'nom_complet' => 'Jean Dupont',
                'email' => 'jean.dupont@example.com',
                'telephone' => '0612345678',
            ],
            [
                'nom_complet' => 'Marie Martin',
                'email' => 'marie.martin@example.com',
                'telephone' => '0687654321',
            ],
            [
                'nom_complet' => 'Pierre Leroy',
                'email' => 'pierre.leroy@example.com',
                'telephone' => '0711223344',
            ],
            [
                'nom_complet' => 'Sophie Bernard',
                'email' => 'sophie.bernard@example.com',
                'telephone' => '0755667788',
            ],
            [
                'nom_complet' => 'Thomas Dubois',
                'email' => 'thomas.dubois@example.com',
                'telephone' => '0699001122',
            ],
        ];

        $insertedMembres = [];
        foreach ($membres as $membre) {
            $insertedMembres[] = Membre::create($membre);
        }

        // 3. Seed Emprunts
        $emprunts = [
            [
                'livre_id' => $insertedLivres[0]->id, // Le Petit Prince
                'membre_id' => $insertedMembres[0]->id, // Jean Dupont
                'date_emprunt' => Carbon::now()->subDays(10)->format('Y-m-d'),
                'date_retour_prevue' => Carbon::now()->addDays(4)->format('Y-m-d'),
                'statut' => 'en cours',
            ],
            [
                'livre_id' => $insertedLivres[2]->id, // 1984
                'membre_id' => $insertedMembres[1]->id, // Marie Martin
                'date_emprunt' => Carbon::now()->subDays(20)->format('Y-m-d'),
                'date_retour_prevue' => Carbon::now()->subDays(6)->format('Y-m-d'),
                'statut' => 'en retard',
            ],
            [
                'livre_id' => $insertedLivres[3]->id, // Le Seigneur des Anneaux
                'membre_id' => $insertedMembres[2]->id, // Pierre Leroy
                'date_emprunt' => Carbon::now()->subDays(15)->format('Y-m-d'),
                'date_retour_prevue' => Carbon::now()->subDays(1)->format('Y-m-d'),
                'statut' => 'rendu',
            ],
            [
                'livre_id' => $insertedLivres[4]->id, // Dune
                'membre_id' => $insertedMembres[3]->id, // Sophie Bernard
                'date_emprunt' => Carbon::now()->subDays(3)->format('Y-m-d'),
                'date_retour_prevue' => Carbon::now()->addDays(11)->format('Y-m-d'),
                'statut' => 'en cours',
            ],
        ];

        foreach ($emprunts as $emprunt) {
            Emprunt::create($emprunt);
        }
    }
}
