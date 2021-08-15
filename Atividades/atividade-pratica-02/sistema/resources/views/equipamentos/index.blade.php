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
</div>

@endsection