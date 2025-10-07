import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <div class="login-form">
        <h2>Iniciar Sesión</h2>
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              [(ngModel)]="credentials.email" 
              required 
              email
              #email="ngModel">
            <div *ngIf="email.invalid && email.touched" class="error">
              Email válido requerido
            </div>
          </div>

          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              [(ngModel)]="credentials.password" 
              required
              #password="ngModel">
            <div *ngIf="password.invalid && password.touched" class="error">
              Contraseña requerida
            </div>
          </div>

          <div *ngIf="errorMessage" class="error">
            {{ errorMessage }}
          </div>

          <button type="submit" [disabled]="loginForm.invalid || loading">
            {{ loading ? 'Iniciando...' : 'Iniciar Sesión' }}
          </button>
        </form>

        <p class="register-link">
          ¿No tienes cuenta? <a routerLink="/register">Regístrate aquí</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      padding: 2rem;
    }
    .login-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }
    .login-form h2 {
      text-align: center;
      color: #1a472a;
      margin-bottom: 2rem;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: bold;
    }
    .form-group input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .form-group input:focus {
      outline: none;
      border-color: #1a472a;
    }
    .error {
      color: #ff4444;
      font-size: 0.9rem;
      margin-top: 0.25rem;
    }
    button {
      width: 100%;
      background: #1a472a;
      color: white;
      border: none;
      padding: 0.75rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s;
    }
    button:hover:not(:disabled) {
      background: #2d5a3d;
    }
    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    .register-link {
      text-align: center;
      margin-top: 1rem;
    }
    .register-link a {
      color: #1a472a;
      text-decoration: none;
    }
    .register-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.loading = false;
        alert('Sesión iniciada exitosamente');
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Error al iniciar sesión';
      }
    });
  }
}