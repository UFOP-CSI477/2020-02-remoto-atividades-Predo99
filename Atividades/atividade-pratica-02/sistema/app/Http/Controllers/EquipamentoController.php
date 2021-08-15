<?php

namespace App\Http\Controllers;

use App\Models\Equipamento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EquipamentoController extends Controller
{
    public function __construct() {
        $this->middleware('auth', ['except' => ['index']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $equipamentos = Equipamento::orderBy('nome')->get();

        return view('equipamentos.index', [ 'equipamentos' => $equipamentos ]);
    }

    public function indexAdmin()
    {
        $equipamentos = Equipamento::orderBy('nome')->get();

        return view('equipamentos.admin', [ 'equipamentos' => $equipamentos ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('equipamentos.create');
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
            'nome' => 'required|string|max:50',
        ],[
            'required' => 'O campo :attribute é obrigatório',
            'max' => 'O campo :attribute não pode ter mais que :max símbolos'
        ]);

        Equipamento::create($data);

        return redirect()->route('equipamentos.admin')->with('mensagem', 'Equipamento cadastrado com sucesso!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Equipamento  $equipamento
     * @return \Illuminate\Http\Response
     */
    public function show(Equipamento $equipamento)
    {
        return view('equipamentos.show', ['equipamento' => $equipamento]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Equipamento  $equipamento
     * @return \Illuminate\Http\Response
     */
    public function edit(Equipamento $equipamento)
    {
        return view('equipamentos.edit', ['equipamento' => $equipamento]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Equipamento  $equipamento
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Equipamento $equipamento)
    {
        $data = request()->validate([
            'nome' => 'required|string|max:50',
        ],[
            'required' => 'O campo :attribute é obrigatório',
            'max' => 'O campo :attribute não pode ter mais que :max símbolos'
        ]);

        $equipamento->update($data);

        return redirect()->route('equipamentos.admin')->with('mensagem', 'Equipamento atualizado com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Equipamento  $equipamento
     * @return \Illuminate\Http\Response
     */
    public function destroy(Equipamento $equipamento)
    {
        if ( $equipamento->registros->count() > 0 ) {
            session()->flash('mensagem', 'Exclusão não permitida! Existem manutenções associadas.');
        } else {
            $equipamento->delete();
            session()->flash('mensagem', 'Equipamento excluído com sucesso!');
        }

        return redirect()->route('equipamentos.admin');
    }
}
