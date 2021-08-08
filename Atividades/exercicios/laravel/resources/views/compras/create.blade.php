@extends('principal')

@section('conteudo')


    <form action="{{ route('compras.store') }}" method="post">

        @csrf

        <div class="form-group">
            <label for="pessoa_id">Compra</label>

            <select name="pessoa_id" id="pessoa_id" class="form-control">

            @foreach($pessoas as $pessoa)
                <option value="{{$pessoa->id}}">{{$pessoa->nome}}</option>
            @endforeach

            </select>

        </div>

        <div class="form-group">
            <label for="produto_id">Produto</label>

            <select name="produto_id" id="produto_id" class="form-control">

            @foreach($produtos as $produto)
                <option value="{{$produto->id}}">{{$produto->nome}}</option>
            @endforeach

            </select>

        </div>

        <div class="text-right">
            <input type="submit" value="Cadastrar" class="btn btn-primary">
            <input type="reset" value="Limpar" class="btn btn-danger">
        </div>

    </form>

    <a href="{{ route('compras.index') }}">Voltar</a>

@endsection('conteudo')