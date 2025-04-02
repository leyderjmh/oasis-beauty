<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    //
    use HasFactory;

    protected $table = 'servicios';

    protected $fillable = [
        'nombre',
        'categoria',
        'descripcion',
        'precio',
    ];
}
