import { EmpreendimentosService } from 'src/app/services/empreendimentos/empreendimentos.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { PreviousRouteService } from '../../services/previous-route/previous-route.service';
import { CustomLoaderService } from 'src/app/services/custom-loader/custom-loader.service';
import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';
import { ImagemGaleria } from '../../services/empreendimentos/empreendimentos.service';
import { enterAnimation, leaveAnimation } from 'src/app/animations/modal-animations';
import { ImageViewerPage } from 'src/app/components/image-viewer/image-viewer.page';
import { transition, trigger, style, animate, state } from '@angular/animations';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { IonSlides, Platform, ModalController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MenuService } from '../../services/menu/menu.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Device } from '@ionic-native/device/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home-colaborador',
  templateUrl: 'home-colaborador.page.html',
  styleUrls: ['home-colaborador.page.scss'],
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

export class HomeColaboradorPage implements OnInit {

  @ViewChild('quickAccess', { static: false }) public slider: IonSlides;

  public slideOpts = {
    initialSlide: 0,
    slidesPerView: 3,
    speed: 400,
    spaceBetween: 20,
  };

  public evolucaoEmpreendimento: number = 0;
  public galeria: ImagemGaleria[];

  constructor(
    public authService: AuthenticationService,
    private modalController: ModalController,
    public customAlert: CustomAlertService,
    public userService: UsuarioService,
    public menuService: MenuService,
    public sanitizer: DomSanitizer,
    public storage: Storage,
    private router: Router,
  ) {

  }

  ionViewWillEnter() {
  }

  async ngAfterViewInit() {
  }

  async ngOnInit() {
  }

  async abreImagem(urlArquivo: string, isGalery: boolean = false, startIndex: number = 1) {
    const modal = await this.modalController.create({
      component: ImageViewerPage,
      cssClass: 'custom-modal-img-viewer',
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation,
      componentProps: {
        urlImagem: urlArquivo,
        titulo: "Imagem",
        listaImagens: isGalery ? this.galeria.map(el => el.urlArquivo) : null,
        initialSlide: startIndex
      }
    });
    modal.present();
  }

  navTo(page) {
    let params: NavigationExtras = {
      state: {

      }
    }

    this.router.navigate([`/tabs/tab2/${page}`], params);
  }

}

