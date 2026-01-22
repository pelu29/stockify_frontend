import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from 'src/app/services/usuarios/auth';

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

  constructor(private fb: FormBuilder, private router: Router, private authService: Auth) {
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

      this.authService.ObtenerToken(this.loginForm.value).subscribe({
        next: (data) => {
          console.log('✅ Respuesta del backend:', data);

          // ✅ CORRECCIÓN: access con dos 's'
          if (!data.access || !data.refresh) {
            console.error('❌ Error: El backend no devolvió tokens correctamente');
            this.isLoading = false;
            return;
          }

          // Guardar tokens correctamente
          this.authService.guardarTokenAcces(data.access);  // ← access (dos 's')
          this.authService.guardarTokenRefresh(data.refresh);

          // Verificar que se guardaron
          console.log('💾 Access token guardado:', localStorage.getItem('access') ? 'SÍ' : 'NO');
          console.log('💾 Refresh token guardado:', localStorage.getItem('refresh') ? 'SÍ' : 'NO');

          // Mostrar mensaje de éxito
          this.showSuccessMessage = true;

          // Redirigir después de 1 segundo
          setTimeout(() => {
            this.isLoading = false;
            this.showSuccessMessage = false;
            this.router.navigate(['/layout/productos']);
          }, 1000);
        },
        error: (error) => {
          console.error('❌ Error en login:', error);
          this.isLoading = false;
          alert('Usuario o contraseña incorrectos');
        }
      });

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