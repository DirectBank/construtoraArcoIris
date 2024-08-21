import { Alternativa } from './../../services/personalizacoes/personalizacoes.service';

import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';
import { FaleConoscoService } from '../../services/fale-conosco/fale-conosco.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationExtras, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonSlides, ModalController } from '@ionic/angular';
import { PersonalizacoesService } from 'src/app/services/personalizacoes/personalizacoes.service';
import { ImageViewerPage } from 'src/app/components/image-viewer/image-viewer.page';
import { enterAnimation, leaveAnimation } from 'src/app/animations/modal-animations';

@Component({
  selector: 'app-personalizacao',
  templateUrl: './personalizacao.page.html',
  styleUrls: ['./personalizacao.page.scss'],
})

export class PersonalizacaoPage implements OnInit {

  @ViewChild('alternativas', { static: false }) public slideAlternativas: IonSlides;

  public titulo: string;
  public id_personalizacao = 0;
  public fotoSelecionada = 0;
  public enqueteAlternativas: Alternativa[] = [];

  public slideOptsAlternativas = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400,
    spaceBetween: 20,
  };

  public slideOptsFotos = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 1000,
    spaceBetween: 10,
  };

  constructor(
    public personalizacoesService: PersonalizacoesService,
    private modalController: ModalController,
    public userService: UsuarioService,
    public alert: CustomAlertService,
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  async ionViewDidEnter() {
    this.id_personalizacao = parseInt(this.route.snapshot.paramMap.get('id_personalizacao'));
    this.buscaAlternativas();
  }

  ngOnInit() {
  }

  alternativasChange(event) {
  }

  fotosChange(event) {
    this.fotoSelecionada = event.target.swiper.activeIndex;
    event.stopPropagation();
  }

  generateParcelas(numParcelas) {
    return [...Array(numParcelas).keys()];
  }

  buscaAlternativas() {
    this.personalizacoesService.buscaAlternativas(this.id_personalizacao)
      .then(res => {
        this.enqueteAlternativas = res;
        console.log(res)
      })
      .catch(console.log)
  }

  back() {
    // this.router.navigate(["/tabs/tab2/home"]);
  }

  navTo(page) {
    let params: NavigationExtras = {
      state: {
      }
    }

    this.router.navigate([`/tabs/tab2/home/${page}`], params);
  }

  votar() {
    this.slideAlternativas.getActiveIndex().then(index => {

      let id_enqueteAlternativa = this.enqueteAlternativas[index].id_alternativa;
      let valor = this.enqueteAlternativas[index].valor;
      let votado = !!this.enqueteAlternativas[index].id_alternativaEscolhida

      console.log(valor)

      if (votado) {
        this.alert.confirmationAlert({
          title: "Escolher alternativa " + (index + 1),
          message: `R$ ${valor.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })} 
            \n Tem certeza que deseja escolher esta alternativa? `,
          okFunction: () => {
            this.personalizacoesService.alterarVoto({
              id_enquete: this.id_personalizacao,
              id_alternativaSelecionada: id_enqueteAlternativa,
            }).then(res => {
              this.alert.standardAlert("Sucesso", "Opção registrada com sucesso", "success");
              this.navTo("grupos-personalizacoes");
            }).catch(console.log)
          },
          cancelFunction: () => { },
        })
      }
      else {
        this.alert.confirmationAlert({
          title: "Escolher alternativa " + (index + 1),
          message: `R$ ${valor.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })} 
          \n Tem certeza que deseja escolher esta alternativa? `,
          okFunction: () => {
            this.personalizacoesService.votar({
              id_enquete: this.id_personalizacao,
              id_alternativaSelecionada: id_enqueteAlternativa,
            }).then(res => {
              this.alert.standardAlert("Sucesso", "Opção registrada com sucesso", "success");
              this.navTo("grupos-personalizacoes");
            }).catch(console.log)
          },
          cancelFunction: () => { },
        })
      }

    })

  }

  async abreImagem(listaURL: string[], startIndex: number = 1) {
    const modal = await this.modalController.create({
      component: ImageViewerPage,
      cssClass: 'custom-modal-img-viewer',
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation,
      componentProps: {
        urlImagem: listaURL[startIndex],
        titulo: "Imagem",
        listaImagens: listaURL,
        initialSlide: startIndex
      }
    });
    modal.present();
  }

}
