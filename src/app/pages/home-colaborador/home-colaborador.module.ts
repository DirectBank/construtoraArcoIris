import { CustomComponentModule } from '../../components/custom-components.module';
import { HomeColaboradorPage } from './home-colaborador.page';
import { Routes, RouterModule } from '@angular/router';
import { Device } from '@ionic-native/device/ngx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

const routes: Routes = [
  // { path: '', component: HomeColaboradorPage },
  { path: '', redirectTo: 'vistorias' },
  // { path: 'vistoria', loadChildren: () => import('../vistoria/vistoria.module').then(m => m.VistoriaPageModule) },
  { path: 'vistorias', loadChildren: () => import('../vistorias/vistorias.module').then(m => m.VistoriasPageModule) },
  { path: 'vistoria-detalhe', loadChildren: () => import('../vistoria-detalhe/vistoria-detalhe.module').then(m => m.VistoriaDetalhePageModule) },
  // { 
  //   path: 'vistoria-editar', 
  //   loadChildren: () => import('../vistoria-editar/vistoria-editar.module').then(m => m.VistoriaEditarPageModule)
  // }

];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomComponentModule,
    [RouterModule.forChild(routes)]
  ],
  providers: [
    Device,
  ],
  declarations: [
    HomeColaboradorPage,
  ],
})
export class HomeColaboradorPageModule { }
