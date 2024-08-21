import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SelectContratoPage } from './select-contrato.page';

const routes: Routes = [
  {
    path: '',
    component: SelectContratoPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectContratoPageRoutingModule {}
