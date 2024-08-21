import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { EsqueciSenhaPage } from './esqueci-senha.page';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Device } from '@ionic-native/device/ngx';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: EsqueciSenhaPage
  },

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    AppVersion,
    Device,
  ],
  declarations: [EsqueciSenhaPage]
})
export class EsqueciSenhaPageModule { }
