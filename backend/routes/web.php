<?php

use App\Http\Controllers\EmpruntWebController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('emprunts.index');
});

Route::get('/emprunts', [EmpruntWebController::class, 'index'])->name('emprunts.index');
Route::get('/emprunts/creer', [EmpruntWebController::class, 'create'])->name('emprunts.create');
Route::post('/emprunts', [EmpruntWebController::class, 'store'])->name('emprunts.store');

Route::get('/lang/{locale}', function ($locale) {
    if (in_array($locale, ['en', 'fr'])) {
        session(['locale' => $locale]);
    }
    return redirect()->back();
})->name('locale.change');
