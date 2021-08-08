@extends('principal')

@section('conteudo')


    <form action="{{ route('pessoas.update', $pessoa->id) }}" method="post">

        @csrf
        @method('put')

        <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" class="form-control" name="nome" id="nome" value="{{ $pessoa->nome }}">
        </div>

        <div class="form-group">
            <label for="cidade_id">Cidade</label>

            <select name="cidade_id" id="cidade_id" class="form-control">

            @foreach($cidades as $cidade)
                <option value="{{$cidade->id}}"

                @if($pessoa->cidade_id == $cidade->id)
                    selected
                @endif

                >{{$cidade->nome}}</option>
            @endforeach

            </select>

        </div>

        <div class="text-right">
            <input type="submit" value="Atualizar" class="btn btn-primary">
            <input type="reset" value="Limpar" class="btn btn-danger">
        </div>

    </form>

    <a href="{{ route('pessoas.index') }}">Voltar</a>

@endsection('conteudo')