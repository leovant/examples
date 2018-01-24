import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../services/keycloak.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(private kc: KeycloakService) {}

  ngOnInit() {
    this.kc.logout(
      window.location.protocol + '//' + window.location.host + '/home'
    );
  }
}
