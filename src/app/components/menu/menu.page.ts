import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { enterAnimation, leaveAnimation } from 'src/app/animations/modal-animations';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { NavParams, ModalController } from '@ionic/angular';
import { SettingsPage } from '../settings/settings.page';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})

export class MenuPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public modalController: ModalController,
    public userService: UsuarioService,
    public navParams: NavParams,
    public router: Router,

  ) { }

  ngOnInit() {
    // this.openSettings();
  }

  async openSettings() {
    const modal = await this.modalController.create({
      component: SettingsPage,
      cssClass: 'my-custom-settings',
      swipeToClose: true,
      id: 'settings',
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
    if (data.navTo) {
      // this.fechar();
      this.navTo(data.navTo);
    }
  }

  navTo(page) {
    let params: NavigationExtras = {
      state: {
      }
    }

    this.router.navigate([`/tabs/tab2/home/${page}`], params);
    this.fechar();
  }

  fechar() {
    this.modalController.dismiss(undefined, undefined, 'menu');
  }

  sair() {
    this.fechar();
    this.authService.logout();
  }

}
