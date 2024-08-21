import { AreaVistoria, VistoriasService } from './../../services/vistorias/vistorias.service';
import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';
import { enterAnimation, leaveAnimation } from 'src/app/animations/modal-animations';
import { ImageViewerPage } from 'src/app/components/image-viewer/image-viewer.page';
import { IonContent, ModalController, NavController } from '@ionic/angular';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Camera, CameraDirection, CameraResultType, CameraSource, ImageOptions } from '@capacitor/camera';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmpreendimentosService } from 'src/app/services/empreendimentos/empreendimentos.service';
// import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-vistoria-detalhe',
  templateUrl: './vistoria-detalhe.page.html',
  styleUrls: ['./vistoria-detalhe.page.scss'],
})

export class VistoriaDetalhePage implements OnInit {
  @ViewChild('textarea') textarea: ElementRef;
  // @ViewChild('signatureCanvas', { static: false }) public signaturePad: SignaturePad;
  // @ViewChild('mainscroll', { static: false }) public mainScroll: IonContent;

  // private vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  // private vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  // public showSignaturePad: boolean;
  // public signaturePadOptions: Object = {
  //   'minWidth': 2,
  //   'canvasWidth': this.vw,
  //   'canvasHeight': this.vh / 100 * 83
  // };

  public id_vistoria: number = 0;
  public rotaColaborador: boolean = false;
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
    // private alertCtrl: AlertController
    private actionSheetController: ActionSheetController
  ) { }

  async ionViewDidEnter() {
    this.textarea.nativeElement.style.height = 'auto';
    this.textarea.nativeElement.style.height = `${this.textarea.nativeElement.scrollHeight}px`;
  }

  public detalhe
  ngOnInit() {
    let params = this.router.getCurrentNavigation();
    this.detalhe = params.extras.state.detalhe;
    this.rotaColaborador = this.detalhe.finalizada ? false : params.extras.state.rotaColaborador;
    // this.rotaColaborador = params.extras.state.rotaColaborador;
    // if(this.rotaColaborador){
    //   this.rotaColaborador = this.detalhe.finalizada ? false : this.rotaColaborador;
    // }
    this.detalhe.listaURL = this.detalhe.listaURL.map((img) => {
      return {
        url: img,
        loading: true
      }
    })
    this.getFirebase();
  }

  async getFirebase(){
    let lista = []
    for (let i = 0; i < this.detalhe.listaURL.length; i++) {
      try{
        this.detalhe.listaURL[i] = await this.getImage(this.detalhe.listaURL[i].url);
        // await this.empreendimentosService.buscaImagensFirebase( this.detalhe.listaURL[i].url).then((res) => {
        //   const url_firebase = this.detalhe.listaURL[i].url;
        //   lista.push({
        //     url: res,
        //     url_firebase: url_firebase,
        //     loading: false
        //   });
        // }).catch(err => console.log(err))
      }catch(err){
        console.log(err);
      }
    }
    // this.detalhe.listaURL = lista;
    // console.log(this.detalhe.listaURL);
  }

  async getImage(url){
    let dataReturn = {};
    const url_firebase = url;
    console.log(url_firebase);
    if(Object.prototype.toString.call(url_firebase) === '[object Object]'){
      return url_firebase
    }else{
      // await this.empreendimentosService.buscaImagensFirebase(url_firebase).then((res) => {
      //   // const url_firebase = this.detalhe.listaURL[i].url;
      //   dataReturn = {
      //     url: res,
      //     url_firebase: url_firebase,
      //     loading: false
      //   };
      // }).catch(err => console.log(err))
      // console.log(dataReturn);
      await this.empreendimentosService.buscaImgEspaco(url_firebase).then((res) => {
        // const url_firebase = this.detalhe.listaURL[i].url;
        dataReturn = {
          url: res,
          url_firebase: url_firebase,
          loading: false
        };
      }).catch(err => console.log(err))
      // console.log(dataReturn);
      return dataReturn
    }
  }
  async select() {
    let alert = await this.actionSheetController.create({
      // header: `Você gostaria de avaliar ${this.env.empresaAtual.appName} ?`,
      // subHeader: "Não vai demorar mais do que um minuto e ajuda a promover nosso aplicativo. Obrigado pelo seu apoio!",
      // mode: 'ios',
      cssClass: "custom-action-sheet",
      buttons: [
        {
          text: 'Tirar foto',
          // role: 'foto',
          handler: () => {
            this.tirarFoto();
          }
        },
        {
          text: 'Selecionar da galeria',
          // role: 'galeria',
          handler: () => {
            this.anexarFoto();
            
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Alerta cancelado');
          }
        }
      ]
    });
    await alert.present();
  }

  back() {
    // this.router.navigate(["/tabs/tab2/home"]);
    this.navCtrl.back();
  }

  navTo(page) {
    let params: NavigationExtras = {
      state: {
      }
    }

    this.router.navigate([`/tabs/tab2/home/${page}`], params);
  }

  counter(i) {
    return new Array(i)
  }

  async abreImagem(urlArquivo: string, isGalery: boolean = false, index: number = 0) {
    const modal = await this.modalController.create({
      component: ImageViewerPage,
      // cssClass: 'custom-modal-img-viewer',
      swipeToClose: true,
      // enterAnimation: enterAnimation,
      // leaveAnimation: leaveAnimation,
      componentProps: {
        urlImagem: urlArquivo,
        titulo: "Imagem",
        //@ts-ignore
        listaImagens: isGalery ? this.detalhe.listaURL.map(el => el.url) : null,
        initialSlide: index
      }
    });
    modal.present();
  }

  // public images = [];
  tirarFoto() {
    const options: ImageOptions = {
      quality: 80,
      saveToGallery: false,
      source: CameraSource.Camera,
      presentationStyle: 'popover',
      resultType: CameraResultType.Base64,
      direction: CameraDirection.Rear,

      correctOrientation: true
    }

    Camera.getPhoto(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData.base64String;
      this.detalhe.listaURL.push({
        url: base64Image,
        imgSrc: imageData.base64String,
        loading: false,
        // isNew: true
      })
      // this.novaEncomenda.imagem64 = imageData.base64String;
      // this.imageField.nativeElement.src = base64Image;
    }, (err) => {
      console.log(err)
    });
  }

  anexarFoto() {
    const options: ImageOptions = {
      quality: 80,
      saveToGallery: false,
      source: CameraSource.Photos,
      presentationStyle: 'popover',
      resultType: CameraResultType.Base64,
      direction: CameraDirection.Rear
    }

    Camera.getPhoto(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData.base64String;
      this.detalhe.listaURL.push({
        url: base64Image,
        imgSrc: imageData.base64String,
        loading: false,
        // isNew: true
      })
      // this.novaEncomenda.imagem64 = imageData.base64String;
      // this.imageField.nativeElement.src = base64Image;
    }, (err) => {
      console.log(err)
    });
  }

  // removeFoto(event, id_vistoria, url_firebase) {
  //   event.stopPropagation();
  //   this.alert.confirmationAlert({
  //     title: "Excluir foto",
  //     message: `Tem certeza que deseja exluir a imagem adicionada?`,
  //     okFunction: () => {
  //       console.log("apagar");
  //       this.vistoriasService.deletaImagem(id_vistoria, url_firebase).then(res => {
  //         // this.buscaAreasVistoria();
  //         this.alert.standardAlert("Sucesso", "Imagem excluída com sucesso", "success");
  //       }).catch(err => {
  //         this.alert.standardAlert("Erro", "Algo deu errado.", "fail");
  //       })
  //     },
  //     cancelFunction: () => { },
  //   })
  // }

  salvar() {
    const vistoria = {
      id_vistoria: this.detalhe.id_vistoria,
      status: this.detalhe.status,
      descricao: this.detalhe.descricao
    }
    // console.log(this.detalhe);
    this.vistoriasService.upateAreaVistoria(vistoria).then(res => {
      this.detalhe.listaURL.forEach(element => {
        if(element.imgSrc){
          this.vistoriasService.anexaImagem(vistoria.id_vistoria, element.imgSrc).then(res => {
          }).catch(err => {
            console.log(err.message);
          })
        }
      });
      this.back();
    }).catch(err => {
      console.log(err);
      this.alert.standardAlert('Erro', err.error.message, 'fail');
    })
    return
    this.alert.confirmationAlert({
      title: "Finalizar vistoria",
      message: `Deseja concluir essa vistoria!`,
      okFunction: async () => {
        this.vistoriasService.upateAreaVistoria(vistoria).then(res => {
          console.log(res);
          this.detalhe.listaURL.forEach(element => {
            if(element.imgSrc){
              this.vistoriasService.anexaImagem(vistoria.id_vistoria, element.imgSrc).then(res => {
              }).catch(err => {
                console.log(err);
              })
            }
          });
          this.back();
        }).catch(err => console.log(err))
      },
      cancelFunction: () => { },
    })
    // }
    // else {
    //   this.showSignaturePad = true;
    // }
  }

  // limparAssinatura() {
  //   if (this.showSignaturePad) {
  //     this.showSignaturePad = false;
  //   }
  //   else {
  //     this.back();
  //   }
  // }

  deleteImg(event, img,i){
    event.stopPropagation();
    console.log(img);
    if(img.imgSrc) {
      this.detalhe.listaURL.splice(i,1);
    }else {
      this.vistoriasService.deletaImagem(this.detalhe.id_vistoria, img.url_firebase).then(res => {
        // this.buscaAreasVistoria();
        this.detalhe.listaURL.splice(i,1);
        // this.alert.standardAlert("Sucesso", "Imagem excluída com sucesso", "success");
      }).catch(err => {
        this.alert.standardAlert("Erro", "Algo deu errado.", "fail");
      })
    }
  }

  ajustarAlturaTextarea(event: Event): void {
    const textarea = this.textarea.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
