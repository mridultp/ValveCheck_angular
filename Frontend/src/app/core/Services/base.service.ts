import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) { }

  login(data): Observable<any>{
    return this.http.post(`${environment.base}/login`, data);
  }

  createUser(data):Observable<any>{
    return this.http.post(`${environment.base}/createUser`, data);
  }

  updateUser(data):Observable<any>{
    return this.http.put(`${environment.base}/updateUser`, data);
  }

  getUsers(data): Observable<any>{
    return this.http.post(`${environment.base}/getUserDetails`, data);
  }
}
