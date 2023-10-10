import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

// navbar component class
export class NavbarComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() { }

  // is the user logged in 
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  // is the user logged out
  private onLogout(): void {
    return this.authenticationService.logout();
  }
}