import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MedicinesHomeComponent } from './components/medicines-home/medicines-home.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path: 'medicines-home',component:MedicinesHomeComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
