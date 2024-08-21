import { AreaVistoria, VistoriasService } from './../../services/vistorias/vistorias.service';
import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';
import { enterAnimation, leaveAnimation } from 'src/app/animations/modal-animations';
import { ImageViewerPage } from 'src/app/components/image-viewer/image-viewer.page';
import { IonContent, ModalController, NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomLoaderService } from 'src/app/services/custom-loader/custom-loader.service';

@Component({
  selector: 'app-vistoria-editar',
  templateUrl: './vistoria-editar.page.html',
  styleUrls: ['./vistoria-editar.page.scss'],
})

export class VistoriaEditarPage implements OnInit {

  // @ViewChild('signatureCanvas', { static: false }) public signaturePad: SignaturePad;
  // @ViewChild('mainscroll', { static: false }) public mainScroll: IonContent;
  @ViewChild('selectCliente', {static: false}) public selectCliente;
  @ViewChild('selectContrato', {static: false}) public selectContrato;

  // private vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  // private vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  // public showSignaturePad: boolean;
  // public signaturePadOptions: Object = {
  //   'minWidth': 2,
  //   'canvasWidth': this.vw,
  //   'canvasHeight': this.vh / 100 * 83
  // };

  public id_vistoria: number = 0;

  public areasVistoria: AreaVistoria[] = [];
  public status = [
    "Selecione o status",
    "Aprovado",
    "Reprovado",
    "Aprovado com restrições",
  ]

  // public novaVistoria: NovaVistoria = new NovaVistoria();
  public empreendimentos: any[];
  public clientes: any[];
  public contratos: any[];
  public areas: any[];
  public areasFiltered: any[];
  public novaVistoria: any = {
    id_empreendimento: 0,
    id_cliente: 0,
    id_contrato: 0
  };

  constructor(
    public load: CustomLoaderService,
    public vistoriasService: VistoriasService,
    private modalController: ModalController,
    public userService: UsuarioService,
    public alert: CustomAlertService,
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {
    this.vistoriasService.buscaEmpreendimentos().then((res: any[]) => {
      console.log(res);
      
      this.empreendimentos = res;
    }).catch(err => this.alert.standardAlert("Erro", "Não foi possível obter os empreendimentos", "fail"));
    this.buscaAreasVistoria();
  }

  buscaAreasVistoria() {
    this.vistoriasService.buscaAreasVistoria().then((res: any) => {
      this.areas = res.map((area) => {
        return {
          ...area,
          checked: false
        }
      });
      this.areasFiltered = this.areas;
      console.log(this.areas);
    })
    .catch(err => {
      this.alert.standardAlert("Erro", err.message, "fail");
    })
  }

  filterOpcoes(event) {
    const query = event.target.value.toLowerCase();
    console.log(event);
    
    this.areasFiltered = this.areas.filter(filtered => filtered.descricao.toLowerCase().indexOf(query) > -1);
  }

  salvar(){
    console.log(this.novaVistoria, this.areasFiltered);
    let lista = [];
    this.areas.forEach((area) => {
      if(area.isChecked){
        lista.push(area.id_areaVistoria);
      }
    })
    this.novaVistoria.lista = lista.join(';');
    // return
    this.vistoriasService.novaVistoria(this.novaVistoria).then(res => {
      console.log(res);
      this.back();
    }).catch(err => {
      this.alert.standardAlert("Erro",err.error.message,"fail")
      console.log(err);
    })
  }

  back() {
    // this.router.navigate(["/tabs/tab2/home"]);
    this.navCtrl.back();
  }
//////////////////////////////////////////////////////////////////////////////////////////
  empreendimentoChange(event) {
    // this.load.show();
    this.clientes = [];
    let value = event.detail.value;
    this.vistoriasService.buscaClientes(value).then((res: any[]) => {
      this.load.dismiss();
      this.clientes = res;
      console.log(this.selectCliente);
      this.selectCliente.value = null;
      this.selectContrato.value = null;
    }).catch(err => {
      this.alert.standardAlert("Erro", "Não foi possível obter os clientes", "fail")
      this.load.dismiss();
    });
  }

  clientesChange(id_empreendimento, event) {
    this.contratos = [];
    this.vistoriasService.buscaContratos(id_empreendimento, event.detail.value).then((res: any[]) => {
      this.selectContrato.value = null;
      this.contratos = res;
      if(res.length == 1){
        this.selectContrato.value = res[0].id_contrato;
      }
    }).catch(err => {
      this.alert.standardAlert("Erro", "Não foi possível obter os contratos", "fail")
    });
  }
}
