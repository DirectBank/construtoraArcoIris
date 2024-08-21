import { UsuarioDAO } from './../../services/usuario/Usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { EmpreendimentosService } from 'src/app/services/empreendimentos/empreendimentos.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public contratos: UsuarioDAO[];

  constructor(
    public empreendimentosService: EmpreendimentosService,
    public authService: AuthenticationService,
    public userService: UsuarioService,
    private router: Router,
  ) { }

  async ionViewDidEnter() {
    this.contratos = this.userService.getContratos();
    console.log(this.contratos)
    // this.contratos = this.contratos.map((el) => {
    //   return { ...el, evolucao: 0 }
    // })
    // this.contratos.forEach((el)=>{
    //   this.empreendimentosService.mediaEvolucao().then((res: number) => {
    //     el["evolucao"] = res;
    //   }).catch(console.log)
    // });

  }

  changeContratoIndex(index:number){
    this.userService.setIndexContrato(index);
    this.navTo('')
  }

  navTo(page) {
    let params: NavigationExtras = {
      state: {

      }
    }

    this.router.navigate([`/tabs/tab2/home/${page}`], params);
  }
}
