<?php

    require_once "connection.php";

    //Controller -> Model
    $produtos = $connection->query("SELECT * FROM produtos");

    //View
    require_once "produtosView.php";