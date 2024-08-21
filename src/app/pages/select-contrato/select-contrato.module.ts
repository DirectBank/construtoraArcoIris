import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectContratoPage } from './select-contrato.page';

import { SelectContratoPageRoutingModule } from './select-contrato-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SelectContratoPageRoutingModule
  ],
  declarations: [SelectContratoPage]
})
export class SelectContratoPageModule {}
