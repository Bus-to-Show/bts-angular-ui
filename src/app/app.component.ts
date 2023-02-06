import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from './../environments/environment';
import { AuthService, User } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = environment.title;
  currentUser!: User | null;
  isUserLoggedIn: boolean = false;
  isUserAdmin: boolean = false;
  isVerifyRoute = false;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
  }
  ngOnInit(): void {
    this.authService.authorizeAPI()
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isVerifyRoute = event.url.startsWith('/verify');
        if(this.isVerifyRoute){
          const token = event.url.substring(event.url.lastIndexOf('/') +1);
          this.authService.verifyEmail(token).subscribe((res:any) => {
            if (res.code === '200') {
              this.authService.setComponentToShow('emailConfirmed')
              this.isVerifyRoute = false;
              this.router.navigate(['/dashboard'])
            } else {
              this.authService.setComponentToShow('invalid')
            }
          });  
        } else {
          this.authService.checkAuth()
        }
      }
    });

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isUserLoggedIn = !!user;
      this.isUserAdmin = user && user.isAdmin;
    });
  }

  logout(): void {
    this.authService.logout()
  }
}
