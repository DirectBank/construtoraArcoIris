import { DocumentosService, Documento } from '../../services/documentos/documentos.service';
import { CustomLoaderService } from 'src/app/services/custom-loader/custom-loader.service';
import { CustomAlertService } from '../../services/custom-alert/custom-alert.service';
import { ToastController, Platform, NavParams, NavController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { UtilService } from 'src/app/services/util/util.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.page.html',
  styleUrls: ['./relatorios.page.scss'],
})

export class RelatoriosPage implements OnInit {

  constructor(
    public documentosService: DocumentosService,
    public toastController: ToastController,
    public customAlert: CustomAlertService,
    public userService: UsuarioService,
    public loader: CustomLoaderService,
    public utilService: UtilService,
    public navCtrl: NavController,
    private route: ActivatedRoute,
    public iab: InAppBrowser,
    public router: Router,
    public file: File,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
  }

  async downloadRelatorio(tipo: "informe-rendimento" | "plano-pagamento") {

    if (tipo == 'plano-pagamento') {
      this.iab.create(`https://www.workoffice.com.br/Construtora/REL_analisePeriodicaNovaHTML.aspx?processo=1659466179693&ide=${this.userService.getUsuario().id_empresa}&usu=0&clienteCodigo=0&clienteNome=0&composicao=1&recebidos=1&receber=1&acordo=0&id_empreendimento=0&id_contrato=${this.userService.getUsuario().id_contrato }&cab=0`,`_system`);
      // this.iab.create(`https://www.workoffice.com.br/Construtora/REL_analisePeriodicaPDF.aspx?processo=1659466179693&ide=${this.userService.getUsuario().id_empresa}&usu=0&clienteCodigo=0&clienteNome=0&composicao=1&recebidos=1&receber=1&acordo=0&id_empreendimento=0&id_contrato=${this.userService.getUsuario().id_contrato }`, '_system');
    }
    else if (tipo == 'informe-rendimento') {
      this.iab.create(`https://www.workoffice.com.br/algumacoisa`, '_system');
    }

  }

  back() {
    this.router.navigate([`/tabs/tab2`]);
  }

  navTo(page) {
    let params: NavigationExtras = {
      state: {
      }
    }

    this.router.navigate([`/tabs/tab2/home/${page}`], params);
  }


  //https://www.workoffice.com.br/Construtora/REL_analisePeriodicaNovaHtml.aspx?processo=1659016091996&clienteCodigo=00000024&clienteNome=BRUCE%20WAYNE&composicao=1&recebidos=1&receber=1&acordo=0&id_empreendimento=0&id_contrato=58775
}
