@extends('principal')

@section('conteudo')

    <div class="alert alert-primary text-center">
        <a href="{{route('compras.create')}}">Cadastrar</a>
    </div>

    <ul class="nav">
        <li class="nav-item"><a class="nav-link" href="{{route('compras.relatoriopessoas')}}">Relatório pessoas</a></li>
        <li class="nav-item"><a class="nav-link" href="{{route('compras.relatorioprodutos')}}">Relatório produtos</a></li>
        <li class="nav-item"><a class="nav-link" href={{route('compras.relatoriodatas')}}>Relatório datas</a></li>
    </ul>

    <table class="table table-bordered table-hover table-striped">
        <thead class="thead-dark">
            <tr>
                <th>Id</th>
                <th>Pessoa</th>
                <th>Produto</th>
                <th>Data</th>
                <th>Exibir</th>
            </tr>
        </thead>
        <tbody>
            @foreach($compras as $compra)
                <tr>
                    <td>{{ $compra->id }}</td>
                    <td>{{ $compra->pessoa->nome }}</td>
                    <td>{{ $compra->produto->nome }}</td>
                    <td>{{ $compra->data }}</td>
                    <td><a href="{{ route('compras.show', $compra->id)}}">Exibir</a></td>
                </tr>
            @endforeach
        </tbody>
    </table>

@endsection('conteudo')