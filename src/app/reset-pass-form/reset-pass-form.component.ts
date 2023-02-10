import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-pass-form',
  templateUrl: './reset-pass-form.component.html',
  styleUrls: ['./reset-pass-form.component.scss']
})
export class ResetPassFormComponent implements OnInit {
  @Input() token: string = '';

  form!: FormGroup;
  decodedEmail: any;
  showPasswordsMismatchError: boolean = false;
  showPasswordConstraintsError: boolean = false;

  get email() { return this.form.value.email; }
  get password() { return this.form.value.password; }
  get confirmPassword() { return this.form.value.confirmPassword; }

  constructor(private router: Router,
    private authenticationService: AuthService,
    private jwtHelper: JwtHelperService,
    private _snackBar: MatSnackBar
    ) {
  }

  ngOnInit(): void {
    this.decodedEmail = this.getDecodedEmailFromToken();
    this.form = new FormGroup({
      email: new FormControl({value: this.decodedEmail, disabled: true}, [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }, 
    { validators: this.checkPasswords }
    );
  }

  public getDecodedEmailFromToken() {
    const decodedTokenObj =  this.jwtHelper.decodeToken(this.token);
    return decodedTokenObj.username;
  }

  //add logic to check for matching passwords


  passwordValidator(field: string): boolean {
      const stringToTest = field
      const longEnough = stringToTest && stringToTest.length >= 7;
      const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
      const hasSpecialChar = specialChar.test(stringToTest);
      const hasCapitalLetter = /[A-Z]/.test(stringToTest);
      const hasLowerCaseLetter = /[a-z]/.test(stringToTest);
      const hasNumericalCharacter = /\d/.test(stringToTest);

      const isValid = longEnough && hasSpecialChar && hasCapitalLetter && hasLowerCaseLetter && hasNumericalCharacter;

      return isValid ? true : false;
  }

  checkIfPasswordsMatch(form:FormGroup){
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password!.value === confirmPassword!.value ? true : false
  }

  //add logic to check for matching passwords

  checkPasswords: any = (form: FormGroup) => {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    this.showPasswordConstraintsError =  ( password && password.value) && !this.passwordValidator(password.value) 
    this.showPasswordsMismatchError = (password && password.value && confirmPassword && confirmPassword.value) && !this.checkIfPasswordsMatch(form)
  };
  
  
  
  

  resetIt() {
    if (this.form.valid) {
      const user = {
        hshPwd: this.password
      }
      this.form.disable()
      // Perform registration logic here, such as calling a REST API to create the user account
      // If the registration is successful, navigate to the login page
    this.authenticationService.verifyEmail(this.token, user).subscribe((res:any) => {
        //successfully reset
        this.openSnackBar(res.code, 'close')
        this.form.reset()
      } 
    )}
  }

  openSnackBar(code: string, action: string) {
    let messageToDisplay: string = ''
    if (code === '200'){
      messageToDisplay = 'Your password has been reset. You may now use it to log in.'
      action = 'Visit Login Page'
    } else if (code === '203') {
      messageToDisplay = `Too much time elapsed between your reset request and now...or maybe something else went wrong? Either way, you can click here to send yourself a fresh reset request email.`
      action = 'Resend Reset Email'
    } else {
      messageToDisplay = 'Something borked. Please try again';
      action = 'Resend Reset Email'
    }
    this._snackBar.open(messageToDisplay, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    }).onAction().subscribe(()=>{
      if (action === 'Visit Login Page'){
        this.router.navigate(['/dashboard']);
      }
      if(action === 'Resend Reset Email') {
        this.authenticationService.sendPasswordResetEmail(this.decodedEmail).subscribe((response: any) => {
          this.openResendResetSnackBar(response.code, 'close')
        })
      } else {
        this.router.navigate(['/dashboard']);
      }
    })
  }

  openResendResetSnackBar(code: string, action: string) {
    let messageToDisplay: string = ''
    if (code === '200'){
      messageToDisplay = 'Reset Email Sent. Please check your email.';
    } else if (code === '202') {
      messageToDisplay = `I didn't find an account matching that email address. Please try again or register a new account.`
    } else {
      messageToDisplay = 'try again';
    }
    this._snackBar.open(messageToDisplay, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    }).onAction().subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }


}
