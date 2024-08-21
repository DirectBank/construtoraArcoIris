import { Comunicado, ComunicadosService } from './../../services/comunicados/comunicados.service';
import { CustomLoaderService } from 'src/app/services/custom-loader/custom-loader.service';
import { enterAnimation, leaveAnimation } from 'src/app/animations/modal-animations';
import { ComunicadoPage } from './../../components/comunicado/comunicado.page';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-comunicados',
  templateUrl: './comunicados.page.html',
  styleUrls: ['./comunicados.page.scss'],
})
export class ComunicadosPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public comunicados: Comunicado[] = [];

  public regInicio: number = 0;
  public regFim: number = 10;

  constructor(
    public comunicadosService: ComunicadosService,
    public modalController: ModalController,
    public userService: UsuarioService,
    public loader: CustomLoaderService,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.buscaComunicados()
  }

  back() {
    this.router.navigate([`/tabs`]);
  }

  loadData(event) {

    setTimeout(() => {
      console.log(event)
      event.target.complete();
      this.regInicio = this.regFim + 1;
      this.regFim = this.regFim + 10;
      this.comunicadosService.buscaComunicados(this.regInicio, this.regFim).then((response: any) => {
        this.comunicados = this.comunicados.concat(response);
        // console.log(response);
      }).catch((err) => {
        console.log(err);
      });

    }, 500);
  }

  async openComunicado(comunicado: Comunicado) {
    let msg: string;
    if(comunicado.tipo === '1' ||  comunicado.tipo === '3'){
      msg = comunicado.mensagemEmail;
    }else {
      msg = comunicado.mensagemPush;
    }
    this.marcarComoLida(comunicado.id_comunicado);
    const modal = await this.modalController.create({
      component: ComunicadoPage,
      cssClass: 'my-custom-menu',
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation,
      componentProps: {
        id_comunicado: comunicado.id_comunicado,
        titulo: comunicado.titulo,
        mensagem: msg,
      }
    });
    return await modal.present();
  }

  navTo(page) {
    let params: NavigationExtras = {
      state: {

      }
    }

    this.router.navigate([`/tabs/tab2/home/${page}`], params);
  }

  marcarComoLida(id_comunicado: number, ev?) {
    if (ev) {
      ev.stopPropagation();
    }

    this.comunicadosService.marcarComoLido(id_comunicado).then((res) => {
      this.buscaComunicados()
    }).catch(console.log)
  }

  buscaComunicados() {
    this.comunicadosService.buscaComunicados(this.regInicio, this.regFim).then((res: Comunicado[]) => {
      this.comunicados = res;
    }).catch(console.log)
  }
}
