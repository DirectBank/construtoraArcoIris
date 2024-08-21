import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: 'tabs', loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'login-colaborador', loadChildren: './pages/login-colaborador/login-colaborador.module#LoginColaboradorPageModule' },
  { path: 'home-colaborador', loadChildren: './pages/home-colaborador/home-colaborador.module#HomeColaboradorPageModule' },
  { path: 'esqueci-senha', loadChildren: './pages/esqueci-senha/esqueci-senha.module#EsqueciSenhaPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'personalizacao', loadChildren: () => import('./pages/personalizacao/personalizacao.module').then(m => m.PersonalizacaoPageModule) },
  // { path: 'vistoria', loadChildren: () => import('./pages/vistoria/vistoria.module').then(m => m.VistoriaPageModule) },
  // { path: 'vistorias', loadChildren: () => import('./pages/vistorias/vistorias.module').then(m => m.VistoriasPageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [
    AndroidPermissions,

  ],
})

export class AppRoutingModule { }