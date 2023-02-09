
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userInfo } from 'os';
import { AuthService, User } from '../services/auth.service';
import { MatError } from '@angular/material/form-field';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  form: FormGroup;
  showConfirmPassError: boolean = false;

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
      const hasSpecialChar = specialChar.test(control.value);
      const hasCapitalLetter = /[A-Z]/.test(control.value);
      const hasLowerCaseLetter = /[a-z]/.test(control.value);
      const hasNumericalCharacter = /\d/.test(control.value);
  
      const isValid = hasSpecialChar || hasCapitalLetter || hasLowerCaseLetter || hasNumericalCharacter;
      console.log('password constraints isValid ', isValid)
      return isValid ? { 'password': true } : { 'password': false };
    };
  }

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
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', Validators.required)
    }, 
    { validators: this.checkPasswords }
    );
  }
  ngOnInit(): void {
  }


  //add logic to check for matching passwords

  checkPasswords: any = (form: FormGroup) => {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if(password && password.value && confirmPassword && confirmPassword.value){
       this.showConfirmPassError = password.value !== confirmPassword.value
    } else {
      this.showConfirmPassError = false;
    }
  };

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
      
    }
  }
}
