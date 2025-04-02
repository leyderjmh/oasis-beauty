<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\AdminConfigController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/empleado/{id}', [EmpleadoController::class, 'show']);
    Route::post('/empleado', [EmpleadoController::class, 'store']);
    Route::put('/empleado/{id}', [EmpleadoController::class, 'update']);
    Route::delete('/empleado/{id}', [EmpleadoController::class, 'destroy']);

    Route::get('/admin/users', [AdminConfigController::class, 'getUsers']);
    Route::delete('/admin/users/{id}', [AdminConfigController::class, 'destroy']);

    Route::get('/admin/services', [AdminConfigController::class, 'getService']);
    Route::post('/admin/services', [AdminConfigController::class, 'createService']);
    Route::put('/admin/services/{id}', [AdminConfigController::class, 'updateService']);
    Route::delete('/admin/services/{id}', [AdminConfigController::class, 'deleteService']);
    

    // Panel de usuario normal
    Route::get('/user-dashboard', function (Request $request) {
        return response()->json([
            'message' => 'Bienvenido al panel de usuario',
            'user' => $request->user()
        ]);
    });

    // Panel de configuración (SOLO ADMINISTRADORES)
    Route::get('/configuracion', function (Request $request) {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'No tienes permisos para acceder'], 403);
        }
        return response()->json(['message' => 'Bienvenido al panel de configuración']);
    });
});



