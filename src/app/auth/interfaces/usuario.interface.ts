export interface Usuario{
    distid: string
    nombre:string
    role_nombre: string
    apellido:string
    idUsuario:number
    idAuth:number
    cedula: string,
    email_user: string
    rol: number
    nroCuenta?: string;
    saldo?: string | number;
}