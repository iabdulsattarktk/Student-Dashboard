import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = false;

  constructor() {
    this.loggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  login(username: string, password: string): boolean {
    if (username === 'student' && password === '1234') {
      this.loggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedUser', username);
      return true;
    }
    return false;
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedUser');
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUsername(): string {
    return localStorage.getItem('loggedUser') || '';
  }
}
