import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;


  constructor(private authenticationService: AuthService) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    }, 
    //{ validators: this.checkPasswords }
    );
   }

  ngOnInit(): void {
  }
  get email() { return this.form.value.email; }
  get password() { return this.form.value.password; }


  login() {
    if (this.form.valid) {      
      const user = {
        email: this.email,
        hshPwd: this.password
      }
      
      // Perform registration logic here, such as calling a REST API to create the user account
      // If the registration is successful, navigate to the login page
      this.authenticationService.login(this.email, this.password)
      
    //   .subscribe((res: any)=> {
    //     console.log('authentication response is back!', res)
    //     this.router.navigate(['/detail/40300431']);

    //   })
    }
  }

}
