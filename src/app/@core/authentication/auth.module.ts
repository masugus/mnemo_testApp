import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthRoutingModule } from './auth-routing.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatSlideToggleModule
  ],
  declarations: [LoginComponent],
  providers: [AuthenticationService],
})
export class AuthModule {}
