import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() { }

  getAllTranslados(dateInit:string, dateEnd:string):Observable<any> {
    const body = {
      fecha_inicio: dateInit,
      fecha_fin: dateEnd
    }
    const url = `${this.baseUrl}/revisar-traslados-realizados`;
    return this.http.post<any>(url, body);
  }

  // postGanancias(body:object, id:number):Observable<any> {
  //   const url = `${this.baseUrl}/clientes/${id}/recarga-saldo`;
  //   return this.http.post<any>(url,body);
  // }
}
