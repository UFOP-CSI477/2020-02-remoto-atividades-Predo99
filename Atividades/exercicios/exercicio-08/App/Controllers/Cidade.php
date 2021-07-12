<?php

namespace App\Controllers;

use App\Database\AdapterSQLite;
use App\Database\Connection;

class Cidade {
    public function carregarCidades(){
        $connection = new Connection(new AdapterSQLite());

        $path = "exercicio-06/db/database.sqlite";

        $connection->getAdapter()->open($path);

        $sql = "SELECT * FROM cidades";
        $result = $connection->getAdapter()->get()->query($sql);

        return $result;
    }
}

