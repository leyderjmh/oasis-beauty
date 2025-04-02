<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('empleados', function (Blueprint $table) {
            $table->id();
        $table->string('nombre');
        $table->string('email')->unique();
        $table->string('telefono');
        $table->string('foto_perfil')->nullable();  // Foto de perfil
        $table->string('entidad_estudios');
        $table->enum('disponibilidad_dia', ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']);
        $table->enum('disponibilidad_hora', ['mañana', 'tarde']);
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empleados');
    }
};
