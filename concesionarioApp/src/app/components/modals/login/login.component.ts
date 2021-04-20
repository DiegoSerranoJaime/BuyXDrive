import { Component, OnInit } from '@angular/core';
import { ModalInterface } from 'src/app/interfaces/moda.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, ModalInterface {

  data: any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
