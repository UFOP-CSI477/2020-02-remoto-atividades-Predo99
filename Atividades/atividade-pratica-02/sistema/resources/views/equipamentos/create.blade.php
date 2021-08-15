@extends('common')

@section('conteudo')
    
<form action="{{ route('equipamentos.store')}}" method="post">

    @csrf
    
    <div class="form-group">
        <label for="nome">Nome</label>
        <input type="text" class="form-control" name="nome" id="nome" required maxlength="50">
        @error('nome') <b style="color:red">{{$message}}</b> @enderror
    </div>

    <div class="text-right">
        <input type="submit" value="Cadastrar" class="btn btn-primary">
        <input type="reset" value="Limpar" class="btn btn-danger">
        <a class="btn btn-secondary" href="{{ route('equipamentos.admin') }}">Voltar</a>
    </div>

</form>

@endsection
