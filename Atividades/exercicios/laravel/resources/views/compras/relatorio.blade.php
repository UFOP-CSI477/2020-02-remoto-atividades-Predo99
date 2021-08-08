@extends('principal')

@section('conteudo')

    <table class="table table-bordered table-hover table-striped">
        <thead class="thead-dark">
            <tr>
                @if ($tipo == "Pessoa")
                    <th>Pessoa</th>
                @endif
                @if ($tipo == "Produto")
                    <th>Produto</th>
                @endif
                @if ($tipo == "Data")
                    <th>Data</th>
                @endif
                <th>Total de compras realizadas</th>
            </tr>
        </thead>
        <tbody>
            @foreach($compras as $compra)
                <tr>
                    @if ($tipo == "Pessoa")
                        <td>{{ $compra->pessoa->nome }}</td>
                    @endif
                    @if ($tipo == "Produto")
                        <td>{{ $compra->produto->nome }}</td>
                    @endif
                    @if ($tipo == "Data")
                        <td>{{ $compra->data }}</td>
                    @endif
                    
                    <td>{{ $compra->total }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <a href="{{ route('compras.index') }}">Voltar</a>

@endsection('conteudo')