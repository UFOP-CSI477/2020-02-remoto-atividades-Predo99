<?php

use App\Http\Controllers\CidadeController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\EstadoController;
use App\Http\Controllers\PessoaController;
use App\Http\Controllers\ProdutoController;
use App\Models\Produto;
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

// Route::get('/produtos/todos', function() {

//     $produtos = Produto::all();

//     return view('todos', [ 'produtos' => $produtos ]);

// });

// Route::get('/produtos/um/{id}', function($id) {

//     $produto = Produto::findOrFail($id);

//     return view('um', [ 'produto' => $produto ]);

// })->name('produto.um');

Route::resource('/estados', EstadoController::class)->middleware('auth');
Route::resource('/cidades', CidadeController::class)->middleware('auth');
Route::resource('/produtos', ProdutoController::class)->middleware('auth');
Route::resource('/pessoas', PessoaController::class);

Route::get('/compras/pessoas', [CompraController::class, 'relatoriopessoas'])->name('compras.relatoriopessoas')->middleware('auth');
Route::get('/compras/produtos', [CompraController::class, 'relatorioprodutos'])->name('compras.relatorioprodutos')->middleware('auth');
Route::get('/compras/datas', [CompraController::class, 'relatoriodatas'])->name('compras.relatoriodatas')->middleware('auth');
Route::resource('/compras', CompraController::class)->middleware('auth');


Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
