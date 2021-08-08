@extends('principal')

@section('conteudo')
    
<form action="{{ route('produtos.store')}}" method="post">

    @csrf
    
    <div class="form-group">
        <label for="nome">Nome</label>
        <input type="text" class="form-control" name="nome" id="nome">
        @error('nome') <b style="color:red">{{$message}}</b> @enderror
    </div>

    <div class="form-group">
        <label for="um">Unidade de medida</label>
        <input type="text" class="form-control" name="um" id="um">
        @error('um') <b style="color:red">{{$message}}</b> @enderror
    </div>

    <div class="text-right">
        <input type="submit" value="Cadastrar" class="btn btn-primary">
        <input type="reset" value="Limpar" class="btn btn-danger">
    </div>

</form>

@endsection
