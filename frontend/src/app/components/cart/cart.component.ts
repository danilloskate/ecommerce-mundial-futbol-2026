import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, Cart } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  template: `
    <div class="cart-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Carrito de Compras</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div *ngIf="cart.items.length === 0" class="empty-cart">
            <p>Tu carrito está vacío</p>
            <button mat-raised-button color="primary" routerLink="/products">
              Continuar Comprando
            </button>
          </div>
          
          <div *ngIf="cart.items.length > 0">
            <div *ngFor="let item of cart.items" class="cart-item">
              <div class="item-info">
                <h4>{{ item.name }}</h4>
                <p>Precio: {{ item.price | colombianCurrency }}</p>
              </div>
              <div class="item-controls">
                <button mat-icon-button (click)="updateQuantity(item.id, item.quantity - 1)">-</button>
                <span>{{ item.quantity }}</span>
                <button mat-icon-button (click)="updateQuantity(item.id, item.quantity + 1)">+</button>
                <button mat-icon-button color="warn" (click)="removeItem(item.id)">🗑️</button>
              </div>
              <div class="item-total">
                {{ (item.price * item.quantity) | colombianCurrency }}
              </div>
            </div>
            
            <div class="cart-total">
              <h3>Total: {{ cart.total | colombianCurrency }}</h3>
            </div>
            
            <div class="cart-actions">
              <button mat-button routerLink="/products">Continuar Comprando</button>
              <button mat-raised-button color="primary" (click)="proceedToCheckout()">
                Proceder al Pago
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .cart-container { padding: 2rem; max-width: 800px; margin: 0 auto; }
    .empty-cart { text-align: center; padding: 2rem; }
    .cart-item { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      padding: 1rem; 
      border-bottom: 1px solid #eee; 
    }
    .item-info h4 { margin: 0; }
    .item-controls { display: flex; align-items: center; gap: 0.5rem; }
    .cart-total { text-align: right; margin: 1rem 0; }
    .cart-actions { display: flex; justify-content: space-between; margin-top: 2rem; }
  `]
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [], total: 0 };

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  updateQuantity(id: number, newQuantity: number) {
    if (newQuantity <= 0) {
      this.removeItem(id);
    } else {
      this.cartService.updateQuantity(id, newQuantity);
    }
  }

  removeItem(id: number) {
    this.cartService.removeItem(id);
  }

  proceedToCheckout() {
    this.router.navigate(['/checkout']);
  }
}