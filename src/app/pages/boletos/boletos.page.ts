import { CustomLoaderService } from 'src/app/services/custom-loader/custom-loader.service';
import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';
import { BoletosService, Cobranca } from './../../services/boletos/boletos.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { enterAnimation } from 'src/app/animations/toast-animations';
import { UtilService } from 'src/app/services/util/util.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NavigationExtras, Router } from '@angular/router';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-boletos',
  templateUrl: './boletos.page.html',
  styleUrls: ['./boletos.page.scss'],
})

export class BoletosPage implements OnInit {

  public boletos: Cobranca[];

  constructor(
    public toastController: ToastController,
    public customAlert: CustomAlertService,
    public boletosService: BoletosService,
    public userService: UsuarioService,
    public loader: CustomLoaderService,
    public utilService: UtilService,
    private fileOpener: FileOpener,
    public clipboard: Clipboard,
    public iab: InAppBrowser,
    public router: Router,
  ) { }

  ionViewDidEnter(){
    this.boletosService.buscaBoletosPendentes().then((response: any) => {
      console.log(response);
      this.boletos = response;
    }).catch((err) => {
      console.log(err);
      
    });
  }

  ngOnInit() {
    
  }

  sendToClipboard(text: string) {
    this.clipboard.copy(text);
    this.presentToast();
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

  compareDates(date) {
    let parts = date.split('/') // separa a data pelo caracter '/'
    let today = new Date()      // pega a data atual
    date = new Date(parts[2], parts[1] - 1, parts[0]) // formata 'date'
    // console.log(date, today)

    // compara se a data informada é maior que a data atual
    // e retorna true ou false
    return date >= today ? true : false
  }

  async downloadBoleto(boleto: Cobranca) {

    let URL;

    if (this.compareDates(boleto.vcto)) {
      URL = `https://workoffice.com.br/Cobranca/APP_boletoPDF.aspx?&id=${boleto.id_bureau}`;
    }
    else {
      var formatter = new Intl.DateTimeFormat('pt-BR');
      var date = new Date();
      URL = `https://workoffice.com.br/Cobranca/APP_boletoPDF.aspx?&id=${boleto.id_bureau}&novoVcto=${formatter.format(date)}`;
    }
    const browser = this.iab.create(URL, '_system');
  }

  back() {
    this.router.navigate([`/tabs`]);
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
}