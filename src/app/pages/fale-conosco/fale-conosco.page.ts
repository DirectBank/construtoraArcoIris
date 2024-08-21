import { FaleConoscoService } from './../../services/fale-conosco/fale-conosco.service';
import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-fale-conosco',
  templateUrl: './fale-conosco.page.html',
  styleUrls: ['./fale-conosco.page.scss'],
})

export class FaleConoscoPage implements OnInit {

  public titulo: string;
  public mensagem: string = "";

  constructor(
    public faleConoscoService: FaleConoscoService,
    public userService: UsuarioService,
    public alert: CustomAlertService,
    public navCtrl: NavController,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  enviar() {
    this.faleConoscoService.enviarMensagem(this.mensagem)
      .then((res) => {
        this.alert.standardAlert("Sucesso", "Alterações salvas com sucesso.", "success");
        this.mensagem = "";
        this.back();
      })
      .catch(err => {
        console.log(err);
        this.alert.standardAlert("Erro", "Algo deu errado. Tente novamente mais tarde.", "fail");
      })
  }

  back() {
    this.router.navigate(["/tabs/tab2/home"]);
  }

  navTo(page) {
    let params: NavigationExtras = {
      state: {
      }
    }

    this.router.navigate([`/tabs/tab2/home/${page}`], params);
  }

}
