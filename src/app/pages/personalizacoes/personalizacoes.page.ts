import { PersonalizacoesService, Personalizacao } from './../../services/personalizacoes/personalizacoes.service';
import { DocumentosService, Documento } from '../../services/documentos/documentos.service';
import { CustomLoaderService } from 'src/app/services/custom-loader/custom-loader.service';
import { CustomAlertService } from '../../services/custom-alert/custom-alert.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ToastController, Platform, NavParams } from '@ionic/angular';
import { UtilService } from 'src/app/services/util/util.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-personalizacoes',
  templateUrl: './personalizacoes.page.html',
  styleUrls: ['./personalizacoes.page.scss'],
})

export class PersonalizacoesPage implements OnInit {

  public id_grupoPersonalizacao = 0;
  public personalizacoes: Personalizacao[] = [];

  constructor(
    public personalizacoesService: PersonalizacoesService,
    public toastController: ToastController,
    public customAlert: CustomAlertService,
    public userService: UsuarioService,
    public utilService: UtilService,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter() {

    this.id_grupoPersonalizacao = parseInt(this.route.snapshot.paramMap.get('id_grupoPersonalizacao'));

    this.personalizacoesService.buscaPersonalizacoes(this.id_grupoPersonalizacao)
      .then(res => {
        this.personalizacoes = res;
        console.log(res)
      })
      .catch(console.log)

  }

  back() {
    this.router.navigate([`/tabs/tab2/home/grupos-personalizacoes`]);
  }

  counter(i) {
    return new Array(i)
  }

  navTo(page) {
    let params: NavigationExtras = {
      state: {
      }
    }

    this.router.navigate([`/tabs/tab2/home/${page}`], params);
  }

  todosVotados() {
    return !!this.personalizacoes.every((el) => el.votado == 1);
  }

  finalizarGrupo() {
    console.log(this.personalizacoes.reduce((acc, curr) => acc += curr.valorVotado, 0))
    let params: NavigationExtras = {
      state: {
        nomeGrupo: this.personalizacoes[0].grupoEnquete,
        id_grupoPersonalizacao: this.id_grupoPersonalizacao,
        valorTotal: this.personalizacoes.reduce((acc, curr) => acc += curr.valorVotado, 0)
      }
    }

    this.router.navigate([`/tabs/tab2/home/finalizar-grupo-personalizacao`], params);
  }
}
