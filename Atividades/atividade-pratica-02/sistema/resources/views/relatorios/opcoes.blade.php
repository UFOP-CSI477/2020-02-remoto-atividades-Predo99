@extends('common')

@section('conteudo')
    <div class="container-fluid">
        <header class="d-flex justify-content-center">
            <h1>Relatórios</h1>
        </header>

        <div class="row justify-content-center">
            <div class="col-md-8">
                <h2>Opções</h2>
                <a class="btn btn-secondary" href="{{ route('principal') }}">Voltar</a>
            </div>

            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title">Relatório de usuários</h2>
                        <a href="{{route('relatorios.usuarios')}}">Exibir</a> 
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title">Relatórios de manutenções</h2>
                        <a href="{{route('relatorios.manutencoes')}}">Exibir</a> 
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection