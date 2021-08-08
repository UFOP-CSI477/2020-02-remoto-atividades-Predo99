@extends('principal')

@section('conteudo')

    <div class="alert alert-primary text-center">
        <a href="{{route('pessoas.create')}}">Cadastrar</a>
    </div>

    <table class="table table-bordered table-hover table-striped">
        <thead class="thead-dark">
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Cidade</th>
                <th>Exibir</th>
            </tr>
        </thead>
        <tbody>
            @foreach($pessoas as $pessoa)
                <tr>
                    <td>{{ $pessoa->id }}</td>
                    <td>{{ $pessoa->nome }}</td>
                    <td>{{ $pessoa->cidade->nome }}-{{ $pessoa->cidade->estado->sigla }}</td>
                    <td><a href="{{ route('pessoas.show', $pessoa->id)}}">Exibir</a></td>
                </tr>
            @endforeach
        </tbody>
    </table>

@endsection('conteudo')