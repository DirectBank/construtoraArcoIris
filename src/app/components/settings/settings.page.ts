import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { enterAnimation, leaveAnimation } from 'src/app/animations/modal-animations';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { NavParams, ModalController } from '@ionic/angular';
import { PasswordPage } from './../password/password.page';
import { Component, OnInit } from '@angular/core';
import { LgpdPage } from '../lgpd/lgpd.page';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

export class SettingsPage implements OnInit {

  public imagem: any;
  public showAuthBiometric: boolean = false;
  public usarBiometria: boolean = false;

  constructor(
    public authService: AuthenticationService,
    public modalCtrl: ModalController,
    private faio: FingerprintAIO,
    public navParams: NavParams,
    private storage: Storage,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.faio.isAvailable().then(result => {
      if (result === "biometric" || result === "face" || result === "finger") {
        this.showAuthBiometric = true
        this.storage.get("SAVE_AUTH").then((result) => {
          result == true ? this.usarBiometria = true : this.usarBiometria = false;
        })
          .catch((err) => {
            this.showAuthBiometric = false
            this.usarBiometria = false
          })
      }
    })
      .catch((error: any) => { console.log(error); });

  }

  async openPassword(isChangePassword: boolean = false, isBiometricLogin: boolean = false, event) {

    let pedirSenha = true;
    if (event.detail.checked == false) pedirSenha = false;
    else if (event.detail.checked && (await this.storage.get("SAVE_AUTH")) == true) pedirSenha = false;
    
    await this.storage.set("SAVE_AUTH", event.detail.checked);
    this.usarBiometria = event.detail.checked;

    if (this.usarBiometria!=undefined && !this.usarBiometria) {
      this.authService.apagaUsuarioBiometric();
      this.authService.apagaUsuario();
      this.authService.salvaModoLogin(0);
      return;
    }
    
    if (pedirSenha) {
      const modal = await this.modalCtrl.create({
        component: PasswordPage,
        cssClass: 'my-custom-' + (isChangePassword ? 'change-password' : 'password'),
        componentProps: {
          isChangePassword: isChangePassword,
          isBiometricLogin: isBiometricLogin
        },
        enterAnimation: enterAnimation,
        leaveAnimation: leaveAnimation
      });
      return await modal.present();
    }
  }

  async openLGPD(aceite: boolean = false) {
    const modal = await this.modalCtrl.create({
      component: LgpdPage,
      cssClass: 'custom-modal-lgpd',
      backdropDismiss: true,
      swipeToClose: true,
      componentProps: {
        aceite: true
      }
    });
    return await modal.present();
  }

  navTo(page) {
    this.modalCtrl.dismiss({ navTo: 'meus-dados' });
  }

  fechar() {
    this.modalCtrl.dismiss();
  }

}
