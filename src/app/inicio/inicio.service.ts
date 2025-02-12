import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Hamburguesa {
  id: number;
  nombre: string;
  ingredientes: string[];
}

@Injectable({
  providedIn: 'root',
})
export class HamburguesaService {
  private apiUrl = 'http://127.0.0.1:3000/api/hamburguesas';

  constructor(private http: HttpClient) {}

  getAllHamburguesas(): Observable<Hamburguesa[]> {
    return this.http.get<Hamburguesa[]>(this.apiUrl);
  }

  addHamburguesa(hamburguesa: Hamburguesa): Observable<void> {
    return this.http.post<void>(this.apiUrl, { hamburguesa });
  }

  deleteHamburguesa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
