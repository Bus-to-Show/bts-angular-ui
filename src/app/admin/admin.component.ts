import { Component, OnInit } from '@angular/core';
import { AuthService, AccessLevel } from '../services/auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService) {
    if (!authService.hasAccess(AccessLevel.Admin)) {
      // Redirect the user to the login page or display an error message
      console.log('user should not have access')
    } else {
      console.log('user should have access')
    }
  }

  ngOnInit(): void {
  }

}
