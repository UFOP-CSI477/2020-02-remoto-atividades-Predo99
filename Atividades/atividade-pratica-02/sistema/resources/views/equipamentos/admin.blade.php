@extends('common')

@section('conteudo')

<div class="container-fluid">
    <header class="d-flex justify-content-center">
        <h1>Área Administrativa</h1>
    </header>

    <div>
        <h2>Opções</h2>
        <a class="btn btn-primary" href="{{route('equipamentos.create')}}">Cadastrar</a> 
        <a class="btn btn-secondary" href="{{ route('principal') }}">Voltar</a>
    </div>
    
    <div>
        <table class="table caption-top table-bordered table-hover table-striped">
            <caption>Equipamentos</caption>
            <thead class="thead-dark">
                <tr>
                    <th>Nome</th>
                    <th>Exibir</th>
                </tr>
            </thead>
            <tbody>
        
                @foreach($equipamentos as $equipamento)
                    <tr>
                        <td>{{ $equipamento->nome }}</td>
                        <td><a href="{{ route('equipamentos.show', $equipamento->id)}}">Exibir</a></td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>

@endsection