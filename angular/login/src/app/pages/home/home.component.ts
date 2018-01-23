import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../services/keycloak.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authenticated: boolean;

  constructor() {}

  ngOnInit() {
    this.authenticated = KeycloakService.auth.loggedIn;
  }
}
