<?php

namespace App\Http\Controllers;

use App\Models\Equipamento;
use App\Models\Registro;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RelatorioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function relatorios()
    {
        return view('relatorios.opcoes');
    }

    public function relatorioUsuarios()
    {
        $users = User::orderBy('name')->get();
        return view('relatorios.usuarios', ['users' => $users]);
    }

    public function relatorioManutencoes(){
        //https://stackoverflow.com/questions/18533080/laravel-eloquent-groupby-and-also-return-count-of-each-group
        $registros = Registro::groupBy('equipamento_id')->select('equipamento_id', DB::raw('count(*) as total'))->orderBy('total', 'desc')->get();
        return view('relatorios.manutencoes', ['registros' => $registros]);
    }
}
