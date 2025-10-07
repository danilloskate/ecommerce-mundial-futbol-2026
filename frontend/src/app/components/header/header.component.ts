import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { User } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar class="header davivienda-header">
      <span class="logo" (click)="goHome()">
        ⚽ Mundial Store
      </span>
      
      <span class="spacer"></span>
      
      <nav class="nav">
        <button mat-button routerLink="/products">Productos</button>
        <button mat-button routerLink="/products" [queryParams]="{category: 'camisetas'}">Camisetas</button>
        <button mat-button routerLink="/products" [queryParams]="{category: 'balones'}">Balones</button>
        <button mat-button routerLink="/products" [queryParams]="{category: 'accesorios'}">Accesorios</button>
        <button mat-button routerLink="/admin" *ngIf="currentUser?.role === 'admin'">Admin</button>
      </nav>

      <div class="user-actions">
        <button mat-button (click)="goToCart()" class="cart-button">
          <span class="cart-icon">🛒</span>
          <span *ngIf="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
        </button>
        
        <div *ngIf="currentUser; else loginButtons" class="user-menu">
          <span>Hola, {{ currentUser.name }}</span>
          <button mat-button (click)="goToOrders()">Mis Pedidos</button>
          <button mat-button (click)="logout()">Salir</button>
        </div>
        
        <ng-template #loginButtons>
          <button mat-button (click)="goToLogin()">Iniciar Sesión</button>
        </ng-template>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1000;
    }
    .davivienda-header {
      background: linear-gradient(135deg, #b71c1c 0%, #d32f2f 50%, #f44336 100%);
      color: white;
      border-bottom: 2px solid white;
      font-weight: bold;
    }
    .davivienda-header button {
      color: white !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
      border-radius: 4px !important;
      margin: 0 2px !important;
      font-weight: bold !important;
    }
    .davivienda-header button:hover {
      background: rgba(255, 255, 255, 0.1) !important;
      border: 1px solid white !important;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: 900;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
    }
    .nav {
      display: flex;
      gap: 0.5rem;
      margin-right: 1rem;
    }
    .user-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-left: 1rem;
    }
    .user-menu {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: bold;
    }
    .user-menu span {
      font-weight: 900;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
    }
    .cart-button {
      background: rgba(255, 255, 255, 0.1) !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
      border-radius: 8px !important;
      padding: 8px 12px !important;
    }
    .cart-button:hover {
      background: rgba(255, 255, 255, 0.2) !important;
      border: 1px solid white !important;
    }
    .cart-icon {
      font-size: 1.5rem;
      color: white;
    }
    .cart-badge {
      background: #ffc107;
      color: #333;
      border-radius: 50%;
      padding: 2px 6px;
      font-size: 0.8rem;
      margin-left: 4px;
      font-weight: bold;
      position: relative;
      top: -8px;
    }
  `]
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;
  cartItemCount = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.cartService.cart$.subscribe(cart => {
      this.cartItemCount = cart.items.reduce((count, item) => count + item.quantity, 0);
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}