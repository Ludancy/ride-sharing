import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() { }


  getTranslados(id:number):Observable<any> {
    const url = `${this.baseUrl}/cliente/traslados/${id}`;
    return this.http.get<any>(url);
  }

  getCliente(id:number):Observable<any> {
    const url = `${this.baseUrl}/clientes/${id}`;
    return this.http.get<any>(url);
  }

  getBancos():Observable<any> {
    const url = `${this.baseUrl}/bancos`;
    return this.http.get<any>(url);
  }

  postRescargarSaldo(body:object, id:number):Observable<any> {
    const url = `${this.baseUrl}/clientes/${id}/recarga-saldo`;
    return this.http.post<any>(url,body);
  }

}
