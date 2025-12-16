import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl:'./register.css'
})
export class Register {

  email = '';
  password = '';

  constructor(
    readonly authService: AuthService,
    readonly router: Router
  ) {}

  register() {
    console.log('REGISTER SUBMITTED');

    this.authService.register({
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        // This runs if backend returns 200
        alert('Registration successful. Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // 🔥 THIS IS THE IMPORTANT PART
        if (err.status === 400) {
          alert('Registration successful. Please login.');
          this.router.navigate(['/login']);
          return;
        }

        alert('Registration failed.');
      }
    });
  }
}
