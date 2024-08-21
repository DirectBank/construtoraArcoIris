// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { DocumentosService, Documento } from './../../services/documentos/documentos.service';
import { CustomLoaderService } from 'src/app/services/custom-loader/custom-loader.service';
import { CustomAlertService } from './../../services/custom-alert/custom-alert.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ToastController, Platform, NavParams, NavController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util/util.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Browser } from '@capacitor/browser';
// import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.page.html',
  styleUrls: ['./documentos.page.scss'],
})

export class DocumentosPage implements OnInit {

  // public fileTransfer: FileTransferObject = this.transfer.create();
  public documentos: Documento[] = [];
  public tipoDocumento: string = "";

  constructor(
    public documentosService: DocumentosService,
    public toastController: ToastController,
    public customAlert: CustomAlertService,
    public userService: UsuarioService,
    public loader: CustomLoaderService,
    public utilService: UtilService,
    // private transfer: FileSystem,
    // private fileOpener: FileOpener,
    public navCtrl: NavController,
    private route: ActivatedRoute,
    public iab: InAppBrowser,
    public router: Router,
    public file: File,
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      if (params && params.tipo) {
        this.tipoDocumento = params.tipo;
        if (this.tipoDocumento == "projetos") {
          this.documentosService.buscaProjetos().then((response: any) => {
            console.log(response);
            this.documentos = this.sortDocumentos(response);
          }).catch((err) => {
            console.log(err);
          });
        }
      }
      else {
        this.documentosService.buscaTodosDocumentos().then((response: any) => {
          console.log(response);
          this.documentos = this.sortDocumentos(response);
        }).catch((err) => {
          console.log(err);
        });   
      }
    });
  }

  sortDocumentos(documentos){
    documentos = documentos.reduce((r, a) => {
      r[a.tipoDocumento] = r[a.tipoDocumento] || [];
      r[a.tipoDocumento].push(a);
      return r;
    }, Object.create(null));
    documentos = Object.keys(documentos).map(key => documentos[key]);
    console.log(documentos);

    return documentos;
  }

  async downloadDocumento(documento) {
    if(documento?.hasUrl){
      // this.iab.create(documento.urlArquivo, '_system');
      Browser.open({url: documento.urlArquivo})
    }else {
      await this.documentosService.downloadDocumento(documento.urlArquivo).then(res => {
        console.log(res);
        documento.urlArquivo = res;
        documento.hasUrl = true;
        Browser.open({url: documento.urlArquivo})
      }).catch(err => {
        console.log(err);
      })
      // this.iab.create(documento.urlArquivo, '_system');
    }
  }

  back() {
    this.router.navigate([`/tabs/tab2`]);
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
