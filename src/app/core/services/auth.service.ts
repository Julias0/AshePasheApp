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

  // Example POST method implementation:
  async postData(url, data): Promise<any> {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  // postData('https://example.com/answer', { answer: 42 })
  //   .then(data => {
  //     console.log(data); // JSON data parsed by `data.json()` call
  // });

  async checkEmailExists(userEmail): Promise<any> {
    return this.postData('https://accounts.staging.fyle.in/routerapi/auth/basic/email_exists', {email: userEmail})
      .then(data => {
        console.log(data);
        return data
      })
  }

  
}
