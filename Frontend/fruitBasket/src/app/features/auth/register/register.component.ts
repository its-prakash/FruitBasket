import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImportsModule } from '../../../shared/modules/imports/imports.module';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ImportsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private _authService = inject(AuthService)
  public fb = inject(FormBuilder)
  private router = inject(Router)

  signUpForm = this.fb.group({

    fullName: ["", [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]+')]],
    userName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9_]+')]],
    mobileNo: ["", [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9$@$!%*?&]{8,}$')]],
    confirmPassword: ["", [Validators.required]]

  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value

    return password == confirmPassword ? true : false
  }


  onSubmit() {

    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return
    }

    const data = this.signUpForm.getRawValue();
    this._authService.registerUser(data).subscribe({
      next: (res) => {
        console.log(res)
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.log("register unsuccessfull", err)
      }
    })

  }

}
