import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImportsModule } from '../../../shared/modules/imports/imports.module';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    ImportsModule
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {

  private fb = inject(FormBuilder)
  private _authService = inject(AuthService)

  contactForm!: FormGroup


  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submitForm(): void {
    if (this.contactForm.valid) {
      const rawData = this.contactForm.getRawValue()
      this._authService.contactMessage(rawData).subscribe({
        next: (res) => {
          console.log("message sent successfully", res)
          this.contactForm.reset()
        },
        error: (err) => {
          console.log("message is unable to deliverd", err)
        }
      })
    }
  }

}
