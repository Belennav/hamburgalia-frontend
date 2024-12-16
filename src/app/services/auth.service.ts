import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface RegisterResponse {
  user: User;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:3000/api/users';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.apiUrl, { user });
  }

  login(user: User): Observable<LoginResponse> {
    // store the token in local storage
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { user });
  }

  getUsers(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(this.apiUrl);
  }
}
