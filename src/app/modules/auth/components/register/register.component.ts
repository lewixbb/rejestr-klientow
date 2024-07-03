import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { PostUser } from '../../../core/models/user.model';
import { Router } from '@angular/router';
import { FormsService } from '../../../core/services/forms.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  errorMessage = '';

  registerForm = new FormGroup(
    {
      email: new FormControl('', {
        validators: [
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
        nonNullable: true,
      }),
      username: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    },
    // { updateOn: 'submit' },
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private forms: FormsService,
  ) {}

  get controls() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    // this.registerForm.controls.email.valueChanges.subscribe((text) => {
    //   console.log(text);
    // });
    console.log();
    // this.controls.email.hasError('email');
    // this.registerForm.controls.email.disable();
    this.controls.username.addValidators(Validators.minLength(5));
  }

  getErrorMessage(control: FormControl) {
    return this.forms.getErrorMessage(control);
  }

  onRegister() {
    const registerData: PostUser = this.registerForm.getRawValue();
    this.authService.register(registerData).subscribe({
      next: () => {
        this.router.navigate(['logowanie']);
      },
      error: () => {
        this.errorMessage = 'Wystąpił błąd';
      },
    });
    // console.log(this.registerForm.value);
    // console.log(this.registerForm.getRawValue());
  }
}
