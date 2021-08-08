@extends('principal')

@section('conteudo')

    <h1>Dados da Compra</h1>

    <p>Id: {{ $compra->id }}</p>
    <p>Data: {{ $compra->data }}</p>
    <p>Pessoa: {{ $compra->pessoa->nome }}</p>
    <p>Produto: {{ $compra->produto->nome }}</p>

    <a href="{{route('compras.edit', $compra->id)}}">Editar</a>
    <a href="{{ route('compras.index') }}">Voltar</a>

    <form name="frmDelete"
        action="{{route('compras.destroy', $compra->id)}}"
        method="post"
        onsubmit="return confirm('Confirma exclusão da compra?');">

        @csrf
        @method('DELETE')

        <input type="submit" value="Excluir">

    </form>
@endsection