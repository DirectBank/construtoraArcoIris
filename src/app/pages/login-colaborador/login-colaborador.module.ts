import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginColaboradorPage } from './login-colaborador.page';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { Device } from '@ionic-native/device/ngx';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { BrMaskerModule } from 'br-mask';

const routes: Routes = [
  {
    path: '',
    component: LoginColaboradorPage
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
  declarations: [LoginColaboradorPage]
})
export class LoginColaboradorPageModule { }
