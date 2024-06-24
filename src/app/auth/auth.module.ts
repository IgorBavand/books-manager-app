import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiginComponent } from './pages/sigin/sigin.component';
import { RegisterComponent } from './pages/register/register.component';



@NgModule({
  declarations: [
    SiginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
