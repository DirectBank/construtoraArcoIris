import { GruposPersonalizacoesPage } from './grupos-personalizacoes.page';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { PersonalizacaoPage } from '../personalizacao/personalizacao.page';

const routes: Routes = [
  {
    path: '',
    component: GruposPersonalizacoesPage
  },
  {
    path: 'personalizacoes',
    loadChildren: () => import('../personalizacoes/personalizacoes.module').then(m => m.PersonalizacoesPageModule)
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GruposPersonalizacoesPage]
})

export class GruposPersonalizacoesPageModule { }