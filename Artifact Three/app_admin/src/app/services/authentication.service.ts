import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { Authresponse } from '../models/authresponse';
import { TripDataService } from '../services/trip-data.service';

@Injectable({
  providedIn: 'root'
})

// authentication service class
export class AuthenticationService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }

  // get token
  public getToken(): string {
    return this.storage.getItem('travlr-token');
  }

  //save token
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // login user token
  public login(user: User): Promise<any> {
    return this.tripDataService.login(user)
      .then((authResp: Authresponse) =>
        this.saveToken(authResp.token));
  }

  // register user token
  public register(user: User): Promise<any> {
    return this.tripDataService.register(user)
      .then((authResp: Authresponse) =>
        this.saveToken(authResp.token));
  }

  // logout user token
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // is user logged in
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  // get user email and name according to token
  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } =
        JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    }
  }
}