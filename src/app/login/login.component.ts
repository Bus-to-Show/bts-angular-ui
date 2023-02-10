import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;


  constructor(
    private authenticationService: AuthService,
  
    ) {
    }
    
    ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    }, 
    //{ validators: this.checkPasswords }
    );
  }
  get email() { return this.form.value.email; }
  get password() { return this.form.value.password; }


  login() {
    if (this.form.valid) {
      this.authenticationService.login(this.email, this.password)
    }
  }

  showResetInstead() {
    this.authenticationService.setLoginOrReset('Reset');
  }

}
