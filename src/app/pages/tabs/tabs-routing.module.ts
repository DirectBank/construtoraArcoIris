import { HomePage } from './../home/home.page';
import { Tab2Page } from './../tab2/tab2.page';
import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { CheckRoute } from 'src/app/services/check-route/check-route.service';
// import { CheckRoute } from 'src/app/services/check-route/check-route.service';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab2',
        // loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule),
        children: [
          {
            path: '',
            loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule),
            // component: Tab2Page
          },
          {
            path: 'home',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
            // component: HomePage
          }
        ]
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule),
        canActivate: [CheckRoute]
      },
      {
        path: 'select-contrato',
        loadChildren: () => import('../select-contrato/select-contrato.module').then(m => m.SelectContratoPageModule)
      },
      {
        path: '',
        redirectTo: 'tab2',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tab2',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [CheckRoute]
})
export class TabsPageRoutingModule { }
