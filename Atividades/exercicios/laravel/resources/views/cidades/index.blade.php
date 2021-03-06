@extends('principal')

@section('conteudo')

    <div class="alert alert-primary text-center">
        <a href="{{route('cidades.create')}}">Cadastrar</a>
    </div>

    <table class="table table-bordered table-hover table-striped">
        <thead class="thead-dark">
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Estado</th>
                <th>Exibir</th>
            </tr>
        </thead>
        <tbody>
            @foreach($cidades as $cidade)
                <tr>
                    <td>{{ $cidade->id }}</td>
                    <td>{{ $cidade->nome }}</td>
                    <td>{{ $cidade->estado->nome }}-{{ $cidade->estado->sigla }}</td>
                    <td><a href="{{ route('cidades.show', $cidade->id)}}">Exibir</a></td>
                </tr>
            @endforeach
        </tbody>
    </table>

@endsection('conteudo')