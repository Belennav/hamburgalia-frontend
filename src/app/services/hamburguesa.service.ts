import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Hamburguesa {
  _id?: string;
  nombre: string;
  ingredientes: string[];
  creatorId: string;
  likedBy: string[];
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class HamburguesaService {
  private apiUrl = 'http://localhost:3000/api/hamburguesas';
  constructor(private http: HttpClient) {}

  get(skip = 0): Observable<{ hamburguesas: Hamburguesa[] }> {
    return this.http.get<{ hamburguesas: Hamburguesa[] }>(
      `${this.apiUrl}/${skip}`
    );
  }

  getPageAmount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/pageAmount`);
  }

  getByCreatorId(creatorId: string): Observable<Hamburguesa[]> {
    return this.http.get<Hamburguesa[]>(`${this.apiUrl}/creator/${creatorId}`);
  }

  create(hamburguesa: Hamburguesa): Observable<void> {
    // get token from local storage
    const token = localStorage.getItem('token');
    return this.http.post<void>(this.apiUrl, { hamburguesa, token });
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

  like(id: string): Observable<void> {
    const token = localStorage.getItem('token');
    return this.http.put<void>(`${this.apiUrl}/like/${id}`, {
      token,
    });
  }

  update(hamburguesa: Hamburguesa): Observable<void> {
    // get token from local storage
    const token = localStorage.getItem('token');
    return this.http.put<void>(this.apiUrl, {
      hamburguesa,
      token,
    });
  }
}
