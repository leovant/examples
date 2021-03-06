import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { KeycloakService } from '../services/keycloak.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private kc: KeycloakService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (KeycloakService.auth.loggedIn) {
      return true;
    }
    this.kc.login(
      window.location.protocol + '//' + window.location.host + state.url
    );
    return false;
  }
}
