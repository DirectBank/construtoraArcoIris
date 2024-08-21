import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { NgCalendarModule  } from 'ionic2-calendar';
import { registerLocaleData } from '@angular/common';

import localeDe from '@angular/common/locales/br';
registerLocaleData(localeDe);

import { AgendamentosPage } from './agendamentos.page';

const routes: Routes = [
  { path: '', component: AgendamentosPage },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AgendamentosPage],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class AgendamentosPageModule { }
