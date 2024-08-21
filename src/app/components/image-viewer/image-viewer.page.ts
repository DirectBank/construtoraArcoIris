import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { NavParams, ModalController } from '@ionic/angular';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.page.html',
  styleUrls: ['./image-viewer.page.scss'],
})

export class ImageViewerPage implements OnInit {

  @ViewChild("slides") slides!: any;

  public imagem: any;
  @Input('listaImagens') listaImagens: string[];
  @Input('initialSlide') initialSlide: number;
  public slideOpts = {
    // slidesPerView: 1,
    // gap: 10,
    // initialSlide: this.initialSlide,
    // speed: 400
  };

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public userService: UsuarioService,
  ) { }

  ionViewDidEnter() {
    this.slides.update();
  }

  ionViewWillEnter() {
    this.slides.slideTo(this.initialSlide);
  }

  ngOnInit() {
    if (this.navParams.get('urlImagem')) {

      this.imagem = this.navParams.get('urlImagem');
    }

  }

  fechar() {
    this.modalCtrl.dismiss();
  }

  preloaderTransition(index) {
    let ref1: HTMLElement = document.getElementById("preloader_" + index)
    ref1.style.opacity = '0';
    ref1.style.visibility = 'hidden';
    let ref2: HTMLElement = document.getElementById("capa_" + index)
    ref2.style.opacity = '1';
  }

}
