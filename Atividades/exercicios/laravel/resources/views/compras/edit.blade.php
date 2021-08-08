@extends('principal')

@section('conteudo')

    <form action="{{ route('compras.update', $compra->id) }}" method="post">

    @csrf
    @method('put')

        <div class="form-group">
            <label for="pessoa_id">Pessoa</label>

            <select name="pessoa_id" id="pessoa_id" class="form-control">

                @foreach($pessoas as $pessoa)
                    <option value="{{$pessoa->id}}"

                    @if($compra->pessoa_id == $pessoa->id)
                        selected
                    @endif

                    >{{$pessoa->nome}}</option>
                @endforeach

            </select>

        </div>

        <div class="form-group">
            <label for="produto_id">Produto</label>

            <select name="produto_id" id="produto_id" class="form-control">

                @foreach($produtos as $produto)
                    <option value="{{$produto->id}}"

                    @if($compra->produto_id == $produto->id)
                        selected
                    @endif

                    >{{$produto->nome}}</option>
                @endforeach

            </select>

        </div>

        <div class="text-right">
            <input type="submit" value="Atualizar" class="btn btn-primary">
            <input type="reset" value="Limpar" class="btn btn-danger">
        </div>

    </form>

    <a href="{{ route('compras.index') }}">Voltar</a>

@endsection('conteudo')