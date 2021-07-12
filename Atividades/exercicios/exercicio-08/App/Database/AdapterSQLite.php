<?php

namespace App\Database;

use Exception;
use PDO;

class AdapterSQLite implements AdapterInterface {
   
    private $dbfile = "sqlite:". __DIR__ . "/../../../";

    private $connection = null;

    public function open($path) {

        try {

            $this->dbfile = $this->dbfile . $path;
            $this->connection = new PDO($this->dbfile);
        
        } catch(Exception $e) {
            die("Error: " . $e->getMessage());
        }

    }

    public function close() {
        $this->connection = null;
    }

    public function get() {
        if ( $this->connection === null ) {
            $this->connection->open($this->dbfile);
        }
        return $this->connection;
    }

}