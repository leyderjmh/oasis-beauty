<?php

public function show($id) {
    $empleado = Empleado::where('user_id', $id)->first();
    return response()->json($empleado);
}

public function store(Request $request) {
    $request->validate([
        'nombre' => 'required|string',
        'email' => 'required|email|unique:empleados',
        'telefono' => 'required|string',
        'foto_perfil' => 'nullable|string',
        'entidad_estudios' => 'required|string',
        'disponibilidad_dia' => 'required|string',
        'disponibilidad_hora' => 'required|string',
        'categoria' => 'required|in:capilares,manos_pies',
    ]);

    $empleado = Empleado::create($request->all());
    return response()->json($empleado);
}

public function update(Request $request, $id) {
    $empleado = Empleado::findOrFail($id);
    $empleado->update($request->all());
    return response()->json($empleado);
}

public function destroy($id) {
    Empleado::destroy($id);
    return response()->json(['message' => 'Empleado eliminado']);
}
