import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate email field', () => {
    const email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();

    email.setValue('test');
    expect(email.valid).toBeFalsy();

    email.setValue('test@example.com');
    expect(email.valid).toBeTruthy();
  });

  it('should validate password field', () => {
    const password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();

    password.setValue('123');
    expect(password.valid).toBeFalsy();

    password.setValue('123456');
    expect(password.valid).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBeFalsy();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeTruthy();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeFalsy();
  });

  it('should have rememberMe field default to false', () => {
    const rememberMe = component.loginForm.controls['rememberMe'];
    expect(rememberMe.value).toBe(false);
  });
});