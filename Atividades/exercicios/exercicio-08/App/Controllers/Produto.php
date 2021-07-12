<?php

namespace App\Controllers;

use App\Database\AdapterSQLite;
use App\Database\Connection;

class Produto {
    public function carregarProduto(){
        $connection = new Connection(new AdapterSQLite());

        $path = "exercicio-07/db/database.sqlite";

        $connection->getAdapter()->open($path);

        $sql = "SELECT * FROM produtos";
        $result = $connection->getAdapter()->get()->query($sql);

        return $result;
    }
}

