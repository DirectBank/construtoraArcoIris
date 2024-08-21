import { UsuarioService } from '../usuario/usuario.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ComunicadosService {

  constructor(
    private userService: UsuarioService,
    private httpClient: HttpClient,
  ) { }

  buscaComunicados(regInicio: number, regFim: number) {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiComunicados);
      this.httpClient.get(URL, {
        params: {
          id_contrato: this.userService.getUsuario().id_contrato.toString(),
          regInicio: regInicio.toString(),
          regFim: regFim.toString(),
        }
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });
  }

  marcarComoLido(id_comunicado: number) {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiComunicados);
      this.httpClient.put(URL, {
        id_comunicado: id_comunicado.toString(),
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

}

export class Comunicado {
  public registro: string;
  public id_comunicado: number;
  public id_cliente: number;
  public id_empreendimento: number;
  public id_contrato: number;
  public usuarioEnvio: string;
  public tipo: string;
  public tipoComunicado: string;
  public dataCadastro: string;
  public empreendimento: string;
  public cliente: string;
  public titulo: string;
  public mensagemEmail: string;
  public mensagemPush: string;
  public destinatarioEmail: string;
  public statusEnvioEmail: string;
  public statusEnvioPush: string;
  public icoPush: string;
  public icoEmail: string;
  public visualizado: number;
}
