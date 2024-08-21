import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UsuarioDAO } from './Usuario';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private usuario: UsuarioDAO[];
  private indexContratoSelecionado = 0;

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private router: Router,
  ) { }

  public getContratos() {
    return this.usuario;
  }

  public getUsuario() {
    let retorno;
    try {
      retorno = this.usuario[this.indexContratoSelecionado];
      return retorno;
    }
    catch (e) {

      // this.navCtrl.setDirection('root');
      setTimeout(() => {
        this.setUsuario(null);
        this.storage.remove("ACCESS_TOKEN");
        this.router.navigate(['']);

      }, 500);
      return {
        senha: 0,
        id_cliente: 0,
        id_empresa: 0,
        id_contrato: 0,
        id_empreendimento: 0,
        id_imovel: 0,
        nomeEmpreendimento: "",
        nomeCliente: "",
        id_lgpd: 0,
        doc: "",
        email: "",
        telefone: "",
        aceiteLGPD: 1,
        alterarSenha: 0,
        bairro: "",
        cidade: "",
        complemento: "",
        endereco: "",
        numero: "",
        readonly: false,
        previsaoDataInicio: "",
        previsaoDataTermino: "",
        evolucao: 0,
        tipoPlanta: 0,
        urlEmpreendimento: "",
      }
    }
  }

  public getEmpresaId(): number {
    return this.usuario[this.indexContratoSelecionado].id_empresa;
  }

  public getClienteId(): number {
    return this.usuario[this.indexContratoSelecionado].id_cliente;
  }

  public getContratoId(): number {
    return this.usuario[this.indexContratoSelecionado].id_contrato;
  }

  public setUsuario(usuario: UsuarioDAO[]) {
    this.usuario = usuario;
  }

  public setIndexContrato(index: number) {
    this.indexContratoSelecionado = index;
  }

}
