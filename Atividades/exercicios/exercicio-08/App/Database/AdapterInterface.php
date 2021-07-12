<?php

namespace App\Database;

interface AdapterInterface {
    
    public function open($path);
    public function close();
    public function get();
    
}