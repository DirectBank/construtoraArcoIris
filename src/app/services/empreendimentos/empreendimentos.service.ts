import { UsuarioService } from '../usuario/usuario.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EmpreendimentosService {

  constructor(
    private httpClient: HttpClient,
    public userService: UsuarioService

  ) { }

  buscaEvolucao() {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiEvolucaoEmpreendimento);
      this.httpClient.get(URL, {
        params: {
          id_empreendimento: this.userService.getUsuario().id_empreendimento.toString(),
        }
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });

  }

  buscaImagens(id_tipoDOcumento:number = 0) {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiGaleriaEmpreendimento);
      this.httpClient.get(URL, {
        params: {
          id_empreendimento: this.userService.getUsuario().id_empreendimento.toString(),
          id_tipoDOcumento: id_tipoDOcumento.toString()
        }
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });
  }

  buscaImagensFirebase(url) {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiGaleriaEmpreendimentoFirebase);
      this.httpClient.get(URL, {
        params: {
          imageUrl: url,
        }
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });
  }
  
  buscaImgEspaco(file_path: any) {
      let URL = environment.buildUrl('wo', environment.API_ENDPOINT.apiDrive);
      return new Promise(async (resolve, reject) => {
        this.httpClient.get(URL + '/link-url', {
          params: {
            file_url: file_path
          }
        }).toPromise().then((response: any) => {
          resolve(response.url[0]);
        }).catch((error) => {
          reject(error);
        });
      });
  }

  buscaVistoria() {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiVistorias + "/contratos/" + this.userService.getUsuario().id_contrato);
      this.httpClient.get(URL).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });
  }

}

export class EvolucaoEtapa {
  public empreendimentoCodigo: string;
  public empreendimentoNome: string;
  public dataAtualizacao: string;
  public etapaDescricao: string;
  public etapaEvolucao: number;
  public id_evolucao: string;
  public etapaOrdem: string;
}
export class ImagemGaleria {
  public id_firebase: string;
  public urlArquivo: string;
  public loading: boolean;
  public registro: string
  public data: string;
  public mesano: any;
}