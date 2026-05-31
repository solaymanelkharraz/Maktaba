<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Membre extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_complet', 
        'email', 
        'telephone'
    ];

    public function emprunts()
    {
        return $this->hasMany(Emprunt::class);
    }
}