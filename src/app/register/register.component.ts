
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userInfo } from 'os';
import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  form: FormGroup;


  get firstName() { return this.form.value.firstName; }
  get lastName() { return this.form.value.lastName; }
  get email() { return this.form.value.email; }
  get password() { return this.form.value.password; }
  get confirmPassword() { return this.form.value.confirmPassword; }

  constructor(private router: Router,
    private authenticationService: AuthService
    ) {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }, 
    //{ validators: this.checkPasswords }
    );
  }
  ngOnInit(): void {
  }


  //add logic to check for matching passwords

  checkPasswords(form: FormGroup) {
    
    const password = this.password;
    const confirmPassword = this.confirmPassword;

    return password?.value === confirmPassword?.value ? null : { notSame: true };
  }

  register() {
    if (this.form.valid) {
      const user = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        hshPwd: this.password
      }
      
      // Perform registration logic here, such as calling a REST API to create the user account
      // If the registration is successful, navigate to the login page
      this.authenticationService.register(user).subscribe((res:any) => {
        console.log('res.code inside authService.register =========>>.>>. ', res.code)
        if(res.code === '202'){
          //user email already in database
          this.authenticationService.setComponentToShow('exists')
        } else if (res.code === '203') {
          //token has expired
          this.authenticationService.setComponentToShow('invalid')
        } else if (res.code === '200') {
          //successfully registered
          this.authenticationService.setComponentToShow('checkEmail')
        } 
        this.form.reset()
      })
      
      
    //   .subscribe((res: any)=> {
    //     console.log('authentication response is back!', res)
    //     this.router.navigate(['/detail/40300431']);

    //   /*
     
     
    
    //     */

    //   })
    }
  }
}
