import { CustomComponentModule } from './../../components/custom-components.module';
import { Routes, RouterModule } from '@angular/router';
import { Device } from '@ionic-native/device/ngx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { HomePage } from './home.page';

const routes: Routes = [
  { path: '', component: HomePage },
  // { path: 'personalizacoes',loadChildren: () => import('../personalizacoes/personalizacoes.module').then(m => m.PersonalizacoesPageModule) },
  { path: 'grupos-personalizacoes', loadChildren: () => import('../grupos-personalizacoes/grupos-personalizacoes.module').then(m => m.GruposPersonalizacoesPageModule) },
  { path: 'agendamentos', loadChildren: () => import('../agendamentos/agendamentos.module').then(m => m.AgendamentosPageModule) },
  { path: 'fale-conosco', loadChildren: () => import('../fale-conosco/fale-conosco.module').then(m => m.FaleConoscoPageModule) },
  { path: 'comunicados', loadChildren: () => import('../comunicados/comunicados.module').then(m => m.ComunicadosPageModule) },
  { path: 'documentos', loadChildren: () => import('../documentos/documentos.module').then(m => m.DocumentosPageModule) },
  { path: 'meus-dados', loadChildren: () => import('../meus-dados/meus-dados.module').then(m => m.MeusDadosPageModule) },
  { path: 'boletos', loadChildren: () => import('../boletos/boletos.module').then(m => m.BoletosPageModule) },
  { path: 'info-rendimento', loadChildren: () => import('../info-rendimento/info-rendimento.module').then(m => m.InfoRendimentoPageModule) },
  { path: 'relatorios', loadChildren: () => import('../relatorios/relatorios.module').then(m => m.RelatoriosPageModule) },
  { path: 'finalizar-grupo-personalizacao', loadChildren: () => import('./../finalizar-grupo-personalizacao/finalizar-grupo-personalizacao.module').then(m => m.FinalizarGrupoPersonalizacaoPageModule) },
  { path: 'vistorias', loadChildren: () => import('../vistorias/vistorias.module').then(m => m.VistoriasPageModule) },
  {
    path: 'vistoria',
    loadChildren: () => import('../vistoria/vistoria.module').then(m => m.VistoriaPageModule)
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomComponentModule,
    [RouterModule.forChild(routes)]
  ],
  providers: [
    Device,
  ],
  declarations: [
    HomePage,
  ],
})
export class HomePageModule { }
