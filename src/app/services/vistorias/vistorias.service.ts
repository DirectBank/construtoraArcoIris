import { CustomAlertService } from '../custom-alert/custom-alert.service';
import { UsuarioService } from '../usuario/usuario.service';
import { environment } from 'src/environments/environment';
import { UtilService } from '../util/util.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class VistoriasService {

  constructor(
    private userService: UsuarioService,
    public alert: CustomAlertService,
    public utilService: UtilService,
    private httpClient: HttpClient,
  ) { }

  buscaVistorias() {
    let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiVistorias);

    return new Promise(async (resolve, reject) => {
      this.httpClient.get(URL, {
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
      
    });
  }

  buscaVistoriaCliente(id_contrato) {
    let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiVistorias+'/vistoria-cliente');

    return new Promise(async (resolve, reject) => {
      this.httpClient.get(URL, {
        params:{
          id_contrato: id_contrato
        }
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
      
    });
  }


  buscaVistoria(id_vistoria: number) {
    let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiVistorias + `/${id_vistoria}`);
    
    return new Promise(async (resolve, reject) => {
      this.httpClient.get(URL, {
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });
  }

  buscaAreasVistoria() {
    let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiVistorias);
    return new Promise(async (resolve, reject) => {
      this.httpClient.get(URL+"/areas-vistoria", {
      }).toPromise().then((response) => {
        // console.log(response)
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });
  }

  upateAreaVistoria(novaVistoria: any) {
    let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiVistorias);

    return new Promise(async (resolve, reject) => {
      this.httpClient.put(URL+"/area-vistoria", novaVistoria).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });
  }

  buscaEmpreendimentos() {
    let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiVistorias + "/empreendimentos");

    return new Promise(async (resolve, reject) => {
      this.httpClient.get(URL, {
        // params: {
        //   id_contrato: this.userService.getUsuario().id_contrato.toString()
        // }
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });
  }

  buscaClientes(id_empreendimento: number) {
    let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiVistorias + "/clientes");

    return new Promise(async (resolve, reject) => {
      this.httpClient.get(URL, {
        params: {
          id_empreendimento: id_empreendimento.toString()
        }
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });
  }

  buscaContratos(id_empreendimento: number, id_cliente: number) {
    let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiVistorias + "/contratos");

    return new Promise(async (resolve, reject) => {
      this.httpClient.get(URL, {
        params: {
          id_empreendimento: id_empreendimento.toString(),
          id_cliente: id_cliente.toString(),
        }
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });
  }

  alteraStatusVistoria(areaVistoria: AreaVistoria) {
    let body = {
      id_vistoria: areaVistoria.id_vistoria,
      status: areaVistoria.status
    }
    let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiVistorias + `/status`);

    return new Promise(async (resolve, reject) => {
      this.httpClient.put(URL, body).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        this.alert.standardAlert("Erro", error.message, "fail");
        reject(error);
      });

    });
  }

  alteraDescricaoVistoria(areaVistoria: AreaVistoria) {
    let body = {
      id_vistoria: areaVistoria.id_vistoria,
      descricao: areaVistoria.descricao
    }
    let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiVistorias + `/descricao`);

    return new Promise(async (resolve, reject) => {
      this.httpClient.put(URL, body).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        this.alert.standardAlert("Erro", error.message, "fail");
        reject(error);
      });

    });
  }

  novaVistoria(novaVistoria) {
    let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiVistorias);

    return new Promise(async (resolve, reject) => {
      this.httpClient.post(URL, novaVistoria).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });
  }

  async anexaImagem(id_vistoria, imagem64) {
    let formData;
    // imagem64 = await this.utilService.base64toBlob('data:image/jpeg;base64,' + imagem64, "image/jpeg")
    imagem64 = await this.utilService.base64toBlob(imagem64, "image/jpeg")
    let headers = new Headers();
    headers.append('Content-Type', "multipart/form-data");
    formData = new FormData();
    formData.append("image", imagem64, "image.jpg");
    formData.append("id_vistoria", id_vistoria.toString());

    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiVistorias + "/imagem");
      this.httpClient.post(URL, formData).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error.error);
      });
    });

  }

  async finalizaVistoria(id_vistoria, imagem64) {
    let formData;
    imagem64 = await this.utilService.base64toBlob(imagem64, "image/jpeg")
    let headers = new Headers();
    headers.append('Content-Type', "multipart/form-data");
    formData = new FormData();
    formData.append("image", imagem64, "image.jpg");
    formData.append("id_vistoria", id_vistoria.toString());

    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiVistorias + "/finalizar");
      this.httpClient.post(URL, formData).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error.error);
      });
    });

  }

  async deletaImagem(id_vistoria, url_firebase) {

    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiVistorias + "/imagem");
      this.httpClient.delete(URL, {
        params: {
          url_firebase, id_vistoria
        }
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error.error);
      });
    });

  }

}

export class NovaVistoria {
  public id_empreendimento: number;
  public id_cliente: number;
  public id_contrato: number;
}
export class Vistoria {
  public id_empreendimento: number;
  public id_vistoria: number;
  public id_cliente: number;
  public id_contrato: number;
  public empreendimento: string;
  public cliente: string;
  public unidade: string;
  public searchName: string;
}
export class AreaVistoria {
  public id_vistoria: number;
  public descricao: string;
  public status: number;
  public area: string;
  public empreendimento: string;
  public listaURL: { url: string, url_firebase: string }[];
  public cliente: string;
  public urlArquivoAssinatura: string;
  public unidade: string;
  public imagens: string;
  public finalizada: number;
}