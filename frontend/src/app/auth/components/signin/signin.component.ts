import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [MessageService]
})
export class SigninComponent {
  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private auth: AuthService,
    private messageService: MessageService
  ) {}

  signin(): void {
    const email = this.signinForm.get('email')?.value;
    const password = this.signinForm.get('password')?.value;
    if (email && password)
      this.auth.signin(email, password).subscribe({
        error: () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Email ou mot de passe erroné'
          })
      });
  }

  value = '';
}
