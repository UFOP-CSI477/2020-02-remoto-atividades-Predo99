@extends('principal')

@section('conteudo')

<form action="{{ route('produtos.update', $produto->id)}}" method="post">

    @csrf
    @method('PUT')

    <div class="form-group">
        <label for="nome">Nome</label>
        <input type="text" class="form-control" name="nome" id="nome" value="{{$produto->nome}}">
        @error('nome') <b style="color:red">{{$message}}</b> @enderror
    </div>

    <div class="form-group">
        <label for="um">Unidade de medida</label>
        <input type="text" class="form-control" name="um" id="um" value="{{$produto->um}}">
        @error('um') <b style="color:red">{{$message}}</b> @enderror
    </div>

    <div class="text-right">
        <input type="submit" value="Atualizar" class="btn btn-primary">
        <input type="reset" value="Limpar" class="btn btn-danger">
    </div>

</form>

@endsection