import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentsService {

  readonly apiUrl = 'http://localhost:5053/api/students';

  constructor(readonly http: HttpClient) {}

  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addStudent(student: any): Observable<any> {
    return this.http.post(this.apiUrl, student);
  }

  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
