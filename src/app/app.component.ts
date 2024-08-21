import { PushNotificationService } from './services/push-notification/push-notification.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { CustomLoaderService } from './services/custom-loader/custom-loader.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
// import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { UsuarioService } from './services/usuario/usuario.service';
import { Keyboard,KeyboardResize } from '@capacitor/keyboard';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NavigationExtras, Router } from '@angular/router';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Login } from './services/authentication/Login';
import { CodePush } from '@ionic-native/code-push/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from '@capacitor/splash-screen';
import { PushNotifications } from '@capacitor/push-notifications';
import { ScreenOrientation } from '@capacitor/screen-orientation';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public env: any
  public showUpdate: boolean = false;
  public progressUpdate: number = 0;
  public svgs: string[] = new Array("mercado-interno_active", "video-conference", "mudanca", "manutencao", "reserva", "veiculos", "visitas", "achados-e-perdidos", "acordos", "agua", "boleto", "debitos", "documentos", "enquetes", "meus_dados", "ocorrencias", "pets", "reserva-rotativa", "processos", "servicos", "");
  public icon: string;
  public indexIcon: number = 1;
  public arrayDummy = Array(24)
  public versaoApp: string = "";
  public login: Login = new Login();
  public authBiometric: boolean = false;

  private Keyboard;
  private PushNotifications;

  constructor(
    private pushNotificationService: PushNotificationService,
    private androidPermissions: AndroidPermissions,
    // private screenOrientation: ScreenOrientation,
    private authService: AuthenticationService,
    private customLoader: CustomLoaderService,
    public usuarioService: UsuarioService,
    private appVersion: AppVersion,
    private platform: Platform,
    private codePush: CodePush,
    private storage: Storage,
    private router: Router,
    public device: Device,
  ) {

    // if (Capacitor.platform !== "web") {

    //   Keyboard.setResizeMode({ mode: KeyboardResize.Ionic })
    //     .then(console.log)
    //     .catch(console.log)

    //   Keyboard.addListener('keyboardWillShow', info => {
    //     console.log('keyboard will show with height:', info.keyboardHeight);
    //     if (this.platform.is('android')) {
    //       document.querySelector("body").style.bottom = info.keyboardHeight + "px";
    //     }
    //   });

    //   Keyboard.addListener('keyboardWillHide', () => {
    //     if (this.platform.is('android')) {
    //       document.querySelector("body").style.bottom = 0 + "px";
    //     }
    //   });
    // }

    this.env = environment;
    this.initializeApp();
    this.ngOnInit();
  }

  initializeApp() {

    if (this.platform.is('cordova')) {
      ScreenOrientation.lock({ orientation: 'portrait' });
      // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      SplashScreen.hide();
    }
    // if (Capacitor.platform !== "web") {
    //   console.log('entrei aqui');
      
    //   // ScreenOrientation.lock({ orientation: 'portrait' });
    //   this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

    //   if (this.platform.is('android')) {
    //     // this.checkPermissions()
    //   }
    //   SplashScreen.hide();
    // }
  }

  async ionViewWillEnter() {
    if (Capacitor.platform !== "web") {
      await this.platform.ready();
      this.appVersion.getVersionNumber().then(async (versao) => {
        this.versaoApp = await versao;
        return;
      });
    }
  }

  ngOnInit() {
    this.appUseFirebase();
  }

  ngAfterViewInit() {
  }

  // checkPermissions() {
  //   this.androidPermissions.requestPermissions([
  //     this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
  //     this.androidPermissions.PERMISSION.MANAGE_EXTERNAL_STORAGE,
  //     this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
  //   ]);

  //   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
  //     .then(
  //       result => {
  //         if (!result.hasPermission) {
  //           this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
  //         }
  //       }
  //     )
  //   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.MANAGE_EXTERNAL_STORAGE)
  //     .then(
  //       result => {
  //         if (!result.hasPermission) {
  //           this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.MANAGE_EXTERNAL_STORAGE)
  //         }
  //       }
  //     )
  //   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
  //     .then(
  //       result => {
  //         if (!result.hasPermission) {
  //           this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
  //         }
  //       }
  //     )
  // }

  async appUseFirebase() {
    if (Capacitor.platform !== "web") {
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }
    
    
      await PushNotifications.register();

      PushNotifications.addListener(
        'registration',
        (token: any) => {
          this.storage.set("TOKENFCM", btoa(token.value));
          console.log('Push registration success, token: ' + JSON.stringify(token));
        },
      );

      PushNotifications.addListener(
        'registrationError',
        (error: any) => {
          console.log('Error on registration: ' + JSON.stringify(error));
        });

      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification: any) => {
          console.log('Push received: ' + JSON.stringify(notification));
        },
      );

      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification: any) => {
          this.authService.temUsuarioSalvo().
            then(async (usuarioSalvo) => {
              this.login = Object.assign(this.login,
                {
                  codigo: usuarioSalvo['codigo'],
                  login: usuarioSalvo['login'],
                  senha: usuarioSalvo['senha'],
                  deviceModelo: (this.device.model ? this.device.model : ''),
                  deviceFabricante: (this.device.manufacturer ? this.device.manufacturer : ''),
                  tokenFCM: await this.pushNotificationService.getCurrentTokenFirebase(),
                  bundleId: this.env.empresaAtual.bundleId,
                  biometric: usuarioSalvo['biometric'],
                  appPersonalizado: this.env.empresaAtual.personalizado,
                  versaoApp: this.versaoApp ? this.versaoApp : "2.2.0"
                });

              await this.authService.logIn(this.login, true, this.device)
                .then((response: any) => {
                  this.customLoader.dismiss();
                  let params: NavigationExtras = {
                    state: {
                      navegar: true,
                      urlNavegar: `/tabs/${notification.notification?.data?.url}`
                    }
                  }
                  this.router.navigate(["/tabs"], params);
                }).catch((err: any) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err)
            })
          console.log('Push action performed: ' + JSON.stringify(notification));
        },
      );
    }
  }

}
