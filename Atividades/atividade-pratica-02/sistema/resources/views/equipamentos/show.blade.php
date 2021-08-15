@extends('common')

@section('conteudo')

    <div class="container">
        <header class="d-flex justify-content-center">
            <h1>Dados do Equipamento</h1>
        </header>
    
        <div class="card">
            <div class="card-body">
                <p><strong>Id: </strong>{{ $equipamento->id }}</p>
                <p><strong>Nome: </strong>{{ $equipamento->nome }}</p>

                <p><strong>Ações:</strong></p>
            
                <ul>
                    <li><a class="btn btn-warning" href="{{ route('equipamentos.edit', $equipamento->id)}}">Editar</a></li>
                    <li>
                        <form name="frmDelete"
                            action="{{route('equipamentos.destroy', $equipamento->id)}}"
                            method="post"
                            onsubmit="return confirm('Confirma exclusão do equipamento?');">
                    
                            @csrf
                            @method('DELETE')
                    
                            <input type="submit" class="btn btn-danger" value="Excluir">
                    
                        </form>
                    </li>
                    <li><a class="btn btn-secondary" href="{{ route('equipamentos.admin') }}">Voltar</a></li>
                </ul>
            </div>
        </div>
    </div>
@endsection