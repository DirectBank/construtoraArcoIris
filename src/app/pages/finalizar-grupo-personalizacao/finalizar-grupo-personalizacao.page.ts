import { PersonalizacoesService } from '../../services/personalizacoes/personalizacoes.service';
import { CustomAlertService } from '../../services/custom-alert/custom-alert.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { UtilService } from 'src/app/services/util/util.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-finalizar-grupo-personalizacao',
  templateUrl: './finalizar-grupo-personalizacao.page.html',
  styleUrls: ['./finalizar-grupo-personalizacao.page.scss'],
})

export class FinalizarGrupoPersonalizacaoPage implements OnInit {

  public id_grupoPersonalizacao = 0;
  public valorTotal = 0;
  public nomeGrupo = "";

  constructor(
    public personalizacoesService: PersonalizacoesService,
    public userService: UsuarioService,
    public alert: CustomAlertService,
    public utilService: UtilService,
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public router: Router,
  ) {
    this.valorTotal = parseFloat(this.router.getCurrentNavigation().extras.state.valorTotal);
    this.id_grupoPersonalizacao = parseFloat(this.router.getCurrentNavigation().extras.state.id_grupoPersonalizacao);
    this.nomeGrupo = this.router.getCurrentNavigation().extras.state.nomeGrupo;
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
  }

  back() {
    this.navCtrl.back();
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

  qtdParcela(valor) {
    if (valor <= 2500) return new Array(1);
    else if (valor > 2500 && valor <= 5000) return new Array(2);
    else if (valor > 5000 && valor <= 7500) return new Array(3);
    else if (valor > 7500) return new Array(4);
  }

  finalizarGrupo(parcelas, vencimento) {

    this.personalizacoesService.finalizarGrupo(this.id_grupoPersonalizacao, parcelas, vencimento).then(res => {
      this.alert.standardAlert("Sucesso", "Alterações salvas com sucesso.", "success");
      this.navCtrl.back();
    }).catch(err => {
      this.alert.standardAlert("Erro", "Algo deu errado e sua operação não foi registrada.", "fail");
    })

  }
}
