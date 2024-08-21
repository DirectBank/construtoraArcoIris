import { PushNotificationService } from 'src/app/services/push-notification/push-notification.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { CustomLoaderService } from 'src/app/services/custom-loader/custom-loader.service';
import { CustomAlertService } from './../../services/custom-alert/custom-alert.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { UtilService } from './../../services/util/util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from 'src/app/services/authentication/Login';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Component, OnInit } from '@angular/core';
// import { Device } from '@ionic-native/device/ngx';
import { Device } from '@capacitor/device';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Capacitor } from "@capacitor/core";
import { fingerprint } from '@angular/compiler/src/i18n/digest';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  public salvarSenha: boolean = false;
  public login: Login = new Login();
  public loginForm: FormGroup;
  public versaoApp: string = "";
  public fingerprintOptions: {
    clientSecret: string;
    disableBackup: boolean;
    title: string;
    subtitle: string;
    fallbackButtonTitle: string;
  };
  public authBiometric: boolean = false;
  public showPassword: boolean = false;
  public env: any;
  public biometricMode: string = "finger";

  constructor(
    private pushNotificationService: PushNotificationService,
    private authService: AuthenticationService,
    public customAlert: CustomAlertService,
    private configRating: NgbRatingConfig,
    public usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private appVersion: AppVersion,
    private faio: FingerprintAIO,
    private platform: Platform,
    private storage: Storage,
    private router: Router,
    // public device: Device,
  ) {
    this.configRating.max = 5;
    this.env = environment;
    
      this.loginForm = this.formBuilder.group({
        codigo: [this.env.empresaAtual.codigo, [Validators.required]],
        // codigo: ['00009004', [Validators.required]],
        login: ['', [Validators.required]],
        senha: ['', [Validators.required]],
      });
      
  }

  async ionViewWillEnter() {
    // if (Capacitor.platform !== "web") {
    //   await this.platform.ready();
    //   this.appVersion.getVersionNumber().then(async (versao) => {
    //     this.versaoApp = await versao;
    //     return;
    //   });
    // }
    this.versaoApp = (await App.getInfo()).version;

    if (await this.authService.temUsuarioSalvo()) {
      this.authService.temUsuarioSalvo().then((usuarioSalvo) => {
        console.log(usuarioSalvo)
        if (usuarioSalvo['biometric'] == true) {
          this.authBiometric = true;
          this.showFingerprintAuthDlg();
        }
        else {
          this.authBiometric = false;
          this.salvarSenha = true;
        }

        this.loginForm.setValue({
          codigo: usuarioSalvo['codigo'],
          login: usuarioSalvo['login'],
          senha: usuarioSalvo['senha'],
        });
      })
    }

  }

  async ngOnInit() {

  }

  closeKeyboard() {
    if (this.loginForm.valid) {
      this.logInClick();
    }
  }

  async logInClick() {
    let deviceModelo = (await Device.getInfo()).model
    let deviceFabricante = (await Device.getInfo()).manufacturer
    this.login = Object.assign(this.login, this.loginForm.value,
      {
        deviceModelo: (deviceModelo ? deviceModelo : ''),
        deviceFabricante: (deviceFabricante ? deviceFabricante : ''),
        tokenFCM: await this.pushNotificationService.getCurrentTokenFirebase(),
        bundleId: this.env.empresaAtual.bundleId,
        biometric: (this.authBiometric == true ? this.authBiometric : false),
        appPersonalizado: this.env.empresaAtual.personalizado,
        versaoApp: this.versaoApp ? this.versaoApp : "1.3.0"
      });

    await this.authService.logIn(this.login, this.salvarSenha, deviceModelo)
      .then((response: any) => {
        // console.log(response);
        const params: NavigationExtras = {
          state: {
            navegar: false,
            urlNavegar: ''
          }
        }
        if (this.env.empresaAtual.personalizado == 2) {
          this.router.navigate(["/tabs"], params);
        }
        else {
          // console.log("res: ", response)
          if (response.contratos && response.contratos.length == 1) {
            this.router.navigate(["/tabs/tab2/home"], params);
          }
          else {
            this.router.navigate(["/tabs"], params);
          }
        }

      }).catch((err: any) => {
        console.log(err)
        this.customAlert.standardAlert("Alerta! 😔", `Não foi possível efetuar o login. ${err.message ? err.message : ""}`, "fail");
        console.log(err);
      });
  }

  async showFingerprintAuthDlg() {
    this.fingerprintOptions = {
      title: this.env.empresaAtual.appName,
      subtitle: 'Desbloqueie seu app',
      clientSecret: 'password',
      disableBackup: false,
      fallbackButtonTitle: 'Use password',
    }
    this.faio.isAvailable().then(result => {
      console.log(result)
      if (result === "biometric" || result === "face" || result === "finger") {
        this.faio.show(this.fingerprintOptions)
          .then((result: any) => {
            this.logInClick()
          })
          .catch((error: any) => {
            console.log(error)
          });

        if (result == "face") this.biometricMode = result;
      }
    })
      .catch((error: any) => { console.log(error) });
  }

  pageBkg() {
    if (this.env.empresaAtual.loginBkgImg)
      return 'url(../../../assets/png/fundo_login.png)'
    else return ''
  }
  showHide() {
    this.showPassword = !this.showPassword;
  }

  clearBiometricLogin() {
    this.authService.apagaUsuario();
    this.authService.apagaUsuarioBiometric();
    this.authService.salvaModoLogin(0);
    this.authBiometric = false;
  }

}
