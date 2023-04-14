import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService]
})
export class SignupComponent {
  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private auth: AuthService,
    private messageService: MessageService
  ) {}

  signup(): void {
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    if (email && password)
      this.auth
        .signup(email, password)
        .pipe(mergeMap(() => this.auth.signin(email, password)))
        .subscribe({
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Email ou mot de passe erroné'
            });
          }
        });
  }

  value = '';
}
