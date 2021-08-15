<?php

namespace App\Http\Controllers;

use App\Models\Equipamento;
use App\Models\Registro;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegistroController extends Controller
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
        $registros = Registro::orderBy('datalimite')->get();

        return view('registros.index', [ 'registros' => $registros ]);
    }

    public function indexAdmin()
    {
        $registros = Registro::orderBy('datalimite')->get();

        return view('registros.admin', [ 'registros' => $registros ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $equipamentos = Equipamento::orderBy('nome')->get();
        $users = User::orderBy('name')->get();

        return view('registros.create', [ 'equipamentos' => $equipamentos, 'users' => $users]);
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
            'datalimite' => 'required',
            'descricao' => 'required|max:191',
            'tipo' => 'required',
            'equipamento_id' => 'required',
            'user_id' => 'required',
        ],[
            'required' => 'O campo :attribute é obrigatório',
            'max' => 'O campo :attribute não pode ter mais que :max símbolos'
        ]);

        Registro::create($data);

        return redirect()->route('registros.admin')->with('mensagem', 'Manutenção cadastrada com sucesso!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Registro  $registro
     * @return \Illuminate\Http\Response
     */
    public function show(Registro $registro)
    {
        return view('registros.show', ['registro' => $registro]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Registro  $registro
     * @return \Illuminate\Http\Response
     */
    public function edit(Registro $registro)
    {
        $equipamentos = Equipamento::orderBy('nome')->get();
        $users = User::orderBy('name')->get();

        return view('registros.edit', ['registro' => $registro, 'equipamentos' => $equipamentos, 'users' => $users]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Registro  $registro
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Registro $registro)
    {
        $data = request()->validate([
            'datalimite' => 'required',
            'descricao' => 'required|string|max:191',
            'tipo' => 'required|integer',
            'equipamento_id' => 'required',
            'user_id' => 'required',
        ],[
            'required' => 'O campo :attribute é obrigatório',
            'max' => 'O campo :attribute não pode ter mais que :max símbolos'
        ]);

        $registro->update($data);

        return redirect()->route('registros.admin')->with('mensagem', 'Manutenção atualizada com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Registro  $registro
     * @return \Illuminate\Http\Response
     */
    public function destroy(Registro $registro)
    {
        $registro->delete();
        session()->flash('mensagem', 'Manutenção excluída com sucesso!');

        return redirect()->route('registros.admin');
    }
}
