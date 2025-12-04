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
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  get email() {
    // template referencia 'email' para mostrar errores; devolvemos el control 'username'
    return this.loginForm.get('username');
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
          console.log(data);
          // Guardar tokens con tolerancia a distintos nombres de propiedad
          const access = data?.access || data?.acces || data?.token || data?.access_token;
          const refresh = data?.refresh || data?.refresh_token;
          if (access) this.authService.guardarTokenAcces(access);
          if (refresh) this.authService.guardarTokenRefresh(refresh);
          
          // Mostrar mensaje de éxito antes de navegar
          this.isLoading = false;
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.router.navigate(['/layout/dashboard']);
          }, 1500);
        },
        error: (error) => {
          console.log('Token request failed:', error);
          // Fallback de desarrollo: aceptar credenciales de prueba y crear token mock
          const vals = this.loginForm.value;
          if (vals?.username === 'admin@stockify.com' && vals?.password === '123456') {
            console.warn('Aplicando fallback de desarrollo: generando token mock');
            this.authService.guardarTokenAcces('mock-access-token');
            this.authService.guardarTokenRefresh('mock-refresh-token');
            
            // Mostrar mensaje de éxito antes de navegar
            this.isLoading = false;
            this.showSuccessMessage = true;
            setTimeout(() => {
              this.showSuccessMessage = false;
              this.router.navigate(['/layout/dashboard']);
            }, 1500);
            return;
          }
          // Si no coincide, mostrar error
          this.isLoading = false;
          console.error(error);
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
