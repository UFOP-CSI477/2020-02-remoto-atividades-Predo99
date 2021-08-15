<?php

use App\Http\Controllers\EquipamentoController;
use App\Http\Controllers\RegistroController;
use App\Http\Controllers\RelatorioController;
use App\Models\Equipamento;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('principal');
})->name('principal');

// Route::resource('/users', UserCon::class);
Route::get('/equipamentos/admin', [EquipamentoController::class, 'indexAdmin'])->name('equipamentos.admin');
Route::resource('/equipamentos', EquipamentoController::class);

Route::get('/registros/admin', [RegistroController::class, 'indexAdmin'])->name('registros.admin');
Route::resource('/registros', RegistroController::class);

Route::get('/relatorios/opcoes', [RelatorioController::class, 'relatorios'])->name('relatorios')->middleware('auth');
Route::get('/relatorios/usuarios', [RelatorioController::class, 'relatorioUsuarios'])->name('relatorios.usuarios')->middleware('auth');
Route::get('/relatorios/manutencoes', [RelatorioController::class, 'relatorioManutencoes'])->name('relatorios.manutencoes')->middleware('auth');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
