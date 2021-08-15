@extends('common')

@section('conteudo')

<div class="container-fluid">
    <header class="d-flex justify-content-center">
        <h1>Área Administrativa</h1>
    </header>
    
    <div>
        <h2>Opções</h2>
        <a class="btn btn-primary" href="{{route('registros.create')}}">Cadastrar</a> 
        <a class="btn btn-secondary" href="{{ route('principal') }}">Voltar</a>
    </div>
    
    <div>
        <table class="table caption-top table-bordered table-hover table-striped">
            <caption>Manutenções</caption>
            <thead class="thead-dark">
                <tr>
                    <th>Data limite</th>
                    <th>Nome do equipamento</th>
                    <th>Nome do usuário</th>
                    <th>Tipo de manutenção</th>
                    <th>Descrição da manutenção</th>
                    <th>Exibir</th>
                </tr>
            </thead>
            <tbody>
        
                @foreach($registros as $registro)
                    <tr>
                        <td>{{ $registro->datalimite }}</td>
                        <td>{{ $registro->equipamento->nome }}</td>
                        <td>{{ $registro->user->name }}</td>
                        <td>{{ $registro->tipo }}</td>
                        <td>{{ $registro->descricao }}</td>
                        <td><a href="{{ route('registros.show', $registro->id)}}">Exibir</a></td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>

@endsection