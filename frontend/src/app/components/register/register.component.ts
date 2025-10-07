import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="register-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Crear Cuenta</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="fill">
              <mat-label>Nombre Completo</mat-label>
              <input matInput formControlName="name" required>
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" required>
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Contraseña</mat-label>
              <input matInput type="password" formControlName="password" required>
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>Tipo de Usuario</mat-label>
              <mat-select formControlName="role" required>
                <mat-option value="user">Cliente</mat-option>
                <mat-option value="admin">Administrador</mat-option>
              </mat-select>
            </mat-form-field>

            <div *ngIf="errorMessage" class="error">
              {{ errorMessage }}
            </div>

            <button mat-raised-button color="primary" type="submit" [disabled]="!registerForm.valid || loading">
              {{ loading ? 'Creando cuenta...' : 'Registrarse' }}
            </button>
          </form>

          <p class="login-link">
            ¿Ya tienes cuenta? <a routerLink="/login">Inicia sesión aquí</a>
          </p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .register-container { 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      min-height: 80vh; 
      padding: 2rem; 
    }
    mat-card { width: 100%; max-width: 400px; }
    mat-form-field { width: 100%; margin-bottom: 1rem; }
    .error { color: #f44336; margin: 1rem 0; }
    button { width: 100%; margin: 1rem 0; }
    .login-link { text-align: center; margin-top: 1rem; }
    .login-link a { color: #d32f2f; text-decoration: none; }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', Validators.required]
    });
  }

  onSubmit() {
    if (!this.registerForm.valid) return;

    this.loading = true;
    this.errorMessage = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.loading = false;
        alert('Cuenta creada exitosamente');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Error al crear cuenta';
      }
    });
  }
}