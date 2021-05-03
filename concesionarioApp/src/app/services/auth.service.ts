import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription, timer } from 'rxjs';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenExpireSubscription: Subscription;
  baseUrl: string = `${environment.urlApi}/user`;

  constructor(private _http: HttpClient,
    private _jwtHelper: JwtHelperService) { }

  login(user) {
    this._http.post(`${this.baseUrl}/login`, user).subscribe((data: any) => {
      localStorage.setItem('token', data['token']);

      if (this.tokenExpireSubscription && !this.tokenExpireSubscription.closed) {
        this.tokenExpireSubscription.unsubscribe();
      }

      const token: any = jwt_decode(data.token);

      this.tokenExpireSubscription = timer(new Date(token.exp * 1000)).subscribe(() => localStorage.removeItem('token'));
    });
  }

  register(user) {
    return this._http.post(`${this.baseUrl}/register`, user);
  }

  logout() {
    if (localStorage.getItem('token')) {
      return localStorage.removeItem('token');
    }
  }

  isAuthenticated(): boolean {
    let token;

    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');

      if (token) {
        return !this._jwtHelper.isTokenExpired(token);
      }
    } else {
      return false;
    }

    return false;
  }

  getDecodedToken(): Promise<any>{
    let token

    return new Promise<any>((resolve, reject) => {
      if (this.isAuthenticated()) {
        resolve(jwt_decode(localStorage.getItem('token')));
      } else {
        reject(null);
      }
    })
  }
}
