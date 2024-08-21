import { UsuarioDAO } from './../usuario/Usuario';
import { Injectable, EventEmitter } from '@angular/core';
import { ItemMenuDAO } from './menu';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  private menu: ItemMenuDAO[];

  // public observableSindico = new EventEmitter<boolean>();
  // public observableUnidade = new EventEmitter<boolean>();
  // public observableCondominio = new EventEmitter<boolean>();
  public observableMenu = new EventEmitter<{ isSindico: boolean, isUnidade: boolean, isCondominio: boolean }>();



  constructor(
    public userService: UsuarioService,
    private httpClient: HttpClient,
  ) {


  }


  async getMenu() {

    return new Promise((resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiMenu);
      let params = {
        // id_usuario: this.userService.getUsuario().id_usuario.toString(),
        // id_empresa: this.userService.getUsuario().id_empresa.toString()
      }

      // if (this.userService.getUsuario().tipo) {
      //   Object.assign(params, { tipo: this.userService.getUsuario().tipo });
      // }

      this.httpClient.get(URL, { params })
        .toPromise()
        .then(async (response: any) => {
          let menu = response.filter((itensMenu) => { return itensMenu.tipo == 'O' && itensMenu.parentId == 3 });
          //  console.log('Resposta busca menu:',menu);
          // console.log(response)
          resolve(response);

        }).catch(error => {
          console.log(error);
          reject(error)
        });
    });
  }

  public getOpcoesUnidade() {
    return this.menu.filter((itensMenu) => { return itensMenu.tipo == 'O' && itensMenu.parentId == 1 });
  }

  public getOpcoesCondominio() {
    // if ("/tabs" === "home") {
    //   return this.menu.filter((itensMenu) => { return (itensMenu.tipo == 'O' && itensMenu.parentId == 2) || itensMenu.tipo == 'O' && itensMenu.parentId == 4 });
    // }
    // else if ("/tabs" === "home-novo-layout") {
    //   return this.menu.filter((itensMenu) => { return (itensMenu.tipo == 'O' && itensMenu.parentId == 2) });

    // }
  }

  public getOpcoesSindico() {
    return this.menu.filter((itensMenu) => { return itensMenu.tipo == 'O' && itensMenu.parentId == 3 });
  }
  public getOpcoesPortaria() {
    return this.menu.filter((itensMenu) => { return itensMenu.tipo == 'O' && itensMenu.parentId == 4 });
  }

  public getGrupos() {
    return this.menu.filter((itensMenu) => { return itensMenu.tipo == 'G' });
  }

  public setMenu(menu: any[]) {
    this.menu = menu;
  }
  public getTituloMenu(url: string) {
    return this.menu.filter((itensMenu) => {
      if (itensMenu.url.toString() === url.toString()) {
        return itensMenu
      }
    })
  }

}


