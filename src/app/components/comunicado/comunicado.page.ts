import { Component, Input, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CustomAlertService } from 'src/app/services/custom-alert/custom-alert.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'comunicado',
  templateUrl: './comunicado.page.html',
  styleUrls: ['./comunicado.page.scss'],
})
export class ComunicadoPage implements OnInit {

  @Input() public titulo: string = "";
  @Input() public mensagem: string = "";

  constructor(
    public authService: AuthenticationService,
    public userService: UsuarioService,
    public modalCtrl: ModalController,
    public alert: CustomAlertService,
    public utilService: UtilService,
    public modal: ModalController,
    private platform: Platform,
    public iab: InAppBrowser,
    private router: Router,

  ) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {

  }

  fechar() {
    this.modalCtrl.dismiss();
  }

}
