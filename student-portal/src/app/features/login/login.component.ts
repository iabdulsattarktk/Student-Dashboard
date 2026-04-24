import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.errorMsg = 'Please enter both username and password.';
      return;
    }
    const success = this.authService.login(this.username, this.password);
    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMsg = 'Wrong credentials. Use: student / 1234';
    }
  }
}
