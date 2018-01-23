import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../services/keycloak.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private kc: KeycloakService) {}

  ngOnInit() {
    this.kc.login('http://localhost:4200/home');
  }
}
