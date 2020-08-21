import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated = false;

  constructor(private localStorageService: LocalStorageService) { }

  isAuthenticated() {
    return this.authenticated;
  }

  async signIn(email, password): Promise<boolean> {
    const that = this;
    return await new Promise((resolve, reject) => {
      if (email === 'adhar' && password === 'alooo') {
        that.authenticated = true;
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  signOut() {
    this.authenticated = false;
  }
}
