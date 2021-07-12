<?php

require '../vendor/autoload.php';

// use App\Controllers\Estado as ControllersEstado;
// use App\Controllers\Produto as ControllersProduto;
// use App\Controllers\Cidade as ControllersCidade;

// $controllerEstado = new ControllersEstado();
// $controllerProduto = new ControllersProduto();
// $controllerCidade = new ControllersCidade();

// $result = $controllerEstado->carregarEstados();

// echo "<hr><ol>";

// while($e = $result->fetch()) {
//     echo "<li>" .$e["nome"] . "-" . $e['sigla'] . "</li>\n";
// }

// echo "</ol><hr>";

// $result = $controllerProduto->carregarProduto();

// echo "<hr><ol>";

// while($p = $result->fetch()) {
//     echo "<li>" .$p["nome"] . "-" . $p['um'] . "</li>\n";
// }

// echo "</ol><hr>";

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">

    <title>Página Inicial</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    
    <link rel="stylesheet" href="./css/main.css">

</head>
<body>
    <header class="d-flex justify-content-center">
        <h1>Página principal</h1>
    </header>

    <nav>
        <ul class="nav nav-pills nav-fill">
            <li class="nav-item">
                <a class="nav-link active" href="./index.php" aria-selected="true">Página inicial</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./estadosView.php">Estados</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./cidadesView.php">Cidades</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./produtosView.php">Produtos</a>
            </li>
        </ul>
    </nav>
</body>
</html>