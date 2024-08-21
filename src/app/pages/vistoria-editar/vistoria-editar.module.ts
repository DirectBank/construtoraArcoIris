import { CustomComponentModule } from '../../components/custom-components.module';
import { SignaturePadModule } from 'angular2-signaturepad';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VistoriaEditarPage } from './vistoria-editar.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: VistoriaEditarPage },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomComponentModule,
    IonicModule,
    SignaturePadModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VistoriaEditarPage]
})
export class VistoriaEditarPageModule { }
