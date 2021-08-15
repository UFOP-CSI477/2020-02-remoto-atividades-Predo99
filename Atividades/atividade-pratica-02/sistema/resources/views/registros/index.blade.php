@extends('common')

@section('conteudo')

<div class="container-fluid">
    <header class="d-flex justify-content-center">
        <h1>Área de Suporte</h1>
    </header>

    <div class="col-md-8">
        <h2>Opções</h2>
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
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>

@endsection