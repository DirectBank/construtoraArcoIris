import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomComponentModule } from '../../components/custom-components.module';

import { IonicModule } from '@ionic/angular';


import { FaleConoscoPage } from './fale-conosco.page';

const routes: Routes =[
  {path:'',component:FaleConoscoPage}

]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomComponentModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FaleConoscoPage]
})
export class FaleConoscoPageModule {}
