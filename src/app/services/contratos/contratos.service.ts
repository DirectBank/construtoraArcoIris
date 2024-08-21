import { UsuarioService } from '../usuario/usuario.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ContratosService {

  constructor(
    private httpClient: HttpClient,
    public userService: UsuarioService

  ) { }

  // buscaDetalhesContrato() {
  //   return new Promise(async (resolve, reject) => {
  //     let URL = environment.buildUrl('construtora',environment.API_ENDPOINT.apiDebitos);
  //     this.httpClient.get(URL, {
  //       params: {
  //         // id_usuario: this.userService.getUsuario().id_usuario.toString(),
  //         // id_empresa: this.userService.getUsuario().id_empresa.toString(),
  //         // id_cliente: this.userService.getUsuario().id_cliente.toString(),
  //         // tipo:this.userService.getUsuario().tipo
  //       }
  //     }).toPromise().then((response) => {
  //       resolve(response);
  //     }).catch((error) => {
  //       reject(error);
  //     });

  //   });
  // }

  buscaPlanosDePagamento() {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiPlanosPagamento);
      this.httpClient.get(URL, {
        params: {
          id_contrato: this.userService.getUsuario().id_contrato.toString(),
        }
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });

  }

}

export class PlanoPagamento {
  public registro: string;
  public id_periodica: string;
  public data: string;
  public dt: string;
  public descricao: string;
  public valor: number;
  public tipo: string;
  public parcelas: number;
  public id_moeda: number;
  public indice: string;
  public inativo: string;
  public relatorio: string;
  public parcelasPagas: string;
  public percentualPagas: string;
}