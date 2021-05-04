import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, Subscription, timer } from 'rxjs';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenExpireSubscription: Subscription;
  baseUrl: string = `${environment.urlApi}/user`;
  dataToken: Subject<any> = new Subject();

  constructor(private _http: HttpClient,
    private _jwtHelper: JwtHelperService) { }

  login(user) {
    this._http.post(`${this.baseUrl}/login`, user).subscribe((data: any) => {
      localStorage.setItem('token', data['token']);

      if (this.tokenExpireSubscription && !this.tokenExpireSubscription.closed) {
        this.tokenExpireSubscription.unsubscribe();
      }

      const token: any = jwt_decode(data.token);

      this.dataToken.next(token);
      this.saveDataToken(token);

      this.tokenExpireSubscription = timer(new Date(token.exp * 1000)).subscribe(() => this.logout());
    });
  }

  register(user) {
    return this._http.post(`${this.baseUrl}/register`, user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('dataToken');
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

  getDecodedToken(): any{
    let token

    if (localStorage.getItem('dataToken')) {
      token = JSON.parse(localStorage.getItem('dataToken'));
    }

    return token.user;
  }

  saveDataToken(token: any) {
    localStorage.setItem('dataToken', JSON.stringify(token));
  }

  getToken() {
    if (localStorage.getItem('token')) {
      let header = new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      return header;
    }

    return null;
  }
}
