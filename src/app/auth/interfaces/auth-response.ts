export interface AuthResponse {
    email_user:      string;
    role_nombre:     string;
    distid:          string;
    role:            number;
    token:           string;
    additional_data: AdditionalData;
}

export interface AdditionalData {
    id:              number;
    nombre:          string;
    apellido:        string;
    cedula:          string;
    fechaNacimiento: Date;
    idAuth:          number;
    created_at:      Date;
    updated_at:      Date;
}