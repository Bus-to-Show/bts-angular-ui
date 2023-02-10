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
    }),
    withCredentials: true
  };
 
  private apiURL = environment.API_URL;
  private authURL = `${this.apiURL}/users`;
  private authTokenUrl= `${this.apiURL}/api/secure`;
  private verifyEmailUrl = `${this.apiURL}/users/confirm-email`;
  private resetEmailUrl = `${this.apiURL}/users/reset-pass`;


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
  
  authorizeAPI(){
    this.http.get(`${this.apiURL}/api`, this.httpOptions).subscribe((token:any) => {
      if(token){
        document.cookie = `token=${token}`
      }
    });
  }

  private loginOrResetSubject = new BehaviorSubject<any>(null);
  loginOrReset$: Observable<any> = this.loginOrResetSubject.asObservable();

  setLoginOrReset(component: any) {
    this.loginOrResetSubject.next(component);
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

  sendPasswordResetEmail(username: string) {
    const url = `${this.authURL}/send-reset`;
    return this.http.post<User>(url, {username}, this.httpOptions)
  }

  logout() {
      this.setCurrentUser(null);
      localStorage.setItem('jwt', '')
  }

  register(user: any): any {
    const password = user.hshPwd;
    const hashedPassword = sha256(password);
    user.hshPwd = hashedPassword;
    const url = `${this.authURL}`;
    return this.http.post<User>(url, user, this.httpOptions)
  }

  verifyEmail(token: string, user?:any) {
    if (user){  
      const password = user.hshPwd;
      const hashedPassword = sha256(password);
    user.hshPwd = hashedPassword;
    user.resetToken = token
      return this.http.post(`${this.resetEmailUrl}`, user, this.httpOptions);
    } 
    else return this.http.get(`${this.verifyEmailUrl}/${token}`, this.httpOptions);
  }

  isAdmin() {
    return this.currentUser && this.currentUser.isAdmin;
  }
}

