import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { NavParams, ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage'
import { Device } from '@ionic-native/device/ngx';
import { Login } from 'src/app/services/authentication/Login';
import { PushNotificationService } from 'src/app/services/push-notification/push-notification.service';
import { environment } from 'src/environments/environment';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  @Input('changePassword') isChangePassword: boolean = false;
  @Input('changePassword') isBiometricLogin: boolean = false;
  public showAuthBiometric: boolean = false;
  public authBiometric: boolean = false;
  public login: Login = new Login();
  public versaoApp: string = "";
  public env: any;

  public senha = {
    senhaAntiga: '',
    senhaNova: '',
    confirmarSenha: null
  }

  constructor(
    private pushNotificationService: PushNotificationService,
    public authService: AuthenticationService,
    public modalController: ModalController,
    public userService: UsuarioService,
    public modalCtrl: ModalController,
    public alert: CustomAlertService,
    private appVersion: AppVersion,
    private faio: FingerprintAIO,
    public navParams: NavParams,
    private storage: Storage,
    public device: Device,

  ) {
    this.env = environment;
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.appVersion.getVersionNumber().then(async (versao) => {
      this.versaoApp = await versao;
    });

  }

  async alterarSenha() {
    if (this.isBiometricLogin) {
      console.log(this.userService.getUsuario())
      Object.assign(this.login,
        {
          codigo: this.env.empresaAtual.codigo,
          login: this.userService.getUsuario().doc,
          senha: this.senha.senhaAntiga,
          deviceModelo: (this.device.model ? this.device.model : ''),
          deviceFabricante: (this.device.manufacturer ? this.device.manufacturer : ''),
          tokenFCM: await this.pushNotificationService.getCurrentTokenFirebase(),
          bundleId: this.env.empresaAtual.bundleId,
          biometric: (this.isBiometricLogin == true ? this.isBiometricLogin : false),
          appPersonalizado: this.env.empresaAtual.personalizado,
          versaoApp: this.versaoApp ? this.versaoApp : "1.0.0"
        });

      await this.authService.logIn(this.login, false, '')
        .then(async (response: any) => {
          await this.authService.salvaUsuarioBiometric(this.login)
          this.authService.salvaModoLogin(2);
          this.alert.standardAlert("Sucesso", "Alterações salvas com sucesso", "success");
          this.modalController.dismiss()
        }).catch((err: any) => {
          this.alert.standardAlert("Alerta! 😔", `Senha incorreta `, "fail");

        });
    }
    else {

      if (this.isChangePassword) {
        this.authService.alterarSenha(this.senha.senhaAntiga, this.senha.senhaNova).then((res) => {
          console.log(res)
          this.alert.standardAlert("Sucesso", "Alterações salvas com sucesso.", "success");
          this.fechar();
        }).catch(err => {
          if (err.error && err.error.message) {
            this.alert.standardAlert("Erro.", err.error.message, "fail");
          }
          else {
            this.alert.standardAlert("Erro.", `Algo deu errado, sua solicitação não pode ser registrada `, "fail");
          }
        })
      }
      else {

        this.authService.alterarSenha('', this.senha.senhaAntiga).then((res) => {
          console.log(res)
          this.alert.standardAlert("Sucesso", "Alterações salvas com sucesso.", "success");
          this.fechar();
        }).catch(err => {
          if (err.error && err.error.message) {
            this.alert.standardAlert("Erro.", err.error.message, "fail");
          }
          else {
            this.alert.standardAlert("Erro.", `Algo deu errado, sua solicitação não pode ser registrada `, "fail");
          }
        })
      }

    }

  }

  fechar() {
    this.modalCtrl.dismiss();
  }

  sair() {
    this.fechar();
    this.authService.logout();
  }

}
