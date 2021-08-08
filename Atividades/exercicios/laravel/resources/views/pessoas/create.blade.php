@extends('principal')

@section('conteudo')


    <form action="{{ route('pessoas.store') }}" method="post">

        @csrf

        <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" class="form-control" name="nome" id="nome">
        </div>

        <div class="form-group">
            <label for="cidade_id">Cidade</label>

            <select name="cidade_id" id="cidade_id" class="form-control">

            @foreach($cidades as $cidade)
                <option value="{{$cidade->id}}">{{$cidade->nome}}</option>
            @endforeach

            </select>

        </div>

        <div class="text-right">
            <input type="submit" value="Cadastrar" class="btn btn-primary">
            <input type="reset" value="Limpar" class="btn btn-danger">
        </div>

    </form>

    <a href="{{ route('pessoas.index') }}">Voltar</a>

@endsection('conteudo')