import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  componentToShow: 'exists' | 'invalid' | 'checkEmail' | 'emailConfirmed' | 'none' = 'none'
  constructor(private authService: AuthService,
    ) { }
  
  ngOnInit(): void {
    this.authService.componentToShow$
    .subscribe(component => {
      console.log('now what is the component to show??????  ', component)
      this.componentToShow = component;

    });
  }

}
