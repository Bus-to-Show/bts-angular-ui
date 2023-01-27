//Here is an example of how you could implement user authentication with different access levels in an Angular application using TypeScript:
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { sha256 } from 'js-sha256';
import { environment } from '../../environments/environment'

export enum AccessLevel {
  Admin = 'admin',
  User = 'user',
}

export interface User {
  id: number;
  username: string;
  accessLevel: AccessLevel;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser?: User | null;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private apiURL = environment.API_URL;
  private authURL = `${this.apiURL}/users`


  // The salt value should be a random and long string
  private salt = 'SALT_VALUE_HERE';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    // Concatenate the password and the salt and hash the resulting string using SHA-256
    const saltedPassword = password + this.salt;
    const hashedPassword = sha256(saltedPassword);

    // Call the backend API to authenticate the user
    this.http.post<User>('/api/login', { username, password: hashedPassword }).subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    // Call the backend API to log out the user
    this.http.post('/api/logout', {}).subscribe(() => {
      this.currentUser = null;
    });
  }

  register(user: any): any {

    console.log('user in auth service::: ', user)
    const url = `${this.authURL}`;

    return this.http.post(url, user, this.httpOptions)
  }

  hasAccess(requiredLevel: AccessLevel) {
    return this.currentUser && this.currentUser.accessLevel === requiredLevel;
  }
}



//
// This service has a method login that authenticates the user and stores the user's information in the currentUser property. It also has a logout method that clears the currentUser property and a hasAccess method that checks if the user has the required access level.

/* 
This implementation concatenates the password and the salt value and hashes the resulting string using SHA-256. This makes it more difficult for an attacker to crack the hashed password, even if they know the hashing algorithm and the salt value, because they would also need to guess the original password.
Keep in mind that this is just one example of how you could add a salt to the password to increase security. There are other considerations to take into account, such as using a different hashing algorithm or generating a unique salt value for each user.
*/


// You can use the AuthService in your Angular components to protect routes or components that should only be accessible to certain users. For example:

/*

import { Component } from '@angular/core';
import { AuthService, AccessLevel } from './auth.service';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  constructor(private authService: AuthService) {
    if (!authService.hasAccess(AccessLevel.Admin)) {
      // Redirect the user to the login page or display an error message
    }
  }
}


*/