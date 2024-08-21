import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusDadosPage } from './meus-dados.page';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes =[
  {path:'',component:MeusDadosPage}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MeusDadosPage]
})
export class MeusDadosPageModule {}
