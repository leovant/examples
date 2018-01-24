import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { KeycloakService } from './services/keycloak.service';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { LogoutComponent } from './pages/logout/logout.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ProfileComponent, LogoutComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [KeycloakService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
