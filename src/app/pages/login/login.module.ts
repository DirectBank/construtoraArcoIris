import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { Device } from '@ionic-native/device/ngx';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { NgModule } from '@angular/core';
import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    IonicModule,
    ReactiveFormsModule,
    BrMaskerModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    AppVersion,
    Device,
  ],
  declarations: [LoginPage]
})
export class LoginPageModule { }
