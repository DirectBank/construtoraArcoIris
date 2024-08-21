import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class InfoRendimentoService {

  constructor(
    private userService: UsuarioService,
    private httpClient: HttpClient,
  ) { }

  buscaRendimentosPendentes() {
    let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiInfoRendimento);

    return new Promise(async (resolve, reject) => {
      this.httpClient.get(URL, {
        params: {
          ano: '2022'
        }
      }).toPromise().then((response) => {
        console.log(response);
        
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });
  }

}

export class Cobranca {
  public id_bureau: string
  public vcto: string;
  public valor: string;
  public linha_digitavel: string;
  public parcela: string;
}
