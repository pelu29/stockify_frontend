import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  showSuccessMessage = false;
  showPassword = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
        this.showSuccessMessage = true;

        console.log('Login exitoso:', this.loginForm.value);

        // 🔹 Espera 1 segundo y navega al componente import-report
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigate(['/import-report']);
        }, 1000);

      }, 1500);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  navegar(ruta: string) {
    this.router.navigate([`/${ruta}`]);
  }
}
