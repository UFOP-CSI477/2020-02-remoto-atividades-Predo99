@extends('common')

@section('conteudo')

<div class="container-fluid">
    <header class="d-flex justify-content-center">
        <h1>Relatório de usuários</h1>
    </header>

    <div class="col-md-8">
        <h2>Opções</h2>
        <a class="btn btn-secondary" href="{{ route('relatorios') }}">Voltar</a>
    </div>
    
    <div>
        <table class="table caption-top table-bordered table-hover table-striped">
            <caption>Usuários</caption>
            <thead class="thead-dark">
                <tr>
                    <th>Usuários</th>
                    <th>Email</th>

                </tr>
            </thead>
            <tbody>
        
                @foreach($users as $user)
                    <tr>
                        <td>{{ $user->name }}</td>
                        <td>{{ $user->email }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>

@endsection