import { CustomLoaderService } from 'src/app/services/custom-loader/custom-loader.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { NovaVistoria, VistoriasService } from 'src/app/services/vistorias/vistorias.service';
import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { NavParams, ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-adicionar-vistoria',
  templateUrl: './adicionar-vistoria.page.html',
  styleUrls: ['./adicionar-vistoria.page.scss'],
})

export class AdicionarVistoriaPage implements OnInit {

  public customActionSheetOptions: any = {
    // header: 'Tipo de visita',
    // subHeader: 'Selecione o tipo de visita'
  };

  public novaVistoria: NovaVistoria = new NovaVistoria();
  public empreendimentos: any[];
  public clientes: any[];
  public contratos: any[];

  constructor(
    public vistoriasService: VistoriasService,
    public authService: AuthenticationService,
    public modalController: ModalController,
    public userService: UsuarioService,
    public modalCtrl: ModalController,
    public alert: CustomAlertService,
    public load: CustomLoaderService,
    public navParams: NavParams,
    public router: Router,
  ) { }

  ngOnInit() {
    this.vistoriasService.buscaEmpreendimentos().then((res: any[]) => {
      this.empreendimentos = res;
    }).catch(err => this.alert.standardAlert("Erro", "Não foi possível obter os empreendimentos", "fail"));
  }

  empreendimentoChange(event) {
    // this.load.show();
    this.clientes = [];
    let value = event.detail.value;
    this.vistoriasService.buscaClientes(value).then((res: any[]) => {
      this.load.dismiss();
      this.clientes = res;
    }).catch(err => {
      this.alert.standardAlert("Erro", "Não foi possível obter os clientes", "fail")
      this.load.dismiss();
    });
  }

  clientesChange(id_empreendimento, event) {
    this.contratos = [];
    this.vistoriasService.buscaContratos(id_empreendimento, event.detail.value).then((res: any[]) => {
      this.contratos = res;
    }).catch(err => {
      this.alert.standardAlert("Erro", "Não foi possível obter os contratos", "fail")
    });
  }

  ionViewDidEnter() {
    // this.vistoriasService.buscaTiposvistoria()
    //   .then((res: any) => {
    //     console.log(res)
    //     this.tiposvistoria = res;
    //   })
    //   .catch(console.log)
  }

  cadastrar() {
    this.vistoriasService.novaVistoria(this.novaVistoria)
      .then((res) => {
        this.alert.standardAlert("Sucesso", "Alterações salvas com sucesso.", "success");
        this.fechar(true);
      })
      .catch(err => {
        console.log(err);
        this.alert.standardAlert("Erro", err.error.message, "fail");
        this.fechar(false);
      })

    let params: NavigationExtras = {
      state: {
      }
    }
    // this.router.navigate([`/vistoria`], params);
    // this.fechar();

  }

  fechar(shouldReload: boolean = false) {
    this.modalCtrl.dismiss({ shouldReload: shouldReload });
  }

}
