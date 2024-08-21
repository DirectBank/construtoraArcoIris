import { CustomComponentModule } from '../../components/custom-components.module';
import { SignaturePadModule } from 'angular2-signaturepad';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VistoriaDetalhePage } from './vistoria-detalhe.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
const routes: Routes = [
  { path: '', component: VistoriaDetalhePage },

]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomComponentModule,
    IonicModule,
    SignaturePadModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VistoriaDetalhePage]
})
export class VistoriaDetalhePageModule { }
