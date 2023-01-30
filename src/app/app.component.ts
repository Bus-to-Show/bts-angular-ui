import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isUserLoggedIn = !!user;
    });
  }
}
