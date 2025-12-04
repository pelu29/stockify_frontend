import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service'; // 👈 servicio real

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Propiedades del formulario
  loginForm!: FormGroup;
  loading: boolean = false;
  errorMessage: string | null = null;

  // Estado del usuario (para el *ngIf y roles)
  hasActiveSession: boolean = this.authService.isLoggedIn();
  userRole: string | null = this.authService.getUserRole();

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  /** Iniciar sesión */
  onSubmit(): void {
    this.errorMessage = null;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        console.log('Inicio de sesión exitoso:', res);
        this.hasActiveSession = this.authService.isLoggedIn();
        this.userRole = this.authService.getUserRole();
        this.loading = false;
        // navegar al dashboard una vez autenticado
        try { this.router.navigate(['/layout/dashboard']); } catch (e) { /* ignore */ }
      },
      error: (err) => {
        console.error('Error de autenticación:', err);
        this.errorMessage = 'Credenciales inválidas o error al iniciar sesión.';
        this.loading = false;
      }
    });
  }

  /** Selección de rol */
  selectRole(role: string): void {
    this.authService.setRole(role);
    this.userRole = this.authService.getUserRole();
  }

  /** Cerrar sesión */
  logout(): void {
    this.authService.logout();
    this.hasActiveSession = this.authService.isLoggedIn();
    this.userRole = this.authService.getUserRole();
  }
}
