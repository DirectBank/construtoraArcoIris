import { UsuarioService } from '../usuario/usuario.service';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'

import { PushNotifications } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(
    private userService: UsuarioService,
    private platform: Platform,
    private storage: Storage,
  ) { }

  isMobile(): boolean {
    return this.platform.is('android') || this.platform.is('ios');
  }

  onRecievedFCMTokenFirebase = async () => {

    if (this.isMobile()) {
      PushNotifications.register();
      PushNotifications.addListener(
        'registration',
        (token: any) => {
          this.storage.set("TOKENFCM", btoa(token.value));
        }
      );
    }
  }

  async getCurrentTokenFirebase() {
    return await atob(await this.storage.get("TOKENFCM"));
  }

}
