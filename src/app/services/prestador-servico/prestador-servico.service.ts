import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class PrestadorServicoService {

  constructor(
    private userService: UsuarioService,
    private httpClient: HttpClient,
  ) { }

  buscaPrestadores() {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiPrestadoresServico);
      this.httpClient.get(URL, {
        params: {
          // id_empresa: this.userService.getUsuario().id_empresa.toString(),
        }
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });

  }
}
