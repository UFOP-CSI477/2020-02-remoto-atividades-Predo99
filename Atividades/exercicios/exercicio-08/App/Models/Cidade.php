<?php

namespace App\Models;

class Cidade {

    private $id, $nome, $sigla_estado;

    public function __construct($id, $nome, $sigla_estado) {

        $this->id = $id;
        $this->nome = $nome;
        $this->sigla_estado = $sigla_estado;

    }

    public function __destruct() {

    }
}