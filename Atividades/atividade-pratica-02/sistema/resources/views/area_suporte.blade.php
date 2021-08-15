@extends('common')

@section('conteudo')

<header class="d-flex justify-content-center">
    <h1>Área de Suporte</h1>
</header>

<div>
    <table class="table table-bordered table-hover table-striped">
        <caption>Equipamentos</caption>
        <thead class="thead-dark">
            <tr>
                <th>Nome</th>
            </tr>
        </thead>
        <tbody>
    
            @foreach($equipamentos as $equipamento)
                <tr>
                    <td>{{ $equipamento->nome }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>

<div>
    <table class="table table-bordered table-hover table-striped">
        <caption>Manutenções</caption>
        <thead class="thead-dark">
            <tr>
                <th>Data limite</th>
                <th>Nome do equipamento</th>
                <th>Nome do usuário</th>
                <th>Tipo de manutenção</th>
                <th>Descrição da manutenção</th>
            </tr>
        </thead>
        <tbody>
    
            @foreach($registros as $registro)
                <tr>
                    <td>{{ $registro->datalimite }}</td>
                    <td>{{ $registro->user->name }}</td>
                    <td>{{ $registro->equipamento->nome }}</td>
                    <td>{{ $registro->tyipo }}</td>
                    <td>{{ $registro->descricao }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>

@endsection