import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { CheckboxModule } from 'primeng/checkbox';
import { SharedModule } from '../shared/shared.module';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { PasswordModule } from 'primeng/password';
@NgModule({
  declarations: [AuthComponent, SigninComponent, SignupComponent],
  imports: [AuthRoutingModule, SharedModule, PasswordModule, CheckboxModule]
})
export class AuthModule {}
