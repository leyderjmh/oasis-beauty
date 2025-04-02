<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'nombre',
        'email',
        'telefono',
        'foto_perfil',
        'entidad_estudios',
        'disponibilidad_dia',
        'disponibilidad_hora',
    ];
}
