import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { KeycloakService } from './app/services/keycloak.service';

if (environment.production) {
  enableProdMode();
}

KeycloakService.init()
  .then(authenticated => {
    console.debug('Keycloak initialized. Auth: ', authenticated);
  })
  .catch(error =>
    console.debug('Keycloak could not be initialized. Error: ', error)
  );

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
