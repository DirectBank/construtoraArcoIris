import { CustomLoaderService } from 'src/app/services/custom-loader/custom-loader.service';
import { MeusDadosService } from './../../services/meus-dados/meus-dados.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { MeusDados } from 'src/app/services/meus-dados/meus-dados';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonSlides, NavController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util/util.service';
import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.page.html',
  styleUrls: ['./meus-dados.page.scss'],
})

export class MeusDadosPage implements OnInit {
  @ViewChild('meusDadosSlider', { static: false }) slider: IonSlides;
  titulo: string;
  public slideIndex: number = 0;
  public slideOpts = {
    slidesPerView: 1,
    centeredSlides: false,
    spaceBetween: 100,
    allowTouchMove: false,
    // slideNext:false,
  }

  public editarItemForm: FormGroup;
  public cep: string;
  constructor(
    public meusDadosService: MeusDadosService,
    public userService: UsuarioService,
    public loader: CustomLoaderService,
    private formBuilder: FormBuilder,
    public alert: CustomAlertService,
    public utilService: UtilService,
    public router: Router,
    public navCtrl: NavController

  ) {
    this.editarItemForm = this.formBuilder.group({
      id_usuario: new FormControl(''),
      nome: new FormControl({ value: "", disabled: true },),
      bloco: new FormControl({ value: "", disabled: true }),
      apto: new FormControl({ value: "", disabled: true }),
      endereco: new FormControl(''),
      cidade: new FormControl(''),
      cep: new FormControl(''),
      uf: new FormControl(''),
      bairro: new FormControl(''),
      mora_ac: new FormControl(''),
      tel: new FormControl(''),
      cel: new FormControl(''),
      // telResidecial: new FormControl(''),
      email: new FormControl(''),
      doc: new FormControl(''),
      rg: new FormControl(''),
    });
  }

  public meusDados: MeusDados = new MeusDados();

  ngOnInit() {

  }

  back() {
    this.navCtrl.back()
  }

  editarDados(meusDados?: MeusDados) {
    console.log(meusDados)
    this.editarItemForm.setValue({
      id_usuario: this.userService.getUsuario().id_contrato,
      nome: meusDados?.nome,
      bloco: meusDados?.bloco,
      apto: meusDados?.apto,
      endereco: meusDados?.endereco,
      cidade: meusDados?.cidade,
      cep: meusDados?.cep,
      uf: meusDados?.uf,
      bairro: meusDados?.bairro,
      mora_ac: meusDados?.mora_ac,
      tel: meusDados?.tel,
      cel: meusDados?.cel,
      // telResidecial: meusDados?.telResidecial,
      email: meusDados?.email,
      doc: meusDados?.doc,
      rg: meusDados?.rg
    });


    this.slider.getActiveIndex().then((index) => {

      if (index == 0) {
        this.slider.lockSwipeToNext(false);
        this.slider.slideTo(1);
        this.slider.lockSwipeToNext(true);
      }
    })
  }

  buscarCEP(ev) {
    let cep = ev.currentTarget.value;
    
    this.utilService.buscaCEP(cep)
      .then((res) => {
        // console.log(res);
        this.editarItemForm.patchValue({
          "endereco": res.logradouro ? res.logradouro : "" + ", " + res.bairro ? res.bairro : "",
          "cidade": res.localidade ? res.localidade : "",
          "uf": res.uf ? res.uf : "",
          "bairro": res.bairro ? res.bairro : ""

        })
        
      })
      .catch(err => {
        console.log(err);
        
      })

  }

  async atualizarDados() {
    Object.assign(this.meusDados, this.editarItemForm.value);

    await this.meusDadosService.atualizarMeusDados(this.meusDados)
      .then((response) => {
        
        this.alert.standardAlert("Sucesso", "Um email foi enviado para a administradora avaliar sua solicitação", "success");
        this.slider.lockSwipeToNext(false);
        this.slider.slideTo(0);
        this.slider.lockSwipeToNext(true);
      })
      .catch((erro) => {
        
        this.alert.standardAlert("Alerta! 😔", `Não foi possível realizar registro. ${erro.message ? erro.message : ""}`, "fail");
        console.log(erro);
      });
  }

}
