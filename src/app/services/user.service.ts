import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../helpers/config';
import { User } from '../models/user.model';


let API = API_CONFIG.LOCAL_URI;
if(API_CONFIG.API_TYPE == "cloud"){
  API = API_CONFIG.CLOUD_URI;
}
const USER_API = API+"/user";
const API_URL = API+'/test/';
//const API_URL = 'http://localhost:8080/api/test/';
//const USER_API = 'http://localhost:8080/api/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getLastUsers(numb: number) : Observable<User[]> {
    return this.http.get<User[]>(`${USER_API}/recent/${numb}`);
  }

  getDashInfo(): Observable<any> {
    return this.http.get(`${USER_API}/dashinfo`, { responseType: 'text' });
  }
  constructor(private http: HttpClient) { }

  updateUserImage(id: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", file);
    const req = new HttpRequest('PUT', `${USER_API}/imageUpdate/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }



  getAll(): Observable<User[]> {
    return this.http.get<User[]>(USER_API);
  }

  get(id: any): Observable<User> {
    return this.http.get<User>(`${USER_API}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(USER_API, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${USER_API}/${id}`, data);
  }

  updateExpectedCalories(id: any, updatedExpectedCalories: any): Observable<any> {
    return this.http.put(`${USER_API}/expectedcalories/${id}`, {updatedExpectedCalories});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${USER_API}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(USER_API);
  }
}
