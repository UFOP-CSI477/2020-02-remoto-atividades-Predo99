@extends('principal')

@section('conteudo')
    
    <div class="alert alert-primary text-center">
        <a href="{{ route('estados.create') }}">Cadastrar</a>
    </div>

    <table class="table table-bordered table-hover table-striped">
        <thead class="thead-dark">
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Sigla</th>
                <th>Exibir</th>
            </tr>
        </thead>
        <tbody>

            @foreach($estados as $estado)
                <tr>
                    <td>{{ $estado->id }}</td>
                    <td>{{ $estado->nome }} </td>
                    <td>{{ $estado->sigla }}</td>
                    <td><a href="{{route('estados.show', $estado->id)}}">Exibir</a></td>
                </tr>
            @endforeach
        </tbody>
    </table>

@endsection