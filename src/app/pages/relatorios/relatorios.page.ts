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

  async openRelatorioDevedor(tipo) {

    const oneYearBackward = new Date(new Date().setFullYear(new Date().getFullYear()-1)).toLocaleDateString();
    const today = new Date().toLocaleDateString();
    const oneYearFoward = new Date(new Date().setFullYear(new Date().getFullYear()+1)).toLocaleDateString();

    console.log(oneYearFoward);
    
    if (tipo == 'devedor') {
      // this.iab.create(`https://www.workoffice.com.br/Construtora/REL_analisePeriodicaNovaHTML.aspx?processo=1659466179693&ide=${this.userService.getUsuario().id_empresa}&usu=0&clienteCodigo=0&clienteNome=0&composicao=1&recebidos=1&receber=1&acordo=0&id_empreendimento=0&id_contrato=${this.userService.getUsuario().id_contrato }&cab=0`,`_system`);
      this.iab.create(`https://www.workoffice.com.br/Construtora/REL_devedorHTML.aspx?processo=1733163338382&dt1=01/01/1900&dt2=${today}&cli=${this.userService.getUsuario().id_cliente}&id_empreendimento=0&torre_bloco=&lBC=&dtBase=${today}&enc=1&st=0&ref=0&tiporel=1&_P=1733163338382&_LNG=0&__CTRL=bbBb.AbBb.BBbG.BbDb-AbEbEbDbEAFDbI|Et%2Fys2ZKI2A%3D|&__IDE=30&__WDT=1536`,`_system`)
    }
    else if (tipo == 'cobrancasReceber') {
      this.iab.create(`https://www.workoffice.com.br/Construtora/REL_areceber2HTML.aspx?processo=1733163140751&id_cliente=${this.userService.getUsuario().id_cliente}&id_contrato=0&dt1=${today}&dt2=${oneYearFoward}&banco=&id_empreendimento=0&torre=Todos&lBC=&ordem=0&forma=0&historico=&resumido=0&cheque=0&status=0&srv=0&_P=1733163140751&_LNG=0&__CTRL=bbBb.AbBb.BBbG.BbDb-AbEbEbDbEAFDbI|Et%2Fys2ZKI2A%3D|&__IDE=30&__WDT=1536`, '_system');
    }
    else if (tipo == 'recebidas') {
      this.iab.create(`https://www.workoffice.com.br/Construtora/REL_recebidasHTML.aspx?processo=1733163263438&id_cliente=${this.userService.getUsuario().id_cliente}&dt1=${oneYearBackward}&dt2=${today}&lBC=&id_empreendimento=0&id_contrato=0&formaBaixa=&torre=Todos&ordem=0&tipoData=1&composicao=0&cpfCnpj=0&semEmpreendimento=0&modulo=CONSTR&historico=&srv=0&status=0&enc=0&ctb=0&tbaixa=1&bco=1&bol=1&_P=1733163263438&_LNG=0&__CTRL=bbBb.AbBb.BBbG.BbDb-AbEbEbDbEAFDbI|Et%2Fys2ZKI2A%3D|&__IDE=30&__WDT=1536`, '_system');
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
