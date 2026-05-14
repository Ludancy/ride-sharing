export interface Chofere {
    id:                  number;
    nombre:              string;
    apellido:            string;
    cedula:              string;
    fechaNacimiento:     Date;
    idAuth:              number;
    saldo:               string;
    idChofer:            number;
    idBanco:             number;
    nroCuenta:           string;
    bancoNombre:         string;
    estado:              string;
    bancoCodigo:         string;
    cuentas_bancarias:   CuentasBancaria[];
    contactosEmergencia: ContactosEmergencia[];
}

export interface ContactosEmergencia {
    id:         number;
    idChofer:   number;
    nombre:     string;
    telefono:   string;
    created_at: Date;
    updated_at: Date;
}

export interface CuentasBancaria {
    id:              number;
    idChofer:        number;
    idBanco:         number;
    nroCuenta:       string;
    estado:          string;
    created_at:      Date;
    updated_at:      Date;
    entidadBancaria: string;
    numeroCuenta:    string;
}