import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';
  errorMessage = '';

  constructor(
    readonly authService: AuthService,
    readonly router: Router
  ) {}

  login() {
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        // backend returns token
        this.authService.saveToken(res.token);
        this.errorMessage = '';

        // redirect after login
        this.router.navigate(['/students']);
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }

  
}


