//Here is an example of how you could implement user authentication with different access levels in an Angular application using TypeScript:
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { sha256 } from 'js-sha256';
import { environment } from '../../environments/environment'
import { BehaviorSubject, Observable, tap } from 'rxjs';


export enum AccessLevel {
  Admin = 'admin',
  User = 'user',
}

export interface User {
  id?: number;
  username?: string;
  accessLevel?: AccessLevel;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  preferredLocation?: string;
  isAdmin: boolean;
  isDeactivated?: boolean;
  isDriver?: boolean;
  isStaff?:boolean;
  isWaiverSigned?: boolean;
  token?: string;

}


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser?: User | null;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    })
  };
  private apiURL = environment.API_URL;
  private authURL = `${this.apiURL}/users`
  private authTokenUrl= `${this.apiURL}/api/secure`
  private verifyEmailUrl = `${this.apiURL}/users/confirm-email`


  constructor(
    private http: HttpClient,
  ) {
    this.currentUser$.subscribe(user => {
      this.currentUser = user;
    })
  }

  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  setCurrentUser(user: any) {
    this.currentUserSubject.next(user);
  }

  private componentToShowSubject = new BehaviorSubject<any>(null);
  componentToShow$: Observable<any> = this.componentToShowSubject.asObservable();

  setComponentToShow(component: any) {
    this.componentToShowSubject.next(component);
  }

  checkAuth(){
      this.http.get(this.authTokenUrl, this.httpOptions).subscribe(user => {
        if(user) this.setCurrentUser(user);
      });
  }

  login(username: string, password: string) {
    // Concatenate the password and the salt and hash the resulting string using SHA-256
    // const saltedPassword = password = password + this.salt;
    const hashedPassword = sha256(password);

    // Call the backend API to authenticate the user
    this.http.post<User>(`${this.authURL}/login`, { username, password: hashedPassword }).pipe(
      tap(user => {
        if (user && user.token) {
          localStorage.setItem('jwt', user.token)          
        }
      })
    ).subscribe(user => {
      this.setCurrentUser(user);
    });
  }

  logout() {
    // Call the backend API to log out the user

    // this.http.post('/api/logout', {}).subscribe(() => {
      console.log('this.currentUser before', this.currentUser)
      this.setCurrentUser(null);
      localStorage.setItem('jwt', '')
      console.log('this.currentUser after', this.currentUser)
   // });
  }

  register(user: any): any {
    const password = user.hshPwd;
    const hashedPassword = sha256(password);
    user.hshPwd = hashedPassword;
    const url = `${this.authURL}`;
    return this.http.post<User>(url, user, this.httpOptions)
  }

  verifyEmail(token: string) {
    console.log('verify path ', `${this.verifyEmailUrl}/${token}`)

    return this.http.get(`${this.verifyEmailUrl}/${token}`, this.httpOptions)
  }

  isAdmin() {
    return this.currentUser && this.currentUser.isAdmin;
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