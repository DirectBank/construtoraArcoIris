// import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { UsuarioService } from './../usuario/usuario.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DocumentosService {

  // fileTransfer: FileTransferObject = this.transfer.create();

  constructor(
    private userService: UsuarioService,
    // private transfer: FileSystem,
    public httpClient: HttpClient,
    private file: File,
  ) { }

  buscaDocumentos() {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiDocumentos);
      this.httpClient.get(URL, {
        params: {
          id_contrato: this.userService.getUsuario().id_contrato.toString(),
          newVersion: '1'
        }
      }
      ).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  buscaContratos() {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiDocumentos) + "/contratos";
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

  buscaTermosVistoria() {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiDocumentos) + "/termos-vistoria";
      this.httpClient.get(URL, {
        params: {
          id_contrato: this.userService.getUsuario().id_contrato.toString(),
          newVersion: '1'
        }
      }
      ).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  buscaPlantas() {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiDocumentos) + "/plantas";
      this.httpClient.get(URL, {
        params: {
          id_empreendimento: this.userService.getUsuario().id_empreendimento.toString(),
          tipoPlanta: this.userService.getUsuario().tipoPlanta.toString(),
          newVersion: '1'
        }
      }
      ).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  buscaTodosDocumentos() {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiDocumentos) + "/todos";
      console.log(URL,this.userService.getUsuario().id_contrato.toString());
      
      this.httpClient.get(URL, {
        params: {
          id_contrato: this.userService.getUsuario().id_contrato.toString(),
          newVersion: '1'
        }
      }
      ).toPromise().then((response) => {
        console.log(response);
        
        resolve(response);
      }).catch((error) => {
        console.log(error);

        reject(error);
      });
    });
  }

  buscaProjetos() {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiDocumentos) + "/projetos";
      this.httpClient.get(URL, {
        params: {
          id_contrato: this.userService.getUsuario().id_contrato.toString(),
          id_empreendimento: this.userService.getUsuario().id_empreendimento.toString(),
          tipoPlanta: this.userService.getUsuario().tipoPlanta.toString(),
          newVersion: '1'
        }
      }
      ).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  downloadDocumento(file_path) {

    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiDrive);
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


    // let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiDrive);
    // URL += '/download-url?';
    // URL += '&file_url=' + file_path;
    // return URL
  }

  getUrldownloadDocumento(id_arquivo: string) {
    let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiDocumentosDownload);
    return encodeURI(`${URL}?id_arquivo=${id_arquivo}&id_empresa=${this.userService.getUsuario().id_empresa.toString()}`);
  }
}

export class Documento {
  public descricao: string;
  public dataAlteracao: string;
  public urlArquivo?: string;
  public id_firebase: number;
  public tamanho: number;
  public tipoDocumento: string;
}

