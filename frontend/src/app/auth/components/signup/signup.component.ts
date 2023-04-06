import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm = new FormGroup({
    'email': new FormControl(''),
    'password': new FormControl(''),
  })

  constructor(private auth: AuthService) {}

  signup(): void {
    const email = this.signupForm.get('email')?.value
    const password = this.signupForm.get('password')?.value
    if (email && password)
      this.auth.signup(email, password)
  }

  value = ''
}
