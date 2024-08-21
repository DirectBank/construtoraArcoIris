import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BoletosService {

  constructor(
    private userService: UsuarioService,
    private httpClient: HttpClient,
  ) { }

  buscaBoletosPendentes() {
    let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiBoletos);

    return new Promise(async (resolve, reject) => {
      this.httpClient.get(URL, {
        params: {
          id_contrato: this.userService.getUsuario().id_contrato.toString()
        }
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });
  }

  // downloadBoleto(id_boleto, novoVcto) {
  // downloadBoleto() {
  //   // let URL = 'https://10.0.0.14:8030/omp/api/util/teste-boleto'// environment.buildUrl('construtora',environment.API_ENDPOINT.apiBoletos);
  //   // let URL = 'http://desenv.omeupredio.com.br/Boleto/boletoPDF.aspx?processo=1602077716636&id=20759683&novoVcto=10/10/2020&cpf=111'
  //   // let URL = 'https://10.0.0.14:44339/Boleto/boletoPDF.aspx?processo=1602184035388&id=20759683&novoVcto=10/10/2020&cpf=111'
  //   let URL = 'https://www.omeupredio.com.br/app/Boleto/boletoPDF.aspx?processo=1602248519242&id=20759683&novoVcto=10/10/2020&cpf=111'
  //   return new Promise(async (resolve, reject) => {

  //     this.httpClient.get(URL, {
  //       responseType: 'arraybuffer',
  //       // params: {
  //       //   processo: new Date().getTime().toString(),
  //       //   id: id_boleto.toString(),
  //       //   novoVcto: new Date().toLocaleDateString('pt-BR')
  //       // }
  //     }).toPromise().then((response: any) => {
  //       //   var uint8 = new Uint8Array(response.length);
  //       //   for (var i = 0; i < uint8.length; i++) {
  //       //     uint8[i] = response.charCodeAt(i);
  //       //   }
  //       // var blobObject = new Blob([uint8], { type: 'text/fdf' });
  //       // resolve(new Blob([uint8], { type: 'application/pdf' }));
  //       resolve(response);
  //     }).catch((error) => {
  //       reject(error);
  //     });

  //   });
  // }

}

export class Cobranca {
  public id_bureau: string
  public vcto: string;
  public valor: string;
  public linha_digitavel: string;
  public parcela: string;
}
