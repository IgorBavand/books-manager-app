import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SiginComponent } from './pages/sigin/sigin.component';
import { RegisterComponent } from './pages/register/register.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [SiginComponent, RegisterComponent],
  imports: [CommonModule, AuthRoutingModule, MaterialModule],
})
export class AuthModule {}
