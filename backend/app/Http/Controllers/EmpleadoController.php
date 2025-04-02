<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EmpleadoController extends Controller
{
    //
    public function index()
    {
        $empleados = Empleado::all();
        return response()->json($empleados);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string',
            'email' => 'required|email|unique:empleados',
            'telefono' => 'required|string',
            'foto_perfil' => 'nullable|image',
            'entidad_estudios' => 'required|string',
            'disponibilidad_dia' => 'required|string',
            'disponibilidad_hora' => 'required|string',
        ]);

        $empleado = Empleado::create($validated);

        return response()->json($empleado, 201);
    }

    public function show($id)
    {
        $empleado = Empleado::findOrFail($id);
        return response()->json($empleado);
    }

    public function update(Request $request, $id)
    {
        $empleado = Empleado::findOrFail($id);
        $empleado->update($request->all());

        return response()->json($empleado);
    }

    public function destroy($id)
    {
        $empleado = Empleado::findOrFail($id);
        $empleado->delete();

        return response()->json(['message' => 'Empleado eliminado']);
    }
}
