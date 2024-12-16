import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Hamburguesa {
  _id?: string;
  nombre: string;
  ingredientes: string[];
  creatorId: string;
}

@Injectable({
  providedIn: 'root',
})
export class HamburguesaService {
  private apiUrl = 'http://localhost:3000/api/Hamburguesas';
  constructor(private http: HttpClient) {}

  getAll(): Observable<{ Hamburguesas: Hamburguesa[] }> {
    return this.http.get<{ Hamburguesas: Hamburguesa[] }>(this.apiUrl);
  }

  getByCreatorId(creatorId: string): Observable<Hamburguesa[]> {
    return this.http.get<Hamburguesa[]>(`${this.apiUrl}/creator/${creatorId}`);
  }

  create(Hamburguesa: Hamburguesa): Observable<void> {
    // get token from local storage
    const token = localStorage.getItem('token');
    return this.http.post<void>(this.apiUrl, { Hamburguesa, token });
  }

  delete(id: string): Observable<void> {
    // get token from local storage
    const token = localStorage.getItem('token');
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  update(Hamburguesa: Hamburguesa): Observable<void> {
    // get token from local storage
    const token = localStorage.getItem('token');
    return this.http.put<void>(this.apiUrl, {
      Hamburguesa,
      token,
    });
  }
}
