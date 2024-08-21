import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class FaleConoscoService {

  constructor(
    private userService: UsuarioService,
    private httpClient: HttpClient,
  ) { }

  enviarMensagem(mensagem: string) {

    let body: FaleConosco = {
      id_contrato: this.userService.getUsuario().id_contrato,
      id_empreendimento: this.userService.getUsuario().id_empreendimento,
      mensagem: mensagem
    }
    return new Promise(async (resolve, reject) => {

      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiFaleConosco);
      this.httpClient.post(URL, body).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });

  }


}

export class FaleConosco {
  public id_empreendimento: number;
  public id_contrato: number;
  public mensagem: string;
}





