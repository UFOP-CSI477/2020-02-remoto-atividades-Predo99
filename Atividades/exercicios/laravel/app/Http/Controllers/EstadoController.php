<?php

namespace App\Http\Controllers;

use App\Models\Estado;
use Illuminate\Http\Request;

class EstadoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $estados = Estado::orderBy('nome')->get();

        return view('estados.index', ['estados' => $estados]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('estados.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = request()->validate([
            'nome' => 'required',
            'sigla' => 'required|size:2'
        ],[
            'required' => 'O campo :attribute é obrigatório',
            'size' => 'A sigla precisa ter exatamente :size símbolos'
        ]);

        Estado::create($data);

        return redirect()->route('estados.index')->with('mensagem', 'Estado cadastrado com sucesso!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Estado  $estado
     * @return \Illuminate\Http\Response
     */
    public function show(Estado $estado)
    {
        // $estado = Estado::findOrFail($estado);

        // if($estado == null){
        //     return 'ID inválido';
        // }

        
        return view('estados.show', ['estado' => $estado]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Estado  $estado
     * @return \Illuminate\Http\Response
     */
    public function edit(Estado $estado)
    {
        return view('estados.edit', ['estado' => $estado]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Estado  $estado
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Estado $estado)
    {
        $data = request()->validate([
            'nome' => 'string',
            'sigla' => 'size:2'
        ],[
            'size' => 'A sigla precisa ter exatamente :size símbolos'
        ]);

        $estado->update($data);

        return redirect()->route('estados.index')->with('mensagem', 'Estado atualizado com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Estado  $estado
     * @return \Illuminate\Http\Response
     */
    public function destroy(Estado $estado)
    {
        if ( $estado->cidades->count() > 0 ) {
            session()->flash('mensagem', 'Exclusão não permitida! Existem cidades associadas.');
        } else {
            $estado->delete();
            session()->flash('mensagem', 'Estado excluído com sucesso!');
        }

        return redirect()->route('estados.index');
    }
}
