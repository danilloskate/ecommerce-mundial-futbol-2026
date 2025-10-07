import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../../services/order.service';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-orders',
  template: `
    <div class="orders-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Mis Pedidos</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div *ngIf="orders.length === 0" class="no-orders">
            <p>No tienes pedidos realizados</p>
            <button mat-raised-button color="primary" routerLink="/products">
              Comenzar a Comprar
            </button>
          </div>

          <div *ngFor="let order of orders" class="order-card">
            <mat-card>
              <mat-card-header>
                <mat-card-title>Pedido #{{ order.id }}</mat-card-title>
                <mat-card-subtitle>{{ formatDate(order.created_at) }}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="order-status">
                  <span [class]="'status-' + order.status">{{ getStatusText(order.status) }}</span>
                </div>
                <div class="order-items">
                  <div *ngFor="let item of order.items" class="order-item">
                    <div class="item-info">
                      <img [src]="item.image_url || 'https://picsum.photos/50/50?random=' + item.name" 
                           [alt]="item.name" class="item-image">
                      <span>{{ item.name }} x{{ item.quantity }}</span>
                    </div>
                    <span>{{ (item.price * item.quantity) | colombianCurrency }}</span>
                  </div>
                </div>
                <div class="order-total">
                  <strong>Total: {{ order.total | colombianCurrency }}</strong>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .orders-container { padding: 2rem; max-width: 800px; margin: 0 auto; }
    .no-orders { text-align: center; padding: 2rem; }
    .order-card { margin-bottom: 1rem; }
    .order-status { margin-bottom: 1rem; }
    .status-pending { color: #ff9800; font-weight: bold; }
    .status-confirmed { color: #4caf50; font-weight: bold; }
    .status-shipped { color: #2196f3; font-weight: bold; }
    .order-item { 
      display: flex; 
      justify-content: space-between; 
      align-items: center;
      padding: 0.5rem 0; 
      border-bottom: 1px solid #eee; 
    }
    .item-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .item-image {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      object-fit: cover;
    }
    .order-total { 
      text-align: right; 
      margin-top: 1rem; 
      padding-top: 1rem; 
      border-top: 2px solid #d32f2f; 
    }
  `]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  currentUser: User | null = null;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadOrders();
      }
    });
  }

  loadOrders() {
    if (this.currentUser) {
      this.orderService.getMyOrders(this.currentUser.id).subscribe({
        next: (orders) => {
          this.orders = orders;
        },
        error: (error) => {
          console.error('Error loading orders:', error);
          this.orders = [];
        }
      });
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-CO');
  }

  getStatusText(status: string): string {
    const statusMap: {[key: string]: string} = {
      'pending': 'Pendiente',
      'confirmed': 'Confirmado',
      'shipped': 'Enviado',
      'delivered': 'Entregado'
    };
    return statusMap[status] || status;
  }
}