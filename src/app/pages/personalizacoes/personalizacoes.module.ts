import { PersonalizacoesPage } from './personalizacoes.page';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: ':id_grupoPersonalizacao',
    component: PersonalizacoesPage
  },
  {
    path: ':id_grupoPersonalizacao/personalizacao',
    loadChildren: () => import('./../personalizacao/personalizacao.module').then(m => m.PersonalizacaoPageModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PersonalizacoesPage]
})

export class PersonalizacoesPageModule { }