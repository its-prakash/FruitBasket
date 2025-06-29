import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"", loadChildren:()=>import("./views/pages/pages.module").then((m)=>m.PagesModule)},
  {path:"authentication", loadChildren:()=>import("./views/user-authentication/user-authentication.module").then((m)=>m.UserAuthenticationModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
