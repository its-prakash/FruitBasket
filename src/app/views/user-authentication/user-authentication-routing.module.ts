import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { Title } from '@angular/platform-browser';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {path:"signUp", component:SignUpComponent,data:{title:"Sign Up"}},
  {path:"signIn", component:SignInComponent, data:{title:"Sign In"}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAuthenticationRoutingModule { }
