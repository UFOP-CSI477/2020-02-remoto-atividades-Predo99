@extends('common')

@section('conteudo')
    
<form action="{{ route('registros.update', $registro->id)}}" method="post">

    @csrf
    @method('PATCH')

    <div class="form-group">
        <label for="datalimite">Data limite</label>
        <input type="text" class="form-control" name="datalimite" id="datalimite" value="{{$registro->datalimite}}" required>
        @error('datalimite') <b style="color:red">{{$message}}</b> @enderror
    </div>

    <div class="form-group">
        <label for="descricao">Descrição</label>
        <input type="text" class="form-control" name="descricao" id="descricao" value="{{$registro->descricao}}" required maxlength="191">
        @error('descricao') <b style="color:red">{{$message}}</b> @enderror
    </div>

    <div class="form-group">
        <label for="tipo">Tipo</label>

        <select name="tipo" id="tipo" class="form-control">

            <option value="1"
                @if($registro->tipo == "Preventiva")
                    selected
                @endif
            >Preventiva</option>
            <option value="2"
                @if($registro->tipo == "Corretiva")
                    selected
                @endif
            >Corretiva</option>
            <option value="3"
                @if($registro->tipo == "Urgente")
                    selected
                @endif
            >Urgente</option>

        </select>
        @error('tipo') <b style="color:red">{{$message}}</b> @enderror
    </div>

    <div class="form-group">
        <label for="equipamento_id">Equipamento</label>

        <select name="equipamento_id" id="equipamento_id" class="form-control">

            @foreach($equipamentos as $equipamento)
                <option value="{{$equipamento->id}}"
                    @if($registro->equipamento_id == $equipamento->id)
                        selected
                    @endif
                >{{$equipamento->nome}}</option>
            @endforeach

        </select>
        @error('equipamento_id') <b style="color:red">{{$message}}</b> @enderror
    </div>

    <div class="form-group">
        <label for="user_id">Usuário</label>

        <select name="user_id" id="user_id" class="form-control">

            @foreach($users as $user)
                <option value="{{$user->id}}"
                    @if($registro->user_id == $user->id)
                        selected
                    @endif
                >{{$user->name}}</option>
            @endforeach

        </select>
        @error('user_id') <b style="color:red">{{$message}}</b> @enderror
    </div>

    <div class="text-right">
        <input type="submit" value="Atualizar" class="btn btn-primary">
        <input type="reset" value="Limpar" class="btn btn-danger">
        <a class="btn btn-secondary" href="{{ route('registros.show', $registro->id) }}">Voltar</a>
    </div>

</form>

@endsection
