import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: '**', redirectTo: '/notfound' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
