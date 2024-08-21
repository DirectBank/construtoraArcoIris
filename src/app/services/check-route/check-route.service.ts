import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';

@Injectable()
export class CheckRoute implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (this.router.routerState.snapshot.url === "/tabs/tab2/home" ||
        this.router.routerState.snapshot.url === "/tabs/select-contrato" ) {
      return true;
    } else {
      this.router.navigate(['/tabs/select-contrato']);
      return false;
    }
  }

}