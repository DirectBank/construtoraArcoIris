import { UsuarioService } from '../usuario/usuario.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MeusDados } from './meus-dados';

@Injectable({
  providedIn: 'root'
})

export class MeusDadosService {

  constructor(
    private userService: UsuarioService,
    private httpClient: HttpClient,
  ) { }

  buscaMeusDados(isClear: boolean = false) {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiMeusDados);
      this.httpClient.get(URL, {
        params: {
          clear: isClear ? "1" : "0"
        }
      }).toPromise().then((response) => {
        // console.log(response)
        resolve(response[0]);
      }).catch((error) => {
        reject(error);
      });

    });
  }
  atualizarMeusDados(meusDados: MeusDados) {
    console.log(meusDados)
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiMeusDados);
      this.httpClient.put(URL, {
        ...meusDados
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  atualizaPassword(senhaAtual, novaSenha) {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiMeusDados);
      this.httpClient.put(URL + '/update-password', {
        senhaAtual: senhaAtual.toString(),
        novaSenha: novaSenha.toString()
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        console.log(error)
        reject(error.error);
      });
    });
  }
}
