import { Injectable } from '@angular/core';

declare var Keycloak: any;

@Injectable()
export class KeycloakService {
  static auth: any = {};
  static adapter: any;

  static init(): Promise<any> {
    let keycloakAuth: any = new Keycloak({
      url: 'http://localhost:4002/auth',
      realm: 'Coopnore',
      clientId: 'coopnore-digital'
    });

    KeycloakService.auth.loggedIn = false;

    return new Promise((resolve, reject) => {
      keycloakAuth
        .init()
        .success(authenticated => {
          KeycloakService.adapter = keycloakAuth;

          if (authenticated) {
            KeycloakService.auth.loggedIn = true;
          }
          resolve(authenticated);
        })
        .error(error => {
          reject(error);
        });
    });
  }

  login(redirectUri?: string) {
    if (redirectUri) {
      return KeycloakService.adapter.login({ redirectUri: redirectUri });
    }
    return KeycloakService.adapter.login();
  }

  logout(redirectUri?: string) {
    if (redirectUri) {
      return KeycloakService.adapter.logout({ redirectUri: redirectUri });
    }
    return KeycloakService.adapter.logout();
  }

  constructor() {}
}
