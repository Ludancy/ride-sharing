export interface VehiculoResponse {
    chofer: Chofer;
}

export interface Chofer {
    id:              number;
    nombre:          string;
    apellido:        string;
    cedula:          string;
    fechaNacimiento: Date;
    idAuth:          number;
    entidadBancaria: null;
    numeroCuenta:    null;
    saldo:           string;
    created_at:      Date;
    updated_at:      Date;
    vehiculos:       Vehiculo[];
}

export interface Vehiculo {
    id:               number;
    idChofer:         number;
    marca:            string;
    color:            string;
    placa:            string;
    anio_fabricacion: number;
    estado_vehiculo:  string;
    estado_actual:    string;
    created_at:       Date;
    updated_at:       Date;
}