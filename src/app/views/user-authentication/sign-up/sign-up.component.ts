import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      fullName: [
        " ",[
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]+')
        ]
      ],
      username: [
        " ", [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z0-9_]+')
        ]
      ],
      mobileNo: [
        " ", [
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ]
      ],
      email: [
        " ", [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        "", [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9$@$!%*?&]{8,}$')
        ]
      ],
      confirmPassword: [
        "", [
          Validators.required
        ]
      ]
    })
  }

  onSubmit() {
    console.log(this.signUpForm.getRawValue())
  }

}
