import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API_CONFIG } from '../helpers/config';


let AUTH_API = API_CONFIG.LOCAL_URI;
if(API_CONFIG.API_TYPE == "cloud"){
  AUTH_API = API_CONFIG.CLOUD_URI;
}
AUTH_API+="/auth/";

//const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  isSignedin: boolean = false;
  isSocialSignin: boolean = false;
  authSubject = new Subject<boolean>();

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email,
      password
    }, httpOptions);
  }

  socialLogin(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'postSocialLogin', {
      email : user.email,
      username: user.name 
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }
}
