<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Service;
use Illuminate\Support\Facades\Auth;

class AdminConfigController extends Controller
{
    // Obtener todos los usuarios y empleados
    public function getUsers()
    {
        // Verifica si el usuario autenticado es un administrador
        if (auth()->user()->role !== 'admin') {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        // Obtener todos los usuarios con todos sus campos
        $users = User::all();

        return response()->json($users, 200);
    
    }

    // Obtener todos los servicios
    public function getService()
    {
        try {
            $servicios = Service::all();
            return response()->json($servicios, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener servicios', 'message' => $e->getMessage()], 500);
        }
    }

    // Crear un nuevo servicio
    public function createService(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'categoria' => 'required|in:capilares,manos_pies',
            'descripcion' => 'required|string',
            'precio' => 'required|numeric|min:0',
        ]);

        $servicios = Service::create([
            'nombre' => $request->nombre,
            'categoria' => $request->categoria,
            'descripcion' => $request->descripcion,
            'precio' => $request->precio,
        ]);

        return response()->json($servicios, 201);
        
    }
    

    // Editar un servicio
    public function updateService(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'categoria' => 'required|in:capilares,manos_pies', // ✅ Importante
            'descripcion' => 'required|string',
            'precio' => 'required|numeric|min:0'
        ]);
    
        $service = Service::findOrFail($id);
        $service->update($request->all());
    
        return response()->json($service, 200);
        
    }

    // Eliminar un servicio
    public function deleteService($id)
    {
        try {
            $servicios = Service::findOrFail($id);
            $servicios->delete();

            return response()->json(['message' => 'Servicio eliminado'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar servicio'], 500);
        }
    }

    // Eliminar usuarios
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'Usuario eliminado correctamente']);
    }
}
