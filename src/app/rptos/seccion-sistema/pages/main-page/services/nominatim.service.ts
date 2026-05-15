import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface NominatimPlace {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class NominatimService {
  private readonly baseUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<NominatimPlace[]> {
    return this.http.get<NominatimPlace[]>(this.baseUrl, {
      params: {
        q: query,
        format: 'json',
        addressdetails: '1',
        limit: '5',
        countrycodes: 've' // Restringido a Venezuela por defecto para mejores resultados
      }
    });
  }
}
