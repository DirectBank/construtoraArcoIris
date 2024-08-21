import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class CustomAlertService {

  constructor(
    private alertCtrl: AlertController
  ) { }

  async standardAlert(title: string, message: string, type: "standard" | "success" | "fail" = "standard") {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: message,
      cssClass: `${type}-custom-alert`,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: data => {
            console.log(data);
          }
        },
      ]
    });
    await alert.present();
  }

  async htmlAlert({ title, message }) {
    let alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          // handler: data => {
          //   console.log('Cancel clicked');
          // }
        },
      ]
    });
    await alert.present();
  }

  async confirmationAlert({ title, message, okFunction, cancelFunction }) {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: message,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: cancelFunction
        },
        {
          text: 'Sim',
          handler: okFunction
        }
      ]
    });
    await alert.present();
  }

  async htmlConfirmationAlert({ title, message, okText, okFunction, okEdit }: { title: string, message: string, okText, okFunction, okEdit?}) {
    let editButtons = [
      {
        text: okText,
        role: '',
        handler: okFunction
      },
      {
        text: 'Editar',
        role: 'edit',
        handler: okEdit
      },
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => { }
      },
    ];
    let noEditButtons =[
      {
        text: okText,
        role: '',
        handler: okFunction
      },
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => { }
      },
    ]
    let alert = await this.alertCtrl.create({
      header: title,
      message: message,
      backdropDismiss: false,
      buttons:okEdit? editButtons:noEditButtons
    });
    await alert.present();
  }
  
  async confirmation({title, message, okFunction, cancelFunction}: { title: string, message: string, okFunction,cancelFunction}) {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: message,
      cssClass: `custom-alert`,
      buttons: [
        {
          text: 'Não autorizar',
          handler: cancelFunction
        },
        {
          text: 'Autorizar',
          handler: okFunction
        },
      ],
      inputs: [
      {
        name: 'motivo',
        placeholder: 'Motivo'
      }
    ],
    });
    await alert.present();
  }
  async alertToken({ title, message,type,  okFunction }) {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: message,
      cssClass: `${type}-custom-alert`,
      buttons: [
        {
          text: 'OK',
          handler: okFunction
        },
      ],
      mode:'ios',
      backdropDismiss:false
    });
    await alert.present();
  }
}
