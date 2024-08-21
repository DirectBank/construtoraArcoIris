import { Component, Input, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'lgpd',
  templateUrl: './lgpd.page.html',
  styleUrls: ['./lgpd.page.scss'],
})
export class LgpdPage implements OnInit {

  @Input() aceite: boolean = false;

  public aceiteLgpd: boolean = false;
  public leuTudo: boolean = false;

  public termo = {
    descricao: "",
    titulo1: "",
    titulo2: "",
    id_lgpd: 0,
  }

  constructor(
    public authService: AuthenticationService,
    public userService: UsuarioService,
    public modalCtrl: ModalController,
    public alert: CustomAlertService,
    public utilService: UtilService,
    public modal: ModalController,
    private platform: Platform,
    public iab: InAppBrowser,
    private router: Router,
  ) {

  }

  ngOnInit() {
  }

  checkLgpd() {
    this.utilService.marcaCienciaLGPD(this.termo.id_lgpd)
      .then(async (res) => {
        this.alert.standardAlert("Sucesso", "Alterações salvas com sucesso", "success");
        this.modal.dismiss();
      })
      .catch((err) => {
        // this.modal.dismiss();
        this.alert.standardAlert("Erro", "Algo deu errado. Tente novamente mais tarde.", "fail");
      })
  }
  
  ionViewWillEnter() {
    if (!this.aceite) {
      this.platform.backButton.subscribeWithPriority(10, () => {
        this.sair();
      });
    }
  }

  ionViewDidEnter() {

    console.log(this.aceite)

    this.utilService.buscaLGPD()
      .then((res: any) => {
        console.log(res)
        this.termo.descricao = res.descricao;
        this.termo.titulo1 = res.titulo1;
        this.termo.titulo2 = res.titulo2;
        this.termo.id_lgpd = res.id_lgpd;
      })
      .catch(err => {
        this.alert.standardAlert("Erro", "Algo deu errado. Tente novamente mais tarde.", "fail");

      })

    if (!this.aceite) {
      document.querySelector('a').target = '_system'
      document.querySelector(".scroll-termos").addEventListener("scroll", (teste) => {
        // console.log(document.querySelector(".scroll-termos").scrollHeight - document.querySelector(".scroll-termos").scrollTop === document.querySelector(".scroll-termos").clientHeight)
        // console.log(document.querySelector(".scroll-termos").scrollHeight, document.querySelector(".scroll-termos").scrollTop, document.querySelector(".scroll-termos").clientHeight)
        let top = document.querySelector(".scroll-termos").scrollTop
        if (!this.leuTudo) {
          if ((document.querySelector(".scroll-termos").scrollHeight - Math.ceil(top) === document.querySelector(".scroll-termos").clientHeight) === true) {
            this.leuTudo = true
          }
        }
      }, false)
    }
  }

  fechar() {
    this.modalCtrl.dismiss();
  }

  sair() {
    this.fechar();
    this.authService.logout();
  }
}
