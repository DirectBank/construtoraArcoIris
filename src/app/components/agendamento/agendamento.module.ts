import { CustomComponentModule } from '../custom-components.module';
import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, } from '@ionic/angular';

@NgModule({
  imports: [
    CustomComponentModule,
    CommonModule,
    FormsModule,
    IonicModule,
  ],
})
export class AgendamentoPageModule { }