import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CustomAlertService } from './../../services/custom-alert/custom-alert.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from 'src/app/services/authentication/Login';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { environment } from 'src/environments/environment';
import { Device } from '@ionic-native/device/ngx';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.page.html',
  styleUrls: ['./esqueci-senha.page.scss'],
})

export class EsqueciSenhaPage implements OnInit {

  private esqueciASenha: boolean = false;
  public salvarSenha: boolean = false;
  public login: Login = new Login();
  public esqueciSenhaForm: FormGroup;
  public versaoApp: string = "";
  public env: any;

  constructor(
    public authService: AuthenticationService,
    public customAlert: CustomAlertService,
    public usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private appVersion: AppVersion,
    private platform: Platform,
    private storage: Storage,
    public device: Device,
  ) {
    this.env = environment

    this.esqueciSenhaForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
    });

  }

  async ionViewWillEnter() {
    await this.platform.ready();
    this.appVersion.getVersionNumber().then(async (versao) => {
      this.versaoApp = await versao;
      return;
    });
  }

  async ngOnInit() {
    // if (this.env.empresaAtual.codigo != "00009013") {
    //   await this.storage.set("CODIGO", btoa(this.esqueciSenhaForm.value.codigo));
    // }

  }

  closeKeyboard() {
    if (this.esqueciSenhaForm.valid) {
      this.esqueciSenha();
    }
  }

  async esqueciSenha() {

    let cpf = this.esqueciSenhaForm.value.cpf;
    let email = this.esqueciSenhaForm.value.email;

    await this.authService.esqueciAsenha(cpf, email)
      .then((response: any) => {

        console.log(response)
        this.customAlert.standardAlert("Sucesso", `Foi enviado uma mensagem para seu e-mail com a solicitação de redefinição de senha`, "success");

      }).catch((err: any) => {
        console.log(err)
        this.customAlert.standardAlert("Alerta! 😔", `Não foi possível efetuar o login. ${err.message ? err.message : ""}`, "fail");
        console.log(err);
      });
  }


  pageBkg() {
    if (this.env.empresaAtual.loginBkgImg)
      return 'url(../../../assets/png/fundo_login.png)'
    else return ''
  }
}
