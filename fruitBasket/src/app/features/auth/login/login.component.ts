import { Component, inject } from '@angular/core';
import { AuthService, loginDetails } from '../../../core/services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ImportsModule } from '../../../shared/modules/imports/imports.module';
import { Router, RouterLink } from "@angular/router";
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ImportsModule,
    RouterLink,
    LoaderComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loader = false
  private _authService = inject(AuthService)
  private fb = inject(FormBuilder)
  private router = inject(Router)

  signInForm = this.fb.group({
    identifier: ["", [Validators.required, LoginComponent.identifierValidator]],
    password: ["", [Validators.required]]
  })

  static identifierValidator(controls: AbstractControl): ValidationErrors | null {

    const value = controls.value.trim()

    if (!value) return null

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (emailRegex.test(value) || usernameRegex.test(value) || phoneRegex.test(value)) {
      return null
    }

    return { invalidIdentifier: true };

  }

  onSubmit() {

    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched()
      return
    }

    const identifier = this.signInForm.value.identifier?.trim() || ""
    const password = this.signInForm.value.password || ""

    const payload: loginDetails = this.buildLoginPayload(identifier, password)

    this.loader = true

    this._authService.loginUser(payload)
    .pipe(finalize(()=>{this.loader = false}))
    .subscribe({
      next: (res) => {
        console.log('Login success', res);
        this.router.navigate(['/home'])
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }

  private buildLoginPayload(identifier: string, password: string): loginDetails {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    const payload: loginDetails = {
      password
    };

    if (emailRegex.test(identifier)) {
      payload.email = identifier;
    } else if (phoneRegex.test(identifier)) {
      payload.mobileNo = identifier;
    } else {
      payload.userName = identifier;
    }

    return payload;
  }

}
