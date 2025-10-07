import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, Cart } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-checkout',
  template: `
    <div class="checkout-container">
      <div class="checkout-content">
        <div class="order-summary">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Resumen del Pedido</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div *ngFor="let item of cart.items" class="order-item">
                <span>{{ item.name }} x{{ item.quantity }}</span>
                <span>{{ (item.price * item.quantity) | colombianCurrency }}</span>
              </div>
              <div class="order-total">
                <strong>Total: {{ cart.total | colombianCurrency }}</strong>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <div class="payment-form">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Información de Pago</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
                <h4>Información de Envío</h4>
                <mat-form-field appearance="fill">
                  <mat-label>Nombre Completo</mat-label>
                  <input matInput formControlName="fullName" required>
                </mat-form-field>

                <mat-form-field appearance="fill">
                  <mat-label>Dirección</mat-label>
                  <input matInput formControlName="address" required>
                </mat-form-field>

                <mat-form-field appearance="fill">
                  <mat-label>Ciudad</mat-label>
                  <input matInput formControlName="city" required>
                </mat-form-field>

                <h4>Información de Tarjeta</h4>
                <mat-form-field appearance="fill">
                  <mat-label>Número de Tarjeta</mat-label>
                  <input matInput formControlName="cardNumber" placeholder="1234 5678 9012 3456" 
                         (input)="formatCardNumber($event)" maxlength="19" required>
                </mat-form-field>

                <div class="card-row">
                  <mat-form-field appearance="fill">
                    <mat-label>Mes</mat-label>
                    <mat-select formControlName="expiryMonth" required>
                      <mat-option *ngFor="let month of months" [value]="month.value">
                        {{ month.label }}
                      </mat-option>
                    </mat-select>
                  </mat-form-field>

                  <mat-form-field appearance="fill">
                    <mat-label>Año</mat-label>
                    <mat-select formControlName="expiryYear" required>
                      <mat-option *ngFor="let year of years" [value]="year">
                        {{ year }}
                      </mat-option>
                    </mat-select>
                  </mat-form-field>

                  <mat-form-field appearance="fill">
                    <mat-label>CVV</mat-label>
                    <input matInput type="password" formControlName="cvv" placeholder="123" 
                           maxlength="3" (input)="formatCVV($event)" required>
                  </mat-form-field>
                </div>

                <mat-form-field appearance="fill">
                  <mat-label>Nombre en la Tarjeta</mat-label>
                  <input matInput formControlName="cardName" required>
                </mat-form-field>

                <div class="checkout-actions">
                  <button mat-button type="button" routerLink="/cart">Volver al Carrito</button>
                  <button mat-raised-button color="primary" type="submit" [disabled]="!checkoutForm.valid || processing">
                    {{ processing ? 'Procesando...' : 'Pagar ' + (cart.total | colombianCurrency) }}
                  </button>
                </div>
              </form>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkout-container { padding: 2rem; }
    .checkout-content { display: grid; grid-template-columns: 1fr 2fr; gap: 2rem; max-width: 1200px; margin: 0 auto; }
    .order-item { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
    .order-total { border-top: 1px solid #eee; padding-top: 1rem; margin-top: 1rem; }
    mat-form-field { width: 100%; margin-bottom: 1rem; }
    .card-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
    .checkout-actions { display: flex; justify-content: space-between; margin-top: 2rem; }
    h4 { color: #d32f2f; margin: 1.5rem 0 1rem 0; }
    @media (max-width: 768px) {
      .checkout-content { grid-template-columns: 1fr; }
    }
  `]
})
export class CheckoutComponent implements OnInit {
  cart: Cart = { items: [], total: 0 };
  checkoutForm: FormGroup;
  processing = false;
  currentUser: User | null = null;
  
  months = [
    { value: '01', label: '01 - Enero' },
    { value: '02', label: '02 - Febrero' },
    { value: '03', label: '03 - Marzo' },
    { value: '04', label: '04 - Abril' },
    { value: '05', label: '05 - Mayo' },
    { value: '06', label: '06 - Junio' },
    { value: '07', label: '07 - Julio' },
    { value: '08', label: '08 - Agosto' },
    { value: '09', label: '09 - Septiembre' },
    { value: '10', label: '10 - Octubre' },
    { value: '11', label: '11 - Noviembre' },
    { value: '12', label: '12 - Diciembre' }
  ];
  
  years: number[] = [];

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/)]],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      cardName: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Generate years (current year + 10 years)
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      this.years.push(currentYear + i);
    }
    
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      if (cart.items.length === 0) {
        this.router.navigate(['/cart']);
      }
    });
  }
  
  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\s/g, '').replace(/\D/g, '');
    value = value.substring(0, 16);
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    event.target.value = value;
    this.checkoutForm.patchValue({ cardNumber: value });
  }
  
  formatCVV(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    value = value.substring(0, 3);
    event.target.value = value;
    this.checkoutForm.patchValue({ cvv: value });
  }

  onSubmit() {
    if (!this.checkoutForm.valid) return;

    this.processing = true;

    // Simular procesamiento de pago
    setTimeout(async () => {
      try {
        // Crear orden en la base de datos
        const orderData = {
          user_id: this.currentUser?.id || 1,
          items: this.cart.items,
          total: this.cart.total,
          shipping_address: `${this.checkoutForm.value.address}, ${this.checkoutForm.value.city}`
        };
        
        const order = await this.orderService.createOrder(orderData).toPromise();
        
        // Reducir stock de productos
        for (const item of this.cart.items) {
          await fetch(`http://localhost:3000/api/products/reduce-stock`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: item.id, quantity: item.quantity })
          });
        }
        
        this.processing = false;
        this.cartService.clearCart();
        this.router.navigate(['/success'], { 
          queryParams: { 
            order: order?.id || Math.floor(Math.random() * 10000), 
            total: this.cart.total 
          } 
        });
      } catch (error) {
        this.processing = false;
        alert('Error procesando el pago');
      }
    }, 2000);
  }
}