import { Chofere } from "./models/chofer";

export interface Chofer {
    choferes: Chofere[];
    saldo?: string | number;
    nroCuenta?: string;
}
