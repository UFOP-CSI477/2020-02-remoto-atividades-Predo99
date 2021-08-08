@extends('principal')

@section('conteudo')
    
    <div class="alert alert-primary text-center">
        <a href="{{ route('produtos.create') }}">Cadastrar</a>
    </div>

    <table class="table table-bordered table-hover table-striped">
        <thead class="thead-dark">
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Um</th>
                <th>Exibir</th>
            </tr>
        </thead>
        <tbody>

            @foreach($produtos as $produto)
                <tr>
                    <td>{{ $produto->id }}</td>
                    <td>{{ $produto->nome }} </td>
                    <td>{{ $produto->um }}</td>
                    <td><a href="{{route('produtos.show', $produto->id)}}">Exibir</a></td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection