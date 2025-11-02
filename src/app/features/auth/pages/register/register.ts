import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { SocialIcons } from '@shared/components/social-icons/social-icons';
import { Usuarios } from 'src/app/services/usuarios/usuarios';
import { Usuario } from 'src/app/models/usuarios/usuarios.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SocialIcons],
  templateUrl: './register.html'
})
export class Register {
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  submitted = false;
  successMessage = '';

  constructor(private fb: FormBuilder, private router:Router,private usuarioService:Usuarios) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[1-9]\\d{1,14}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      agreeToTerms: [false, [Validators.requiredTrue]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  // Submit del formulario
  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.valid) {

      const formValue = this.registerForm.value;
      
      const nuevoUsuario = new Usuario(
        formValue.firstName,
        formValue.lastName,
        formValue.email,
        formValue.phoneNumber,
        formValue.password
      )

      console.log("Instancia de usuario: " , nuevoUsuario);
      console.log(this.usuarioService.agregarUsuario(nuevoUsuario));

      // Mostrar mensaje de éxito
      this.successMessage = '✓ Account created successfully!';

      console.log('Form Data:', this.registerForm.value);
      console.log('Registration successful!');

      setTimeout(() => {
        this.registerForm.reset();
        this.submitted = false;
        this.successMessage = '';
      }, 3000);
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });

      console.log('Form is invalid', this.registerForm.errors);
    }

    this.navigate('categorias');
  }
  get f() {
    return this.registerForm.controls;
  }

  navigate(ruta:string){
    this.router.navigate([`/${ruta}`]);
  }
}
