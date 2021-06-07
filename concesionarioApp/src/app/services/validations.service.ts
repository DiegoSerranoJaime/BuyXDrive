import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  private baseUrl: string = `${ environment.urlApi }`;

  constructor(
    private _http: HttpClient,
    private _authService: AuthService
  ) { }

  public passwordValidation(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const pass: boolean = control.get('password').value == control.get('passwordConfirmation').value;

      let err: ValidationErrors = { differents: true };

      return of(pass ? null : err);
    }
  }

  public emailValidation(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return timer(100).pipe(
        switchMap(() => {
          return this._http.get<any>(`${this.baseUrl}/email/${control.value}`).pipe(
            map(data => !data.ok ? null : { emailRegistered: true })
          );
        })
      );
    }
  }

  public amountValidation(id: number): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return timer(100).pipe(
        switchMap(() => {
          return this._http.get<any>(`${this.baseUrl}/products/${id}/amount/${control.value}`).pipe(
            map(data => !data.ok ? null : { amountAvailable: true })
          );
        })
      );
    }
  }

  public stockValidation(id: number): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return timer(100).pipe(
        switchMap(() => {
          return this._http.get<any>(`${this.baseUrl}/products/${id}/amount/1`).pipe(
            map(data => !data.ok ? null : { amountAvailable: true })
          );
        })
      );
    }
  }

}
