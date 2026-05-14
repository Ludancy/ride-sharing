export interface Usuario {
    id:       number;
    correo:   string;
    estado:   boolean;
    empleado: Empleado;
}

export interface Empleado {
    nombre: string;
}