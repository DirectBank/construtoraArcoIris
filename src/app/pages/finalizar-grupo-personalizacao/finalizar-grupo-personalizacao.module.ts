import { FinalizarGrupoPersonalizacaoPage } from './finalizar-grupo-personalizacao.page';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: FinalizarGrupoPersonalizacaoPage
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FinalizarGrupoPersonalizacaoPage]
})

export class FinalizarGrupoPersonalizacaoPageModule { }