import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide = true;

  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required ]),
    lastName: new FormControl('', [Validators.required ]), 
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get emailInput() { return this.registerForm.get('email'); }
  get passwordInput() { return this.registerForm.get('password'); }
  
  constructor() { }

  submitRegisterForm(): void {
    console.log(this.registerForm.value);
  }
}
