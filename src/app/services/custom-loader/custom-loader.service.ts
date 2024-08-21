import { LoadingController, Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CustomLoaderService {

  public env: any
  public isLoading = false;
  public sub: any;

  constructor(
    public loadingCtrl: LoadingController,
    public platform: Platform
  ) {
    this.env = environment
  }

  public async dismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => {
      if (this.sub) this.sub.unsubscribe();
      // console.log('dismissed')
    });
  }

  public async show() {
    if (this.sub) this.sub.unsubscribe();
    this.isLoading = true;
    return await this.loadingCtrl.create({
      cssClass: 'custom-loader',
      spinner: null,
      // backdropDismiss: true,
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => {
            // console.log('abort presenting')
          });
        }
      });
    });
  }

}

