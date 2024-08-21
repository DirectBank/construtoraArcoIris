import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Alternativa } from './alternativa';
import { NovaEnquete } from './nova-enquete';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})

export class EnquetesService {

  constructor(
    private userService: UsuarioService,
    private httpClient: HttpClient,
  ) { }

  buscaEnquetes() {
    return new Promise(async (resolve, reject) => {

      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiEnquetes);
      this.httpClient.get(URL, {
        params: {
          // id_usuario: this.userService.getUsuario().id_usuario.toString(),
          // id_empresa: this.userService.getUsuario().id_empresa.toString(),
          // id_cliente: this.userService.getUsuario().id_cliente.toString(),
          // tipo: this.userService.getUsuario().tipo
        }
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });

  }

  votar(id_enquete: number, id_alternativa: number) {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiEnquetes);
      this.httpClient.post(URL + "/votar", {
        // id_usuario: this.userService.getUsuario().id_usuario.toString(),
        // id_empresa: this.userService.getUsuario().id_empresa.toString(),
        // id_cliente: this.userService.getUsuario().id_cliente.toString(),
        id_enquete,
        id_alternativa,
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });
  }

  criarEnquete(novaEnquete: NovaEnquete) {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiEnquetes);
      this.httpClient.post(URL, {
        // id_usuario: this.userService.getUsuario().id_usuario.toString(),
        // id_empresa: this.userService.getUsuario().id_empresa.toString(),
        // id_cliente: this.userService.getUsuario().id_cliente.toString(),
        enquete: novaEnquete.enquete,
        dataLimite: new Date(novaEnquete.dataLimite).toLocaleDateString("pt-br"),
        alternativa1: novaEnquete.alternativa1,
        alternativa2: novaEnquete.alternativa2,
        alternativa3: novaEnquete.alternativa3,
        alternativa4: novaEnquete.alternativa4,
        alternativa5: novaEnquete.alternativa5,
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });
  }
}





