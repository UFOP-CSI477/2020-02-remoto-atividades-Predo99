@extends('common')

@section('conteudo')

    <div class="container">
        <header class="d-flex justify-content-center">
            <h1>Dados da Manutenção</h1>
        </header>
    
        <div class="card">
            <div class="card-body">
                <p><strong>Id: </strong>{{ $registro->id }}</p>
                <p><strong>Data limite: </strong>{{ $registro->datalimite }}</p>
                <p><strong>Nome do equipamento: </strong>{{ $registro->equipamento->nome }}</p>
                <p><strong>Nome do usuário: </strong>{{ $registro->user->name }}</p>
                <p><strong>Tipo de manutenção: </strong>{{ $registro->tipo }}</p>
                <p><strong>Descrição da manutenção: </strong>{{ $registro->descricao }}</p>

                <p><strong>Ações:</strong></p>
            
                <ul>
                    <li><a class="btn btn-warning" href="{{ route('registros.edit', $registro->id)}}">Editar</a></li>
                    <li>
                        <form name="frmDelete"
                            action="{{route('registros.destroy', $registro->id)}}"
                            method="post"
                            onsubmit="return confirm('Confirma exclusão da manutenção?');">
                    
                            @csrf
                            @method('DELETE')
                    
                            <input type="submit" class="btn btn-danger" value="Excluir">
                    
                        </form>
                    </li>
                    <li><a class="btn btn-secondary" href="{{ route('registros.admin') }}">Voltar</a></li>
                </ul>
            </div>
        </div>
    </div>
@endsection