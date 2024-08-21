import { BehaviorSubject, from as fromPromise, Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UtilService } from './../util/util.service';
import { MenuService } from './../menu/menu.service';
import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage'
import { Login } from './Login';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationColaboradorService {

  private usuarioAutenticado: boolean = false;
  authSubject = new BehaviorSubject(false);

  constructor(
    private usuarioService: UsuarioService,
    private menuService: MenuService,
    private utilService: UtilService,
    private httpClient: HttpClient,
    private navCtrl: NavController,
    private storage: Storage,
    private router: Router,
  ) { }

  async logInColaborador(usuario: Login, salvaSenha: boolean, deviceData: any) {

    console.log(usuario)

    return new Promise((resolve, reject) => {

      let URL = environment.buildUrl(('construtora'), environment.API_ENDPOINT.apiLogin + "/colaborador");
      console.log(URL)

      this.httpClient.post(URL, usuario)
        .toPromise()
        .then(async (response: any) => {
          await this.storage.set("ACCESS_TOKEN", response['token']);
          await this.storage.set("TIME_TOKEN", response['expiresIn']);
          if (response['contratos'][0]['senha'] == 1) {
            this.usuarioService.setUsuario(response['contratos']);
            this.usuarioAutenticado = true;
            if (salvaSenha && !usuario.biometric) {
              await this.salvaUsuario(usuario);
              this.salvaModoLogin(1);
            }
            else if (usuario.biometric) {
              this.salvaModoLogin(2)
            }
            else {
              this.apagaUsuario();
              this.salvaModoLogin(0);
            }
            resolve(response);
          }
          else if (response['senha'] == 0) {
            this.usuarioAutenticado = false;
            throw new Error("Usuario ou senha inválidos.");
          }

        }).catch(error => {
          console.log(error.error)
          reject(error.error)
        });

    })

  }

  async logout() {
    this.usuarioAutenticado = false;
    this.usuarioService.setUsuario(null);
    await this.storage.remove("ACCESS_TOKEN");
    this.navCtrl.setDirection('root');
    this.router.navigate(['']);
  }

  isAuthenticated() {
    return this.usuarioAutenticado;
  }

  async salvaUsuario(usuario: Login) {
    await this.storage.set("CODIGO_COL", btoa(usuario.codigo));
    await this.storage.set("LOGIN_COL", btoa(usuario.login));
    await this.storage.set("SENHA_COL", btoa(usuario.senha));
  }
  async salvaUsuarioBiometric(usuario) {
    await this.storage.set("AUTH_CODIGO_COL", btoa(usuario.codigo));
    await this.storage.set("AUTH_LOGIN_COL", btoa(usuario.login));
    await this.storage.set("AUTH_SENHA_COL", btoa(usuario.senha));
    await this.storage.set("SAVE_AUTH_COL", usuario.biometric);
  }
  async apagaUsuario() {
    // await this.storage.set("CODIGO_COL", "");
    await this.storage.set("LOGIN_COL", "");
    await this.storage.set("SENHA_COL", "");
  }
  async apagaUsuarioBiometric() {
    // await this.storage.set("AUTH_CODIGO_COL", "");
    await this.storage.set("AUTH_LOGIN_COL", "");
    await this.storage.set("AUTH_SENHA_COL", "");
  }
  async salvaModoLogin(modoLogin: number) {
    switch (modoLogin) {
      case 0: //Limpa login
        await this.storage.set("LOGIN_MODE_COL", btoa('false'));
        await this.storage.set("SAVE_AUTH_COL", false);
        break;
      case 1: //Salva nome e senha
        await this.storage.set("LOGIN_MODE_COL", btoa('true'));
        await this.storage.set("SAVE_AUTH_COL", false);
        break;
      case 2: //Biometria
        await this.storage.set("LOGIN_MODE_COL", btoa('biometric'));
        break;
    }
  }

  async temUsuarioSalvo() {
    let modoLogin = atob(await this.storage.get("LOGIN_MODE_COL"));
    if (modoLogin == 'true') {
      return {
        codigo: atob(await this.storage.get("CODIGO_COL")),
        login: atob(await this.storage.get("LOGIN_COL")),
        senha: atob(await this.storage.get("SENHA_COL"))
      }
    }
    else if (modoLogin == 'biometric' || modoLogin == 'face') {
      return {
        codigo: atob(await this.storage.get("AUTH_CODIGO_COL")),
        login: atob(await this.storage.get("AUTH_LOGIN_COL")),
        senha: atob(await this.storage.get("AUTH_SENHA_COL")),
        biometric: await this.storage.get("SAVE_AUTH_COL")
      }
    }
    else {
      return false;
    }
  }

  esqueciAsenha(cpf: string, email: string) {

    let body = { documento: cpf, email, codigo: environment.empresaAtual.codigo };
    console.log(body);

    let URL = environment.buildUrl(('construtora'), environment.API_ENDPOINT.apiEsqueciSenha);
    return new Promise((resolve, reject) => {

      this.httpClient.post(URL, body)
        .toPromise()
        .then((response: any) => {
          resolve(response);
        }).catch(error => {
          console.log(error)
          reject(error)
        });

    })

  }

  alterarSenha(senhaAntiga, senhaNova) {

    let body: any = {};
    body.senhaNova = senhaNova;
    body.senhaAntiga = senhaAntiga;

    return new Promise((resolve, reject) => {
      let URL = environment.buildUrl(('construtora'), environment.API_ENDPOINT.apiAlteraSenha);
      this.httpClient.post(URL, body)
        .toPromise()
        .then((response: any) => {
          resolve(response);
        }).catch(error => {
          console.log(error)
          reject(error)
        });

    })
  }

  getToken() {
    return this.storage.get("ACCESS_TOKEN")
  }
  getTimeToken() {
    return this.storage.get("TIME_TOKEN")
  }
  async updateToken() {

    let body;
    return new Promise(async (resolve, reject) => {
      let URL = environment.buildUrl('construtora', environment.API_ENDPOINT.apiRefreshToken);
      this.httpClient.post(URL, body).toPromise().then(async (response) => {
        await this.storage.set("ACCESS_TOKEN", response['token']);
        await this.storage.set("TIME_TOKEN", response['expiresIn']);
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });
  }
}