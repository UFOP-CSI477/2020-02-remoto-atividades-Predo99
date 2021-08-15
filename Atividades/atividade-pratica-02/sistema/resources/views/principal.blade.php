@extends('common')

@section('conteudo')
    <header class="d-flex justify-content-center">
        <h1>Sistema de Manutenção de Equipamentos</h1>
    </header>

    <div class="conteiner">
        <h2>Áreas disponíveis:</h2>
        <div class="card">
            <div class="card-body">
                <h3 class="card-title">Área geral - Suporte</h3>
                <ul>
                    <li class="nav-item"><a class="nav-link" href={{route('equipamentos.index')}}>Lista de equipamentos</a></li>
                    <li class="nav-item"><a class="nav-link" href={{route('registros.index')}}>Lista de manutenções</a></li>
                </ul>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <h3 class="card-title">Área administrativa</h3>
                <ul>
                    <li class="nav-item"><a class="nav-link" href={{route('equipamentos.admin')}}>Gerenciar equipamentos</a></li>
                    <li class="nav-item"><a class="nav-link" href={{route('registros.admin')}}>Gerenciar manutenções</a></li>
                    <li class="nav-item"><a class="nav-link" href={{route('relatorios')}}>Relatórios</a></li>
                </ul>
            </div>
        </div>
        
    </div>
@endsection

