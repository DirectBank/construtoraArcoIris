import { PersonalizacaoPage } from './personalizacao.page';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: ':id_personalizacao',
    component: PersonalizacaoPage
  }

]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PersonalizacaoPage]
})
export class PersonalizacaoPageModule { }
