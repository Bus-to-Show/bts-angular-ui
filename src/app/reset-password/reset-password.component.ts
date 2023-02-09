import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  
  form!: FormGroup;
  resetRequested: boolean = false;
  resetResponse: 'email sent' | 'no such' | 'try again' | 'unsent' = 'unsent';

  constructor(
    private authenticationService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar
    ) {
    }
    
    ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    }, 
    //{ validators: this.checkPasswords }
    );
    this.changeDetectorRef.detectChanges();

  }
  get email() { return this.form.value.email; }

  sendPasswordResetEmail() {
    console.log('does this click even work??? ', this.email)
    if (this.form.valid) {      
      this.authenticationService.sendPasswordResetEmail(this.email).subscribe((response: any) => {
        this.resetRequested = true
        this.form.reset()
        this.openSnackBar(response.code, 'close')
        console.log('reset response ====> ', response, 'and resetResponse ====> ', this.resetResponse)
      })
    }
  }
 
  openSnackBar(code: string, action: string) {
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
    });
  }
  
  showLoginInstead() {
    this.authenticationService.setLoginOrReset('Login');
  }

}
