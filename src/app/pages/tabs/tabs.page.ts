                                                       import { PasswordPage } from './../../components/password/password.page';
import { enterAnimation, leaveAnimation } from 'src/app/animations/modal-animations';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { AnimationController, ModalController } from '@ionic/angular';
import { LgpdPage } from './../../components/lgpd/lgpd.page';
import { MenuPage } from './../../components/menu/menu.page';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(
    public animationCtrl: AnimationController,
    public modalController: ModalController,
    public userService: UsuarioService,
  ) { }

  ngOnInit() {

    // if (!this.userService.getUsuario().id_lgpd){
    //   this.openLGPD();
    // }
    // this.openMenu();

  }

  ionViewDidEnter() {
    if (this.userService.getUsuario().alterarSenha == 1) {
      this.openAlterarSenha(false);
    }
    if (this.userService.getUsuario().aceiteLGPD == 0) {
      this.openLGPD();
    }
  }


  async openMenu() {
    const modal = await this.modalController.create({
      component: MenuPage,
      cssClass: 'my-custom-menu',
      id: 'menu',
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation
    });
    return await modal.present();
  }

  async openLGPD(aceite: boolean = false) {
    const modal = await this.modalController.create({
      component: LgpdPage,
      cssClass: 'custom-modal-lgpd',
      backdropDismiss: aceite,
      swipeToClose: aceite,
      componentProps: {
        aceite: aceite
      }
    });
    return await modal.present();
  }

  async openAlterarSenha(isChangePassword) {
    const modal = await this.modalController.create({
      component: PasswordPage,
      cssClass: 'my-custom-' + (isChangePassword ? 'change-password' : 'password'),
      backdropDismiss: isChangePassword,
      swipeToClose: isChangePassword,
      componentProps: {
        isChangePassword: isChangePassword
      },
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation
    });
    return await modal.present();
  }

}
