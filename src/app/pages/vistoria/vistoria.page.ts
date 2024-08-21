import { AreaVistoria, VistoriasService } from './../../services/vistorias/vistorias.service';
import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';
import { enterAnimation, leaveAnimation } from 'src/app/animations/modal-animations';
import { ImageViewerPage } from 'src/app/components/image-viewer/image-viewer.page';
import { IonContent, ModalController, NavController } from '@ionic/angular';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraDirection, CameraResultType, CameraSource, ImageOptions } from '@capacitor/camera';
import { EmpreendimentosService } from 'src/app/services/empreendimentos/empreendimentos.service';
import { ScreenOrientation } from '@capacitor/screen-orientation';


@Component({
  selector: 'app-vistoria',
  templateUrl: './vistoria.page.html',
  styleUrls: ['./vistoria.page.scss'],
})

export class VistoriaPage implements OnInit {

  @ViewChild('signatureCanvas', { static: false }) public signaturePad: SignaturePad;
  @ViewChild('mainscroll', { static: false }) public mainScroll: IonContent;

  private vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  private vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  public showSignaturePad: boolean;
  public disabledAssinarButton: boolean = true;
  public rotaColaborador: boolean = false;
  public signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': this.vw / 100 * 80,
    'canvasHeight': this.vh / 100 * 83
  };

  public id_vistoria: number = 0;

  public areasVistoria: AreaVistoria[] = [];
  public status = [
    "Selecione o status",
    "Aprovado",
    "Reprovado",
    "Aprovado com restrições",
  ]

  constructor(
    public empreendimentosService: EmpreendimentosService,
    public vistoriasService: VistoriasService,
    private modalController: ModalController,
    public userService: UsuarioService,
    public alert: CustomAlertService,
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  async ionViewDidEnter() {
    this.id_vistoria = parseInt(this.route.snapshot.paramMap.get('id_vistoria'));
    this.buscaAreasVistoria();
    // this.buscaAssinatura();
  }

  buscaAreasVistoria() {
    this.vistoriasService.buscaVistoria(this.id_vistoria).then((res: AreaVistoria[]) => {
      this.areasVistoria = res.map((area: any) =>{
        if(area.status == 1){
          area.icon = '../../assets/icons/circle-check-solid.svg';
        }else if(area.status == 2){
          area.icon = '../../assets/icons/ban-solid.svg';
        }else if(area.status == 3){
          area.icon = '../../assets/icons/triangle-exclamation-solid.svg';
        }
        return area
      });
      console.log(this.areasVistoria)
      this.disableAssinar();
      this.buscaAssinatura();
    }).catch(err => {
      this.alert.standardAlert("Erro", err.message, "fail");
    })
  }

  public imgAssinatura: any = false;
  async buscaAssinatura(){
    try{
      await this.empreendimentosService.buscaImagensFirebase( this.areasVistoria[0].urlArquivoAssinatura).then((res) => {
        console.log(res);
        this.imgAssinatura = res;
      }).catch(err => console.log(err))
    }catch(err){
      console.log(err);
    }
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        if(!(this.router.url.indexOf("tabs/tab2/home") > 0)){
          this.rotaColaborador = true;
        }else {
          this.rotaColaborador = false;
        }
      }
    })
  }

  back() {
    // this.router.navigate(["/tabs/tab2/home"]);
    this.navCtrl.back();
  }

  navTo(detalhe) {
    console.log(detalhe);
    
    let params: NavigationExtras = {
      state: {
        detalhe: detalhe,
        rotaColaborador: this.rotaColaborador
      }
    }
    if (this.rotaColaborador) {   
      this.router.navigate([`/home-colaborador/vistorias/vistoria/${detalhe.id_vistoria}/vistoria-detalhe`], params);
    }else {
      this.router.navigate([`tabs/tab2/home/vistoria/${detalhe.id_visotia}/vistoria-detalhe`], params);
    }
  }

  counter(i) {
    return new Array(i)
  }

  async abreImagem(url: string) {
    const modal = await this.modalController.create({
      component: ImageViewerPage,
      cssClass: 'custom-modal-img-viewer',
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation,
      componentProps: {
        urlImagem: url,
        titulo: "Imagem",
      }
    });
    modal.present();
  }

  // async adicionarFoto(area: AreaVistoria) {
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: true,
  //     presentationStyle: "popover",
  //     resultType: CameraResultType.Base64,
  //     source: CameraSource.Prompt,
  //     promptLabelCancel: "Cancelar",
  //     promptLabelHeader: "Origem da imagem",
  //     promptLabelPicture: "Tirar foto",
  //     promptLabelPhoto: "Escolher foto"
  //   });

  //   var imageUrl = image.base64String;
  //   this.vistoriasService.anexaImagem(area.id_vistoria, imageUrl).then(res => {
  //     this.buscaAreasVistoria();
  //     this.showSignaturePad = false;
  //   }).catch(err => console.log(err))
  // }

  // removeFoto(event, id_vistoria, url_firebase) {
  //   event.stopPropagation();
  //   this.alert.confirmationAlert({
  //     title: "Excluir foto",
  //     message: `Tem certeza que deseja exluir a imagem adicionada?`,
  //     okFunction: () => {
  //       console.log("apagar");
  //       this.vistoriasService.deletaImagem(id_vistoria, url_firebase).then(res => {
  //         this.buscaAreasVistoria();
  //         this.alert.standardAlert("Sucesso", "Imagem excluída com sucesso", "success");
  //       })
  //         .catch(err => {
  //           this.alert.standardAlert("Erro", "Algo deu errado.", "fail");
  //         })
  //     },
  //     cancelFunction: () => { },
  //   })
  // }

  disableAssinar() {
    this.disabledAssinarButton = false;
    this.areasVistoria.forEach((area) => {
       if(area.status == 2 || area.status == 0){
        this.disabledAssinarButton = true;
      }
    })
  }

  assinar() {
    this.mainScroll.scrollToTop(500)
    if (this.showSignaturePad) {
      this.alert.confirmationAlert({
        title: "Finalizar vistoria",
        message: `Tem certeza que deseja finalizar esta vistoria?`,
        okFunction: async () => {
          let signatureImage = this.signaturePad.toDataURL();
          signatureImage = await signatureImage.split(',')[1]
          this.vistoriasService.finalizaVistoria(this.id_vistoria, signatureImage).then(res => {
            this.buscaAreasVistoria();
            console.log(res);
            this.showSignaturePad = false;
          }).catch(err => console.log(err))
        },
        cancelFunction: () => { },
      })
    }
    else {
      this.showSignaturePad = true;
      // ScreenOrientation.lock({ orientation: 'landscape' });
    }
  }

  limparAssinatura() {
    // ScreenOrientation.lock({ orientation: 'portrait' });
    if (this.showSignaturePad) {
      this.showSignaturePad = false;
    }
    else {
      this.back();
    }
  }
}
