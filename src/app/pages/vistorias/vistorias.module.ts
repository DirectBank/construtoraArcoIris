import { RouterModule, Routes } from '@angular/router';
import { VistoriasPage } from './vistorias.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: VistoriasPage
  },
  {
    path: 'vistoria',
    loadChildren: () => import('../vistoria/vistoria.module').then(m => m.VistoriaPageModule)
  },
  { 
    path: 'vistoria-editar', 
    loadChildren: () => import('../vistoria-editar/vistoria-editar.module').then(m => m.VistoriaEditarPageModule)
  }

]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VistoriasPage]
})
export class VistoriasPageModule { }
