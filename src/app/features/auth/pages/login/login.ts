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
      username: ['', [Validators.required,]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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

      try {

        //Intentamos obtener token del backend

        this.authService.ObtenerToken(this.loginForm.value).subscribe({
          next: (data) => {
            console.log(data);
            this.authService.guardarTokenAcces(data.acces);
            this.authService.guardarTokenRefresh(data.refresh);
          },
          error: (error) => {
            console.log(error);
          }
        })

        //debe estar dentro de next de la linea 49
        setTimeout(() => {
          this.isLoading = false;
          this.showSuccessMessage = true;

          console.log('Login exitoso:', this.loginForm.value);

          // 🔹 Espera 1 segundo y navega al componente import-report
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.router.navigate(['/layout']);
          }, 1000);

        }, 1500);

      } catch (err) {
        console.log("Algo salio mal: " + err);
      }

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
