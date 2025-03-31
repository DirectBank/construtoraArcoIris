import { CustomLoaderService } from 'src/app/services/custom-loader/custom-loader.service';
import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { InfoRendimentoService } from 'src/app/services/info-rendimento/info-rendimento.service';

@Component({
  selector: 'app-info-rendimento',
  templateUrl: './info-rendimento.page.html',
  styleUrls: ['./info-rendimento.page.scss'],
})

export class InfoRendimentoPage implements OnInit {

  public infos: any = [];

  constructor(
    public toastController: ToastController,
    public customAlert: CustomAlertService,
    public infoRendimentoService: InfoRendimentoService,
    public userService: UsuarioService,
    public loader: CustomLoaderService,
    public router: Router,
  ) { }

  ionViewDidEnter(){
    this.infoRendimentoService.buscaRendimentosPendentes()
      .then((response: any) => {
        response = response.reduce((r, a) => {
          r[a.id_contrato] = r[a.id_contrato] || [];
          r[a.id_contrato].push(a);
          return r;
        }, Object.create(null));
        this.infos = Object.keys(response).map(key => response[key]);
        console.log(this.infos);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  ngOnInit() {
    
  }

  somaTotal(info){
    let total = 0;
    info.forEach(valor => {
      total += valor.valorPago;
    });
    return total;
  }

  back() {
    this.router.navigate([`/tabs`]);
  }

  counter(i) {
    return new Array(i)
  }

  navTo(page) {
    let params: NavigationExtras = {
      state: {
      }
    }

    this.router.navigate([`/tabs/tab2/home/${page}`], params);
  }
}