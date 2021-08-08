<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use App\Models\Pessoa;
use App\Models\Produto;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\VarDumper\Cloner\Data;

class CompraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $compras = Compra::orderBy('data')->get();
        return view('compras.index', [ 'compras' => $compras ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $pessoas = Pessoa::orderBy('nome')->get();
        $produtos = Produto::orderBy('nome')->get();
        return view('compras.create', ['pessoas' => $pessoas, 'produtos' => $produtos]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        $data = Carbon::now()->toDateString();
        $request->request->add(['data' => date('d-m-Y', strtotime($data))]);

        $data = request()->validate([
            'pessoa_id' => 'required',
            'produto_id' => 'required',
            'data' => 'required'
        ]);

        Compra::create($data);

        session()->flash('mensagem', 'Compra inserida com sucesso!');
        return redirect()->route('compras.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Compra  $compra
     * @return \Illuminate\Http\Response
     */
    public function show(Compra $compra)
    {
        return view('compras.show', ['compra' => $compra]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Compra  $compra
     * @return \Illuminate\Http\Response
     */
    public function edit(Compra $compra)
    {
        $pessoas = Pessoa::orderBy('nome')->get();
        $produtos = Produto::orderBy('nome')->get();
        return view('compras.edit', ['compra' => $compra, 'pessoas' => $pessoas, 'produtos' => $produtos]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Compra  $compra
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Compra $compra)
    {
        $compra->fill($request->all());
        $compra->save();

        session()->flash('mensagem', 'Compra atualizada com sucesso!');
        return redirect()->route('compras.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Compra  $compra
     * @return \Illuminate\Http\Response
     */
    public function destroy(Compra $compra)
    {
        $compra->delete();
        session()->flash('mensagem', 'Compra excluída com sucesso!');
        return redirect()->route('compras.index');
    }

    public function relatoriopessoas()
    {   
        //https://stackoverflow.com/questions/18533080/laravel-eloquent-groupby-and-also-return-count-of-each-group
        $compras = Compra::groupBy('pessoa_id')->select('pessoa_id', DB::raw('count(*) as total'))->orderBy('total', 'desc')->get();
        return view('compras.relatorio', ['compras' => $compras, 'tipo' => 'Pessoa']);
    }

    public function relatorioprodutos()
    {   
        //https://stackoverflow.com/questions/18533080/laravel-eloquent-groupby-and-also-return-count-of-each-group
        $compras = Compra::groupBy('produto_id')->select('produto_id', DB::raw('count(*) as total'))->orderBy('total', 'desc')->get();
        return view('compras.relatorio', ['compras' => $compras, 'tipo' => 'Produto']);
    }

    public function relatoriodatas()
    {   
        //https://stackoverflow.com/questions/18533080/laravel-eloquent-groupby-and-also-return-count-of-each-group
        $compras = Compra::groupBy('data')->select('data', DB::raw('count(*) as total'))->orderBy('total', 'desc')->get();
        return view('compras.relatorio', ['compras' => $compras, 'tipo' => 'Data']);
    }
}
