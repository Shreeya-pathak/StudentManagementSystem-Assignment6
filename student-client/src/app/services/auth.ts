import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

  readonly apiUrl = 'http://localhost:5053/api/auth';

  constructor(readonly http: HttpClient) {}

  register(data: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: { email: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }

  // ✅ THIS IS WHAT WAS MISSING
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
