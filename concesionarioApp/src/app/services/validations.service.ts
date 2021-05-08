import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  private baseUrl: string = `${ environment.urlApi }`;

  constructor() { }

  passwordValidation(password: AbstractControl): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      const pass: boolean = control.value == password.value;

      let err: ValidationErrors = { 'differents': true };

      return pass ? of(null) : of(err);
    }
  }

}
