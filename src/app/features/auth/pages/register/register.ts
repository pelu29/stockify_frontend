import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { SocialIcons } from '@shared/components/social-icons/social-icons';

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

  constructor(private fb: FormBuilder) {
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
  }
  get f() {
    return this.registerForm.controls;
  }
}
