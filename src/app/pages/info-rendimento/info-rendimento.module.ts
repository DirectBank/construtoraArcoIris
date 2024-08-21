import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';


import { IonicModule } from '@ionic/angular';


import { InfoRendimentoPage } from './info-rendimento.page';

const routes:Routes = [
  {path:'',component:InfoRendimentoPage}
]

@NgModule({
  imports: [
    MatExpansionModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InfoRendimentoPage]
})
export class InfoRendimentoPageModule {}
