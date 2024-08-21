import { ImagemGaleria } from './../../services/empreendimentos/empreendimentos.service';
import { ContratosService } from './../../services/contratos/contratos.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { PreviousRouteService } from './../../services/previous-route/previous-route.service';
import { Router, NavigationStart, NavigationEnd, NavigationExtras } from '@angular/router';
import { CustomLoaderService } from 'src/app/services/custom-loader/custom-loader.service';
import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';
import { enterAnimation, leaveAnimation } from 'src/app/animations/modal-animations';
import { ImageViewerPage } from 'src/app/components/image-viewer/image-viewer.page';
import { transition, trigger, style, animate, state } from '@angular/animations';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { IonSlides, Platform, ModalController } from '@ionic/angular';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MenuService } from '../../services/menu/menu.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Device } from '@ionic-native/device/ngx';
import { Storage } from '@ionic/storage';
import { EmpreendimentosService } from 'src/app/services/empreendimentos/empreendimentos.service';
import { VistoriasService } from 'src/app/services/vistorias/vistorias.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'scale(0.01)'
        }),
        animate('0.5s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s 0.1s ease-out', style({
          opacity: 0,
          transform: 'scale(1)'
        }))
      ])
    ])
  ]
})

export class HomePage implements OnInit {

  @ViewChild('quickAccess', { static: false }) public slider: IonSlides;
  @ViewChild('galeriaSlider', { static: false }) public galeriaSlider: IonSlides;

  public slideOpts = {
    initialSlide: 0,
    slidesPerView: 2,
    speed: 400,
    spaceBetween: 20,
  };

  public evolucaoEmpreendimento: number = 0;
  public galeria: any[]= [];
  public galeriaNew = [];
  // public galeria: ImagemGaleria[]= [];

  constructor(
    public vistoriasService: VistoriasService,
    public empreendimentosService: EmpreendimentosService,
    public authService: AuthenticationService,
    private modalController: ModalController,
    public customAlert: CustomAlertService,
    public prevRoute: PreviousRouteService,
    public userService: UsuarioService,
    public loader: CustomLoaderService,
    public menuService: MenuService,
    public sanitizer: DomSanitizer,
    public platform: Platform,
    public iab: InAppBrowser,
    public storage: Storage,
    private router: Router,
    public device: Device,
  ) {

  }

  ionViewWillEnter() {
    this.empreendimentosService.buscaImagens(261).then((res: ImagemGaleria[]) => {
      // let mesMok = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

      // res = res.map((res) => {
      //   return {
      //     ...res,
      //     mesano: res.mesano.split('-')
      //   }
      // });
      // mesMok.forEach((mes) => {
      //   let mok = []
      //   res.forEach((mes2,i) => {
      //     if(mes2.mesano[0] === mes){
      //       mok.push(mes2)
      //     }
      //     })
      //     if(mok.length > 0){
      //       //@ts-ignore
      //       this.galeria.push(mok)
      //     }
      // });

      console.log(res);
      this.galeriaNew = res;
      // this.galeria = res;
      // this.galeria = this.galeria.reduce((r, a) => {
      //   r[a.mesano] = r[a.mesano] || [];
      //   r[a.mesano].push(a);
      //   return r;
      // }, Object.create(null));
      // this.galeria = Object.keys(this.galeria).map(key => this.galeria[key]);
      // this.galeria.reverse();
      // //@ts-ignore
      // // this.galeria.map(array => array.reverse());
      // this.galeria.reverse();
      // console.log(this.galeria);
      // console.log(this.galeria[0][0].mesano);

      this.getFirebase()
    }).catch(console.log)
  }

  async ngAfterViewInit() {
  }

  async ngOnInit() {
  }

  async getFirebase(){
    for (let i = 0; i < this.galeriaNew.length; i++) {
      // console.log(this.galeriaNew[i]);
      try{
        await this.empreendimentosService.buscaImagensFirebase( this.galeriaNew[i].urlArquivo).then((res) => {
          // console.log(res);

          this.galeriaNew[i].urlArquivo = res;
          this.galeriaNew[i].loading = false;

        }).catch(err => console.log(err))
      }catch(err){
        console.log(err);
      }
    }
    // this.galeria.map(array => {
    //   array.map(obj => {
    //     this.empreendimentosService.buscaImagensteste( obj.urlArquivo).then((res) => {
    //       console.log(res);

    //       obj.urlArquivo = res;
    //       obj.loading = false;
    //       console.log(obj);

    //     })
    //   })
    // })
    // for (let index = 0; index < this.galeria.length; index++) {
    //   // console.log(this.galeria[0][index]);

    //   for (let i = 0; i < this.galeria[index].length; i++) {
    //     // console.log(this.galeria[index][i]);
    //     try{
    //       await this.empreendimentosService.buscaImagensFirebase( this.galeria[index][i].urlArquivo).then((res) => {
    //         // console.log(res);

    //         this.galeria[index][i].urlArquivo = res;
    //         this.galeria[index][i].loading = false;

    //       }).catch(err => console.log(err))
    //     }catch(err){
    //       console.log(err);
    //     }
    //   }
    // }
  }

  async abreImagem(urlArquivo: string, isGalery: boolean = false, index: number = 0) {
    const modal = await this.modalController.create({
      component: ImageViewerPage,
      // cssClass: 'custom-modal-img-viewer',
      swipeToClose: true,
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation,
      componentProps: {
        urlImagem: urlArquivo,
        titulo: "Imagem",
        //@ts-ignore
        listaImagens: isGalery ? this.galeriaNew.map(el => el.urlArquivo) : null,
        initialSlide: index
      }
    });
    modal.present();
  }

  navTo(page, tipo: string = null) {
    console.log("to aqui no home", tipo);

    let params: NavigationExtras = {
      state: {},
      queryParams: {}
    }

    if (tipo) {
      params.queryParams.tipo = tipo;
      this.router.navigate([`/tabs/tab2/home/${page}`], params);
    }else {
      this.router.navigate([`/tabs/tab2/${page}`], params);
    }

  }

  navVistoria(){
    this.vistoriasService.buscaVistoriaCliente(this.userService.getContratoId()).then((res) =>{
      console.log(res);  
      this.router.navigate([`tabs/tab2/home/vistoria/${res[0].id_vistoria}`])
    }).catch(err => {
      console.log(err);
    })
  }

}

