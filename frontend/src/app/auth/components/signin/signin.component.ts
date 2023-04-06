import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent  {

  signinForm = new FormGroup({
    'email': new FormControl(''),
    'password': new FormControl(''),
  })

  constructor(private auth: AuthService) {}

  signin(): void {
    const email = this.signinForm.get('email')?.value
    const password = this.signinForm.get('password')?.value
    if (email && password)
      this.auth.signin(email, password)
  }

  value = ''
}
