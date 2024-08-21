import { CustomComponentModule } from '../../components/custom-components.module';
import { SignaturePadModule } from 'angular2-signaturepad';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VistoriaPage } from './vistoria.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: ':id_vistoria', component: VistoriaPage },
  { 
    path: ':id_visotia/vistoria-detalhe', 
    loadChildren: () => import('../vistoria-detalhe/vistoria-detalhe.module').then(m => m.VistoriaDetalhePageModule)
  },

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
  declarations: [VistoriaPage]
})
export class VistoriaPageModule { }
