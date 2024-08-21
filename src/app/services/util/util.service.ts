import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { environment } from 'src/environments/environment';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { BehaviorSubject, throwError } from 'rxjs';
import { File } from '@ionic-native/file/ngx';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as Blob from "blob";

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  public observableSindico;
  public isSindico: boolean = false;
  public meses: string[] = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");

  constructor(
    public userService: UsuarioService,
    private httpClient: HttpClient,
    public diagnostic: Diagnostic,
    private platform: Platform,
    public file: File,
    private storage: Storage
  ) {
    this.observableSindico = new BehaviorSubject<Boolean>(this.isSindico);
  }

  async getURLTermoDeUso() {
    // return await new Promise(async (resolve, reject) => {

    //   this.httpClient.get(environment.API_ENDPOINT.apiTermoDeAceite)
    //     .toPromise()
    //     .then((response) => {
    //       console.log(response)
    //       resolve(response)
    //     }).catch(error => {
    //       console.log(error)
    //       reject(error)
    //     })
    // })
  }

  eventChange() {
    this.observableSindico.next(this.isSindico);
  }

  getIdEMpresa() {
    return this.storage.get("id_empresa")
  }

  base64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    try {
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);

      }

      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    }
    catch (err) {
      return err;
    }
  }

  persistirBlob(blobFile, fileName) {

    let filePath = (this.platform.is("android") ? this.file.externalApplicationStorageDirectory : this.file.documentsDirectory);
    let folder = `OmeuPredioPlus-Docs`;
    let fullPath = filePath + `${folder}/`;
    // console.log(blobFile, fullPath);

    return new Promise((resolve, reject) => {

      if (this.platform.is("android")) {
        this.diagnostic.requestExternalStorageAuthorization()
          .then(async (response) => {
            // console.log(response);
            if (response == "GRANTED") {
              this.file.checkDir(filePath, `${folder}/`)
                .then(_ => {
                  // console.log("Existe Pasta");
                  this.file.writeFile(fullPath, fileName, blobFile, { replace: true }).then(response => {
                    // ACTION
                    // console.log(response)
                    resolve(fullPath + fileName);
                  }).catch(err => {
                    // ACTION
                    console.log(err);
                    reject(err);
                  })
                })
                .catch(err => {
                  console.log("Não existe Pasta");
                  this.file.createDir(filePath, `${folder}/`, false)
                    .then(result => {
                      console.log("Não existe pasta, criando.....", fullPath, fileName);
                      this.file.writeFile(fullPath, fileName, blobFile, { replace: true }).then(async response => {
                        // ACTION
                        // console.log("Criou o arquivo");
                        resolve(fullPath + fileName);
                      }).catch(err => {
                        console.log(err);
                        reject(err);
                      })
                    })
                    .catch(err => {
                      console.log(err);
                      reject(err);
                    });
                });
            }
            else {
              reject({ message: "Procedimento não autorizado!" });
              return;
            }
          })
          .catch((error) => {
            console.log(error);
            reject(error);
            return;
          });
      } else {
        this.file.checkDir(filePath, `${folder}/`)
          .then(_ => {
            // console.log("Existe Pasta");
            this.file.writeFile(fullPath, fileName, blobFile, { replace: true }).then(response => {
              // ACTION
              // console.log(response)
              resolve(fullPath + fileName);
            }).catch(err => {
              // ACTION
              console.log(err);
              reject(err);
            })
          })
          .catch(err => {
            console.log("Não existe Pasta");
            this.file.createDir(filePath, `${folder}/`, false)
              .then(result => {
                console.log("Não existe pasta, criando.....", fullPath, fileName);
                this.file.writeFile(fullPath, fileName, blobFile, { replace: true }).then(async response => {
                  // ACTION
                  // console.log("Criou o arquivo");
                  resolve(fullPath + fileName);
                }).catch(err => {
                  console.log(err);
                  reject(err);
                })
              })
              .catch(err => {
                console.log(err);
                reject(err);
              });
          });
      }


    });
  }

  dataAtual(formatacao: string = "") {
    let dataAtual = new Date().toLocaleDateString("pt-BR");
    if (formatacao === "YYYY-MM-DD") {
      dataAtual = `${dataAtual.split("/")[2]}-${dataAtual.split("/")[1]}-${dataAtual.split("/")[0]}`
    }
    return dataAtual
  }

  horaAtual(formatacao: string = "") {
    let dataAtual = new Date().toLocaleTimeString("pt-BR");
    if (formatacao === "HH:mm") {
      dataAtual = `${dataAtual.split(":")[0]}:${dataAtual.split(":")[1]}`
    }
    return dataAtual
  }

  mesPorExtenso(numeroMes: string) {
    return (numeroMes != undefined && numeroMes != "") ? this.meses[Number(numeroMes) - 1] : "";
  }

  avaliacaoApp(avaliacao: any) {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiAvaliacaoApp);
      this.httpClient.post(URL, {
        id_empresa: this.userService.getUsuario().id_empresa.toString(),
        // id_usuario: this.userService.getUsuario().id_usuario.toString(),
        id_cliente: this.userService.getUsuario().id_cliente.toString(),
        nota: avaliacao.nota,
        descricao: avaliacao.descricao,
        bundleId: avaliacao.bundleId
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  marcaCienciaLGPD(id_lgpd) {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiTermoLgpd);
      this.httpClient.post(URL, {
        id_lgpd: id_lgpd
      }).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  buscaLGPD() {
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiTermoLgpd);
      // console.log(URL) 
      this.httpClient.get(URL).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  buscaCEP(cep: string): Promise<CEPResponse> {
    return new Promise(async (resolve, reject) => {
      let URL = `https://viacep.com.br/ws/${cep}/json/`;
      if (cep.length < 8) reject("CEP Inválido")
      else {
        this.httpClient.get(URL).toPromise().then((response: CEPResponse) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      }
    });

  }

}

export class CEPResponse {
  public cep: string;
  public logradouro: string;
  public complemento: string;
  public bairro: string;
  public localidade: string;
  public uf: string;
  public ibge: string;
  public gia: string;
  public ddd: string;
  public siafi: string;
}

