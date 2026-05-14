
import { Injectable } from '@angular/core';
import { Chofer, Chofere,} from '../../../interfaces';
import { MainService } from '../../../services/producto.service';
import { Observable } from 'rxjs/internal/Observable';
import { Banco } from '../../../interfaces/models/banco';
import { EvaluacionChofer } from '../../../interfaces/models/evaluacion_chofer';
import { VehiculoResponse } from '../../../interfaces/vehiculo-response';
import { Lugares } from '../../../interfaces/models/lugares';
import { TrasladoResponse } from '../../../interfaces/traslado-response';
import { ContactoEmergencia } from '../../../interfaces/models/contacto_emergencia';
import { EvaluacionVehiculo } from '../../../interfaces/models/evaluacion_vehiculo';

@Injectable({
  providedIn: 'root'
})
export class MainPageService extends MainService {

//Obtiene los choferes
  getChoferes(): Observable<Chofer>{
    const url = `${this.baseUrl}/choferes`;
    return this.http.get<Chofer>(url)
    // .pipe(
    //   tap (resp => {
    //     this.producto = resp.productos
    //   })
    // )
  }

  getChofer(id:number): Observable<Chofer>{
    const url = `${this.baseUrl}/choferes/${id}`;
    return this.http.get<Chofer>(url)
  }

  // Obtiene los datos de los cliente

  getClientedeEmergecia(id:number): Observable<Array<object>> {
    const url = `${this.baseUrl}/choferes/${id}/contactos-emergencia`;
    return this.http.get<Array<object>>(url)
  }

  // eliminar Contactos
  deleteClientedeEmergecia(id:number): Observable<Array<object>> {
    const url = `${this.baseUrl}/contactos-emergencia/${id}`;
    return this.http.delete<Array<object>>(url)
  }
  
  addClientedeEmergecia(data:object): Observable<Array<object>> {
    const url = `${this.baseUrl}/choferes/contactos-emergencia`;
    return this.http.post<any>(url, data);
  }

  editClientedeEmergecia(data:object, id:number): Observable<Array<object>> {
    const url = `${this.baseUrl}/contactos-emergencia/${id}`;
    return this.http.put<any>(url, data);
  }

//Obtiene los bancos
  getBancos(): Observable<Banco[]>{
    const url = `${this.baseUrl}/bancos`;
    return this.http.get<Banco[]>(url);
  }

  //Obtener la evaluacion del chofer
  getEvaluacionChofer(id:number): Observable<EvaluacionChofer>{
    const url = `${this.baseUrl}/choferes/${id}/evaluacion-psicologica`;
    return this.http.get<EvaluacionChofer>(url);
  }

  getEvaluacionVehiculo(id:number): Observable<EvaluacionVehiculo>{
    const url = `${this.baseUrl}/evaluaciones-vehiculos/${id}`;
    return this.http.get<EvaluacionVehiculo>(url);
  }

  getVehiculosChofer(idChofer:number): Observable<VehiculoResponse>{
    const url = `${this.baseUrl}/choferes/${idChofer}/vehiculos`;
    return this.http.get<VehiculoResponse>(url);
  }

  //obtener los lugares disponibles
  getLugaresDisponibles(): Observable<Lugares[]>{
    const url = `${this.baseUrl}/lugares`;
    return this.http.get<Lugares[]>(url);
  }

  getTraslado(idCliente:number): Observable<TrasladoResponse[]>{
    const url = `${this.baseUrl}/traslado/cliente/${idCliente}`;
    return this.http.get<TrasladoResponse[]>(url);
  }

  getContactoDeEmergencia(idChofer:number):Observable<ContactoEmergencia[]>{
    const url = `${this.baseUrl}/choferes/${idChofer}/contactos-emergencia`;
    return this.http.get<ContactoEmergencia[]>(url);
  }

  getChoferPorId(idChofer:number):Observable<Chofere>{
    const url = `${this.baseUrl}/choferes/${idChofer}`;
    return this.http.get<Chofere>(url);
  }


  postEvaluacion(idChofer:number, calificacion:number): Observable<any>{
    const body = {idChofer, calificacion}
    const url = `${this.baseUrl}/pruebas/evaluacion-psicologica`;
    return this.http.post<any>(url, body)
  }

  postEvaluacionVehiculo(idVehiculo:number, calificacion:number): Observable<any>{
    const body = {idVehiculo, calificacion}
    const url = `${this.baseUrl}/pruebas/evaluacion-vehiculo`;
    return this.http.post<any>(url, body)
  }

  //Para agregar una entidad bancaria como pago al chofer
  postBancoChofer(id:number, body: any): Observable<any>{
    const url = `${this.baseUrl}/agregar-banco-chofer/${id}`;
    return this.http.post<any>(url, body)
  }

  //Solicitar traslado
  postSolictarTraslado(idCliente:number, body: any):Observable<any>{
    const url = `${this.baseUrl}/${idCliente}/traslados/solicitar`;
    return this.http.post<any>(url, body)
  }

}
