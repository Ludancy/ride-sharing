import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})

export class SeccionIngresarVehiculoService {

  private baseUrl: string = environment.baseUrl;
  protected http = inject(HttpClient);

  constructor() { }

  PostVehiculo(body:any): Observable<any>{
    const url = `${this.baseUrl}/vehiculos/register`;
    return this.http.post<any>(url, body);
  }

}