<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up(): void
{
    Schema::create('emprunts', function (Blueprint $table) {
        $table->id();
        // Foreign Keys
        $table->foreignId('livre_id')->constrained('livres')->onDelete('cascade');
        $table->foreignId('membre_id')->constrained('membres')->onDelete('cascade');
        
        $table->date('date_emprunt');
        $table->date('date_retour_prevue');
        $table->string('statut')->default('En cours'); // 'En cours', 'Retourné', 'En retard'
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emprunts');
    }
};
