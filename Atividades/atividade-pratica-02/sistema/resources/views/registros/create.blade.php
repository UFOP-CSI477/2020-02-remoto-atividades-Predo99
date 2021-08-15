@extends('common')

@section('conteudo')
    
<form action="{{ route('registros.store')}}" method="post">

    @csrf
    
    <div class="form-group">
        <label for="datalimite">Data limite</label>
        <input type="text" class="form-control" name="datalimite" id="datalimite" required>
        @error('datalimite') <b style="color:red">{{$message}}</b> @enderror
    </div>

    <div class="form-group">
        <label for="descricao">Descrição</label>
        <input type="text" class="form-control" name="descricao" id="descricao" required maxlength="191">
        @error('descricao') <b style="color:red">{{$message}}</b> @enderror
    </div>

    <div class="form-group">
        <label for="tipo">Tipo</label>

        <select name="tipo" id="tipo" class="form-control">

            <option value="1">Preventiva</option>
            <option value="2">Corretiva</option>
            <option value="3">Urgente</option>

        </select>
        @error('tipo') <b style="color:red">{{$message}}</b> @enderror
    </div>

    <div class="form-group">
        <label for="equipamento_id">Equipamento</label>

        <select name="equipamento_id" id="equipamento_id" class="form-control">

            @foreach($equipamentos as $equipamento)
                <option value="{{$equipamento->id}}">{{$equipamento->nome}}</option>
            @endforeach

        </select>
        @error('equipamento_id') <b style="color:red">{{$message}}</b> @enderror
    </div>

    <div class="form-group">
        <label for="user_id">Usuário</label>

        <select name="user_id" id="user_id" class="form-control">

            @foreach($users as $user)
                <option value="{{$user->id}}">{{$user->name}}</option>
            @endforeach

        </select>
        @error('user_id') <b style="color:red">{{$message}}</b> @enderror
    </div>

    <div class="text-right">
        <input type="submit" value="Cadastrar" class="btn btn-primary">
        <input type="reset" value="Limpar" class="btn btn-danger">
        <a class="btn btn-secondary" href="{{ route('registros.admin') }}">Voltar</a>
    </div>

</form>

@endsection
