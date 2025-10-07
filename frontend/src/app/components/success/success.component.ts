import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  template: `
    <div class="success-container">
      <mat-card class="success-card">
        <mat-card-content>
          <div class="success-icon">✅</div>
          <h2>¡Pago Exitoso!</h2>
          <p>Tu pedido ha sido procesado correctamente</p>
          
          <div class="order-details">
            <h3>Detalles del Pedido</h3>
            <p><strong>Número de Orden:</strong> #{{ orderNumber }}</p>
            <p><strong>Total Pagado:</strong> \${{ total }}</p>
            <p><strong>Método de Pago:</strong> Tarjeta de Crédito</p>
          </div>

          <div class="next-steps">
            <h4>¿Qué sigue?</h4>
            <ul>
              <li>Recibirás un email de confirmación</li>
              <li>Tu pedido será procesado en 1-2 días hábiles</li>
              <li>Te notificaremos cuando sea enviado</li>
            </ul>
          </div>

          <div class="actions">
            <button mat-raised-button color="primary" routerLink="/orders">
              Ver Mis Pedidos
            </button>
            <button mat-button routerLink="/products">
              Seguir Comprando
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .success-container { 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      min-height: 80vh; 
      padding: 2rem; 
    }
    .success-card { 
      max-width: 500px; 
      text-align: center; 
    }
    .success-icon { 
      font-size: 4rem; 
      margin-bottom: 1rem; 
    }
    h2 { 
      color: #4caf50; 
      margin-bottom: 1rem; 
    }
    .order-details { 
      background: #f5f5f5; 
      padding: 1rem; 
      border-radius: 8px; 
      margin: 2rem 0; 
      text-align: left; 
    }
    .next-steps { 
      text-align: left; 
      margin: 2rem 0; 
    }
    .next-steps ul { 
      padding-left: 1.5rem; 
    }
    .actions { 
      display: flex; 
      gap: 1rem; 
      justify-content: center; 
      margin-top: 2rem; 
    }
  `]
})
export class SuccessComponent implements OnInit {
  orderNumber = '';
  total = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.orderNumber = params['order'] || Math.floor(Math.random() * 10000).toString();
      this.total = params['total'] || '0.00';
    });
  }
}