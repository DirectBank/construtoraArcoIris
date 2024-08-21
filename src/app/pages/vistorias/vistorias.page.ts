import { AdicionarVistoriaPage } from 'src/app/components/adicionar-vistoria/adicionar-vistoria.page';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Vistoria, VistoriasService } from 'src/app/services/vistorias/vistorias.service';
import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';
import { enterAnimation, leaveAnimation } from 'src/app/animations/modal-animations';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ModalController, ToastController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util/util.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-vistorias',
  templateUrl: './vistorias.page.html',
  styleUrls: ['./vistorias.page.scss'],
})

export class VistoriasPage implements OnInit {

 

  public vistorias: Vistoria[];
  public vistoriasFiltradas: Vistoria[];
  public empreendimentos: any[];

  constructor(
    public authService: AuthenticationService,
    public vistoriasService: VistoriasService,
    public toastController: ToastController,
    public customAlert: CustomAlertService,
    public userService: UsuarioService,
    public modalCtrl: ModalController,
    public utilService: UtilService,
    public router: Router,
  ) { }

  ionViewDidEnter() {
    this.buscaVistorias();
  }

  buscaVistorias() {
    this.vistoriasService.buscaVistorias().then((response: any) => {
      console.log(response);
      this.vistorias = response.map((vistoria:Vistoria) => {
        vistoria.searchName = `${vistoria.empreendimento} - ${vistoria.unidade} - ${vistoria.cliente}`;
        return vistoria
      });
      this.vistoriasFiltradas = this.vistorias;
      // this.empreendimentos = [...new Map(this.vistorias.map(item => [item["id_empreendimento"], item])).values()].map(el => {
      //   return { id_empreendimento: el.id_empreendimento, empreendimento: el.empreendimento }
      // });
      console.log(this.empreendimentos)
    }).catch((err) => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Código copiado para sua área de transferência',
      mode: "ios",
      cssClass: "custom-toast",
      duration: 2000,
      enterAnimation: enterAnimation
    });
    toast.present();
  }

  back() {
    this.authService.logout();
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

  async adicionarAgendamento() {
    // this.router.navigate(['home-colaborador/vistorias/vistoria-editar']);
    return
    const modal = await this.modalCtrl.create({
      component: AdicionarVistoriaPage,
      cssClass: 'my-custom-vistoria',
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation
    });
    modal.present();
    const { data } = await modal.onDidDismiss();
    if (data && data.shouldReload) {
      this.buscaVistorias();
    }
  }

  filter(event) {
    this.vistoriasFiltradas = [];
    let tempId = event.detail.value;
    if (tempId > 0) {
      this.vistoriasFiltradas = this.vistorias.filter(el => el.id_empreendimento == tempId);
    }
    else {
      this.vistoriasFiltradas = this.vistorias;
    }
  }

  filterOpcoes(event) {
    const query = event.target.value.toLowerCase();
    this.vistoriasFiltradas = this.vistorias.filter(filtered => filtered.searchName.toLowerCase().indexOf(query) > -1);
  }
}