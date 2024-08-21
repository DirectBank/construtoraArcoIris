import { UsuarioService } from '../usuario/usuario.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonalizacoesService {

  constructor(
    private userService: UsuarioService,
    private httpClient: HttpClient,
  ) { }

  buscaGrupos(): Promise<GrupoPersonalizacao[]> {

    return new Promise(async (resolve, reject) => {

      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiPersonalizacoes);
      this.httpClient.get(URL, {
        params: {
          id_contrato: this.userService.getUsuario().id_contrato.toString()
        }
      }).toPromise().then((response: Personalizacao[]) => {
        let arrGrupo = response.map(el => {
          return {
            id_grupoEnquete: el.id_grupoEnquete,
            grupoEnquete: el.grupoEnquete,
            votado: response.filter(el2 => el2.id_grupoEnquete == el.id_grupoEnquete).every(el3 => el3.votado == 1),
            encerrado : response.filter(el2 => el2.id_grupoEnquete == el.id_grupoEnquete).every(el3 => el3.encerrado == 1),
          }
        })

        arrGrupo = [...new Map(arrGrupo.map(item => [item["id_grupoEnquete"], item])).values()];

        resolve(arrGrupo);
      }).catch((error) => {
        reject(error);
      });

    });

  }

  buscaPersonalizacoes(id_grupoPersonalizacao: number = 0): Promise<Personalizacao[]> {

    return new Promise(async (resolve, reject) => {

      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiPersonalizacoes);
      this.httpClient.get(URL, {
        params: {
          id_contrato: this.userService.getUsuario().id_contrato.toString()
        }
      }).toPromise().then((response: Personalizacao[]) => {
        if (id_grupoPersonalizacao)
          resolve(response.filter((el) => el.id_grupoEnquete == id_grupoPersonalizacao));
        else
          resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });

  }

  buscaAlternativas(id_personalizacao: number): Promise<Alternativa[]> {

    return new Promise(async (resolve, reject) => {

      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiPersonalizacoes);
      this.httpClient.get(URL + "/alternativas", {
        params: {
          id_personalizacao: id_personalizacao.toString(),
          id_contrato: this.userService.getUsuario().id_contrato
        }
      }).toPromise().then((response: Alternativa[]) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });

  }

  votar(voto) {

    voto.id_empreendimento = this.userService.getUsuario().id_empreendimento;
    voto.id_contrato = this.userService.getUsuario().id_contrato;
    console.log(voto);

    return new Promise(async (resolve, reject) => {

      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiPersonalizacoes);
      this.httpClient.post(URL, voto).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });

  }

  alterarVoto(voto) {

    voto.id_empreendimento = this.userService.getUsuario().id_empreendimento;
    voto.id_contrato = this.userService.getUsuario().id_contrato;
    console.log(voto);

    return new Promise(async (resolve, reject) => {

      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiPersonalizacoes);
      this.httpClient.put(URL, voto).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });

  }

  finalizarGrupo(id_grupoEnquete, parcela, diaVcto) {
    //@, @, @id_grupoEnquete, @id_cliente, @id_contrato, @parcela, @diaVcto, @modo=40

    let body: any = {};
    body.id_grupoEnquete = id_grupoEnquete;
    body.parcela = parcela;
    body.diaVcto = diaVcto;
    body.id_empreendimento = this.userService.getUsuario().id_empreendimento;
    body.id_contrato = this.userService.getUsuario().id_contrato;

    return new Promise(async (resolve, reject) => {

      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiPersonalizacoes + "/finalizar");
      this.httpClient.post(URL, body).toPromise().then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });
  }

  groupBy = (items, key) => items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [
        ...(result[item[key]] || []),
        item,
      ],
    }),
    {},
  );

}

export class GrupoPersonalizacao {
  public id_grupoEnquete: number;
  public grupoEnquete: string;
  public votado?: boolean;
  public encerrado?: boolean;
}

export class Personalizacao {
  public id_enquete: number;
  public id_grupoEnquete: number;
  public grupoEnquete: string;
  public descricao: string;
  public dataFim: string;
  public votado: number;
  public valorVotado: number;
  public encerrado: number;
}

export class Alternativa {
  public id_alternativa: number;
  public id_alternativaEscolhida: number;
  public descricao: string;
  public dataLimite: string;
  public valor: number;
  public padrao: number;
  public parcelas: number;
  public listaURL: string[];
  public encerrado: number;
}