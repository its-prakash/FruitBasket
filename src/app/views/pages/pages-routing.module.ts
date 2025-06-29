import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FruitsListComponent } from './fruits-list/fruits-list.component';
import { Title } from '@angular/platform-browser';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:"home",component:HomeComponent,data :{title:"home"}},
  {path:"fruits",component:FruitsListComponent,data :{title:"Fruits-List"}},
  {path:"about-us",component:AboutUsComponent,data :{title:"About Us"}},
  {path:"contact-us",component:ContactUsComponent,data :{title:"Contact Us"}}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
