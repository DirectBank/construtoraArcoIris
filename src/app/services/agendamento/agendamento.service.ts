import { UsuarioService } from '../usuario/usuario.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor(
    private userService: UsuarioService,
    private httpClient: HttpClient,
  ) { }

  buscaAgendaMes(mesano: string): Promise<Agendamento[]> {

    return new Promise(async (resolve, reject) => {

      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiAgendamentos);
      this.httpClient.get(URL + "/agendamentos", {
        params: {
          mesAno: mesano
        }
      }).toPromise().then((response: Agendamento[]) => {
        response.forEach(el => {
          el.startTime = new Date(el.startTime);
          el.endTime = new Date(el.endTime);
        })
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });

  }

  buscaTiposAgendamento() {

    return new Promise(async (resolve, reject) => {

      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiAgendamentos);
      this.httpClient.get(URL + "/tipos-agendamento").toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });

  }

  cadastraAgendamento(agendamento: NovoAgendamento) {

    agendamento.id_empreendimento = this.userService.getUsuario().id_empreendimento;
    agendamento.id_contrato = this.userService.getUsuario().id_contrato;
    agendamento.dataAgendamento = `${agendamento.dataAgendamento["getDate"]()}/${(agendamento.dataAgendamento["getMonth"]() + 1).toString().padStart(2, '0')}/${agendamento.dataAgendamento["getFullYear"]()}`;
    agendamento.horaAgendamento = agendamento.horaAgendamento.split("T")[1].substring(0, 5);
    console.log(agendamento);

    return new Promise(async (resolve, reject) => {

      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiAgendamentos);
      this.httpClient.post(URL, agendamento).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });

  }

  cancelaAgendamento(id_visita: number) {

    return new Promise(async (resolve, reject) => {

      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiAgendamentos);
      this.httpClient.put(URL + "/cancelar", {
        id_visita: id_visita
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });

  }

}

export class TipoAgendamento {
  public id_tipoVisita: number;
  public id_empresa: number;
  public descricao: string;
}

export class NovoAgendamento {
  public motivo: string = "";
  public id_tipoVisita: number;
  public id_empreendimento: number;
  public id_contrato: number;
  public dataAgendamento?: Date | string;
  public horaAgendamento?: string = "";
  constructor() {
    this.horaAgendamento = "";
    this.dataAgendamento = new Date();
  }
}

export class Agendamento {
  public title: string;
  public tipo: string;
  public status: string;
  public id_agenda: number;
  public startTime: Date;
  public endTime: Date;
}