import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser: User;

  constructor() {
    this.currentUser = {
      id: 'ciubqoioqienqeixqoien1231',
      fullname: 'Aloo Man',
      email: 'aloo@aloo.com',
      location: {
        latitude: 123,
        longitude: 23
      },
      createdAt: new Date()
    };
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setUser(user: User) {
    this.currentUser = user;
  }
}
