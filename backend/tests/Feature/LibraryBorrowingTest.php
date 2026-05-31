<?php

namespace Tests\Feature;

use App\Models\Livre;
use App\Models\Membre;
use App\Models\Emprunt;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LibraryBorrowingTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Seed initial data for testing
        $this->livre = Livre::create([
            'titre' => "Test Book",
            'isbn' => "1234567890",
            'nombre_exemplaires' => 3,
            'statut' => 'disponible'
        ]);

        $this->membre = Membre::create([
            'nom_complet' => "Test Member",
            'email' => "test@example.com",
            'telephone' => "0600000000"
        ]);
    }

    /**
     * Test web tracking index lists borrowings.
     */
    public function test_web_index_loads_successfully()
    {
        $response = $this->get('/emprunts');
        $response->assertStatus(200);
        $response->assertViewIs('listeEmprunts');
    }

    /**
     * Test web creation page loads correctly.
     */
    public function test_web_create_page_loads_successfully()
    {
        $response = $this->get(route('emprunts.create'));
        $response->assertStatus(200);
        $response->assertViewIs('ajouterEmprunt');
        $response->assertViewHas('livres');
        $response->assertViewHas('membres');
    }

    /**
     * Test web store action decrements copies and saves borrowing.
     */
    public function test_web_store_action_decrements_copies_and_saves()
    {
        $payload = [
            'livre_id' => $this->livre->id,
            'membre_id' => $this->membre->id,
            'date_emprunt' => date('Y-m-d'),
            'date_retour_prevue' => date('Y-m-d', strtotime('+14 days'))
        ];

        $response = $this->post(route('emprunts.store'), $payload);

        $response->assertRedirect(route('emprunts.index'));
        $response->assertSessionHas('success');

        // Check if copy was decremented
        $this->livre->refresh();
        $this->assertEquals(2, $this->livre->nombre_exemplaires);

        // Check if borrowing was saved in database
        $this->assertDatabaseHas('emprunts', [
            'livre_id' => $this->livre->id,
            'membre_id' => $this->membre->id,
            'statut' => 'en cours'
        ]);
    }

    /**
     * Test API books list endpoint.
     */
    public function test_api_books_list_endpoint()
    {
        $response = $this->getJson('/api/livres');
        $response->assertStatus(200);
        $response->assertJsonFragment([
            'titre' => 'Test Book',
            'isbn' => '1234567890'
        ]);
    }

    /**
     * Test API borrowings list endpoint.
     */
    public function test_api_borrowings_list_endpoint()
    {
        $response = $this->getJson('/api/emprunts');
        $response->assertStatus(200);
    }

    /**
     * Test API store action decrements copies and returns 201.
     */
    public function test_api_store_action_decrements_copies_and_returns_201()
    {
        $payload = [
            'livre_id' => $this->livre->id,
            'membre_id' => $this->membre->id,
            'date_emprunt' => date('Y-m-d'),
            'date_retour_prevue' => date('Y-m-d', strtotime('+14 days'))
        ];

        $response = $this->postJson('/api/emprunts', $payload);

        $response->assertStatus(201);
        $response->assertJsonPath('data.statut', 'en cours');

        // Check if copy was decremented
        $this->livre->refresh();
        $this->assertEquals(2, $this->livre->nombre_exemplaires);
    }
}
