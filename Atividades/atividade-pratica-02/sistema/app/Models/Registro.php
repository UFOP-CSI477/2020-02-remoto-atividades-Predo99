<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registro extends Model
{
    use HasFactory;

    protected $fillable = ['equipamento_id', 'user_id', 'descricao', 'datalimite', 'tipo'];

    public function user(){
        return $this->belongsTo(User::class)->orderBy('name');
    }

    public function equipamento(){
        return $this->belongsTo(Equipamento::class)->orderBy('nome');
    }

    public function getTipoAttribute($value){
        switch($value){
            case 1:
                return "Preventiva";
                break;
            case 2:
                return "Corretiva";
                break;
            case 3:
                return "Urgente";
                break;
        }
    }
}
