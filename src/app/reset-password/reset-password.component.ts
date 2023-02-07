import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  
  form!: FormGroup;

  constructor(
    private authenticationService: AuthService,
    private changeDetectorRef: ChangeDetectorRef
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
        console.log('reset password response ------> ', response)
      })
    }
  }

  showLoginInstead() {
    this.authenticationService.setLoginOrReset('Login');
  }

}
