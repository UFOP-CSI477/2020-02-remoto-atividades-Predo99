@extends('common')

@section('conteudo')

<div class="container-fluid">
    <header class="d-flex justify-content-center">
        <h1>Relatório de manutenções</h1>
    </header>

    <div class="col-md-8">
        <h2>Opções</h2>
        <a class="btn btn-secondary" href="{{ route('relatorios') }}">Voltar</a>
    </div>

    @foreach ($registros as $registro)
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">{{$registro->equipamento->nome}}</h2>
                <p><strong>Total de manutenções:</strong> {{$registro->total}}</p>

                <table class="table table-bordered table-hover table-striped">
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
                
                        @foreach($registro->equipamento->registros as $manutencao)
                            <tr>
                                <td>{{ $manutencao->datalimite }}</td>
                                <td>{{ $manutencao->user->name }}</td>
                                <td>{{ $manutencao->equipamento->nome }}</td>
                                <td>{{ $manutencao->tipo }}</td>
                                <td>{{ $manutencao->descricao }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    @endforeach
</div>

@endsection