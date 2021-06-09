import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, Subject, Subscription, timer } from 'rxjs';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { User } from 'src/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = `${environment.urlApi}/user`;
  tokenExpireSubscription: Subscription;
  dataToken: Subject<any> = new Subject();

  constructor(private _http: HttpClient,
    private _jwtHelper: JwtHelperService,
    private _router: Router,
    private _toastService: ToastService) { }

  login(user) {
    this._http.post(`${this.baseUrl}/login`, user).subscribe((data: any) => {
      this.manageToken(data);
    });
  }

  register(user) {
    return this._http.post(`${this.baseUrl}/register`, user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('dataToken');
    this._router.navigateByUrl('/inicio');
  }

  manageToken(data: any) {
    if (data.ok) {
      localStorage.setItem('token', data['token']);

      if (this.tokenExpireSubscription && !this.tokenExpireSubscription.closed) {
        this.tokenExpireSubscription.unsubscribe();
      }

      const token: any = jwt_decode(data.token);

      this.dataToken.next(token);
      this.saveDataToken(token);

      this.tokenExpireSubscription = timer(new Date(token.exp * 1000)).subscribe(() => this.logout());
    } else {
      this._toastService.show(data.msg);
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

  getDecodedToken(): User{
    let token

    if (localStorage.getItem('dataToken')) {
      token = JSON.parse(localStorage.getItem('dataToken'));
    }

    if (token) {
      return token.user;
    } else {
      return null;
    }
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

  updateName(formData: any): Observable<any> {
    const subject = new Subject<boolean>();

    this._http.put(`${this.baseUrl}/update/name`, formData, {
      headers: this.getToken()
    }).subscribe((data: any) => {
      this.manageToken(data);
      subject.next(data);
    });
    
    return subject;
  }
  
  updateEmail(formData: any): Observable<any> {
    const subject = new Subject<boolean>();

    this._http.put(`${this.baseUrl}/update/email`, formData, {
      headers: this.getToken()
    }).subscribe((data: any) => {
      this.manageToken(data);
      subject.next(data);
    });
    
    return subject;
  }
  
  updatePassword(formData: any): Observable<any> {
    const subject = new Subject<boolean>();

    this._http.put(`${this.baseUrl}/update/password`, formData, {
      headers: this.getToken()
    }).subscribe((data: any) => {
      this.manageToken(data);
      subject.next(data);
    });
    
    return subject;
  }
  
  updateGender(formData: any): Observable<any> {
    const subject = new Subject<boolean>();

    this._http.put(`${this.baseUrl}/update/gender`, formData, {
      headers: this.getToken()
    }).subscribe((data: any) => {
      this.manageToken(data);
      subject.next(data);
    });
    
    return subject;
  }
  
  updateAddress(formData: any): Observable<any> {
    const subject = new Subject<boolean>();

    this._http.put(`${this.baseUrl}/update/address`, formData, {
      headers: this.getToken()
    }).subscribe((data: any) => {
      this.manageToken(data);
      subject.next(data);
    });
    
    return subject;
  }
  
  updatePhoneNumber(formData: any): Observable<any> {
    const subject = new Subject<boolean>();

    this._http.put(`${this.baseUrl}/update/phoneNumber`, formData, {
      headers: this.getToken()
    }).subscribe((data: any) => {
      this.manageToken(data);
      subject.next(data);
    }); 
    
    return subject;
  }

  logicDelete(): Observable<any> {
    return this._http.get(`${this.baseUrl}/logicDelete`, {
      headers: this.getToken()
    }); 
  }
}
