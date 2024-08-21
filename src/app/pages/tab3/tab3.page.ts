import { EmpreendimentosService, EvolucaoEtapa, ImagemGaleria } from './../../services/empreendimentos/empreendimentos.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { PreviousRouteService } from 'src/app/services/previous-route/previous-route.service';
import { Documento, DocumentosService } from 'src/app/services/documentos/documentos.service';
import { CustomLoaderService } from 'src/app/services/custom-loader/custom-loader.service';
import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';
import { enterAnimation, leaveAnimation } from 'src/app/animations/modal-animations';
import { ImageViewerPage } from 'src/app/components/image-viewer/image-viewer.page';
import { ContratosService } from 'src/app/services/contratos/contratos.service';
import { PlanoPagamento } from './../../services/contratos/contratos.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ModalController, Platform, NavController } from '@ionic/angular';
import { Component, OnInit, Output, SecurityContext, EventEmitter, ElementRef } from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  @Output() imageLoaded: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  public planosPagamento: PlanoPagamento[] = [];
  public plantaHumanizada: Documento;
  public evolucao: EvolucaoEtapa[];
  public galeria: ImagemGaleria[] = [];
  public termoVistoria: Documento;
  public id_vistoria: number = 0;
  public contrato: Documento;
  public alturaDoPredio = 0;
  public urlMaps;
  public urlVideo;

  public isLoading = true;

  constructor(
    public empreendimentosService: EmpreendimentosService,
    public documentosService: DocumentosService,
    public authService: AuthenticationService,
    public contratosService: ContratosService,
    private modalController: ModalController,
    public customAlert: CustomAlertService,
    public prevRoute: PreviousRouteService,
    public userService: UsuarioService,
    public loader: CustomLoaderService,
    public menuService: MenuService,
    public sanitizer: DomSanitizer,
    public navCtrl: NavController,
    public iab: InAppBrowser,
    private router: Router,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.urlMaps = this.sanitizer.bypassSecurityTrustResourceUrl(
      "https://maps.google.com/maps?q=" +
      `${this.userService.getUsuario().endereco} ,${this.userService.getUsuario().numero}-${this.userService.getUsuario().bairro},${this.userService.getUsuario().cidade}&t=&z=15&ie=UTF8&iwloc=&output=embed`.toLocaleLowerCase().replace(/\s/g, '+')
    )
    this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.userService.getUsuario().urlEmpreendimento + '?controls=0'
    )
  }

  async ionViewWillEnter() {

    await this.documentosService.buscaContratos().then((response: any) => {
      console.log(response);
      if (response.length == 1) {
        this.contrato = response[0];
      }
    }).catch((err) => {
      console.log(err);
    });

    await this.documentosService.buscaTermosVistoria().then((response: any) => {
      console.log(response);
      if (response.length == 1) {
        this.termoVistoria = response[0];
      }
    }).catch((err) => {
      console.log(err);
    });

    await this.documentosService.buscaPlantas().then((response: any) => {
      console.log(response);
      if (response.length == 1) {
        this.plantaHumanizada = response[0];
      }
    }).catch((err) => {
      console.log(err);
    });

    await this.empreendimentosService.buscaImagens().then((res: ImagemGaleria[]) => {
      console.log(res);
      
      this.isLoading = false;
      this.galeria = res.map(img => {
        return {
          ...img,
          loading: true
        }
      });
      this.getImgFirebase();
    }).catch(console.log);

    await this.empreendimentosService.buscaVistoria().then((res: any) => {
      console.log(res);
      this.id_vistoria = res ? res.id_vistoria : null;
    }).catch(console.log);
  }

  ionViewDidEnter() {
    this.alturaDoPredio = this.userService.getUsuario().evolucao;
    this.contratosService.buscaPlanosDePagamento().then((res: PlanoPagamento[]) => {
      this.planosPagamento = res;
    }).catch(console.log)
    this.empreendimentosService.buscaEvolucao().then((res: EvolucaoEtapa[]) => {
      this.evolucao = res;
    }).catch(console.log)
  }

  async getImgFirebase(){
    for(let i=0; i<this.galeria.length; i++)
    await this.empreendimentosService.buscaImagensFirebase(this.galeria[i].urlArquivo).then((res:string) => {
      this.galeria[i].urlArquivo = res;
      this.galeria[i].loading = false;
    })
  }

  async abreImagem(urlArquivo: string, isGalery: boolean = false, startIndex: number = 1) {
    const modal = await this.modalController.create({
      component: ImageViewerPage,
      // cssClass: 'custom-modal-img-viewer',
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation,
      swipeToClose: true,
      componentProps: {
        urlImagem: urlArquivo,
        titulo: "Imagem",
        listaImagens: isGalery ? this.galeria.map(el => el.urlArquivo) : null,
        initialSlide: startIndex
      }
    });
    modal.present();
  }

  navTo(page, tipo: string = null) {
    let params: NavigationExtras = {
      state: {},
      queryParams: {},
    }

    if (tipo) {
      params.queryParams.tipo = tipo;
    }

    this.router.navigate([`/tabs/tab2/home/${page}`], params);
  }

  navToVistoria(id_vistoria) {
    let params: NavigationExtras = {
      state: {},
      queryParams: {},
    }

    this.router.navigate([`/home-colaborador/vistorias/vistoria/${id_vistoria}`], params);
  }

  back() {
    this.navCtrl.back()
  }

  // <!-- 0 = -4% -->
  // <!-- 100 = 67% -->
  // <!-- 0 = -70% -->
  // <!-- 100 = 0% -->
  labelHeight(value) {
    let min = -4;
    let max = 67;
    let interval = max - min;
    return min + (interval / 100 * value) + "%";
  }

  buildingHeight(value) {
    let min = -70;
    let max = 0;
    let interval = max - min;
    return min + (interval / 100 * value) + "%";
  }

  async downloadDocumento(documento) {
    this.iab.create(documento.urlArquivo, '_system');
  }

}
