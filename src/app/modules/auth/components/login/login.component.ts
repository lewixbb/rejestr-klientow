import { Component } from '@angular/core';
import { UserLoginData } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;

  userData: UserLoginData = {
    username: '',
    password: '',
  };

  errorMessage = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.userData).subscribe({
      next: (value) => {
        if (value.length === 0) {
          this.errorMessage = 'nieprawidłowy użytkownik lub hasło';
        } else {
          this.errorMessage = '';
        }
      },
      error: (err) => {
        this.errorMessage = 'Wystąpił błąd';
      },
    });
  }
}
