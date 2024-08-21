import { PersonalizacoesService } from '../../services/personalizacoes/personalizacoes.service';
import { GrupoPersonalizacao } from './../../services/personalizacoes/personalizacoes.service';
import { CustomAlertService } from '../../services/custom-alert/custom-alert.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { UtilService } from 'src/app/services/util/util.service';
import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grupos-personalizacoes',
  templateUrl: './grupos-personalizacoes.page.html',
  styleUrls: ['./grupos-personalizacoes.page.scss'],
})

export class GruposPersonalizacoesPage implements OnInit {

  public gruposPersonalizacoes: GrupoPersonalizacao[] = [];

  constructor(
    public personalizacoesService: PersonalizacoesService,
    public customAlert: CustomAlertService,
    public userService: UsuarioService,
    public utilService: UtilService,
    public router: Router,
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.personalizacoesService.buscaGrupos()
      .then(res => {
        this.gruposPersonalizacoes = res;
        console.log(res)
      })
      .catch(console.log)
    
  }

  groupBy = (items, key) => items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [
        ...(result[item[key]] || []),
        item,
      ],
    }),
    {},
  );

  back() {
    this.router.navigate([`/tabs/tab2/home`]);
  }

  navTo(page) {
    let params: NavigationExtras = {
      state: {
      }
    }

    this.router.navigate([`/tabs/tab2/home/${page}`], params);
  }
}
