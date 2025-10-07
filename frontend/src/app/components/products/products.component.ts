import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  template: `
    <div class="products-container">
      <mat-toolbar class="red-toolbar">
        <span>{{ getTitle() }}</span>
      </mat-toolbar>
      
      <div class="filters">
        <mat-chip-listbox>
          <mat-chip-option 
            *ngFor="let cat of categories" 
            (click)="filterByCategory(cat.value)"
            [selected]="selectedCategory === cat.value">
            {{ cat.label }}
          </mat-chip-option>
        </mat-chip-listbox>
      </div>

      <div class="products-grid">
        <mat-card *ngFor="let product of products" class="product-card">
          <img mat-card-image [src]="product.image_url" [alt]="product.name">
          <mat-card-header>
            <mat-card-title>{{ product.name }}</mat-card-title>
            <mat-card-subtitle>{{ product.category }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{ product.description }}</p>
            <div class="price">{{ product.price | colombianCurrency }}</div>
            <div class="stock">Stock: {{ product.stock }}</div>
          </mat-card-content>
          <mat-card-actions>
            <button 
              mat-button 
              (click)="viewDetails(product)">
              Ver Detalles
            </button>
            <button 
              mat-raised-button 
              color="primary"
              (click)="addToCart(product)"
              [disabled]="product.stock === 0">
              {{ product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito' }}
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .products-container { padding: 1rem; }
    .filters { margin: 1rem 0; }
    .products-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
      gap: 1rem; 
    }
    .product-card { max-width: 350px; }
    .price { font-size: 1.2rem; font-weight: bold; color: #d32f2f; }
    ::ng-deep .mat-mdc-chip.mdc-evolution-chip--selected {
      background-color: #d32f2f !important;
      color: white !important;
      font-weight: bold !important;
    }
    ::ng-deep .mat-mdc-chip {
      background-color: #f5f5f5 !important;
      color: #333 !important;
      border: 1px solid #d32f2f !important;
    }
    ::ng-deep .mat-chip.mat-standard-chip.mat-chip-selected {
      background-color: #d32f2f !important;
      color: white !important;
      font-weight: bold !important;
    }
    ::ng-deep .mat-chip.mat-standard-chip {
      background-color: #f5f5f5 !important;
      color: #333 !important;
      border: 1px solid #d32f2f !important;
    }
    .red-toolbar {
      background: linear-gradient(135deg, #b71c1c 0%, #d32f2f 50%, #f44336 100%) !important;
      color: white !important;
      border-bottom: 2px solid white !important;
      font-weight: bold !important;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.3) !important;
    }
  `]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  selectedCategory = 'all';
  
  categories = [
    { value: 'all', label: 'Todos' },
    { value: 'camisetas', label: 'Camisetas' },
    { value: 'balones', label: 'Balones' },
    { value: 'accesorios', label: 'Accesorios' },
    { value: 'souvenirs', label: 'Souvenirs' }
  ];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || 'all';
      this.loadProducts();
    });
  }

  loadProducts() {
    const category = this.selectedCategory === 'all' ? undefined : this.selectedCategory;
    this.productService.getProducts(category).subscribe(products => {
      this.products = products;
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.loadProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1
    });
    alert(`${product.name} agregado al carrito`);
  }

  viewDetails(product: Product) {
    this.router.navigate(['/products', product.id]);
  }

  getTitle(): string {
    const category = this.categories.find(cat => cat.value === this.selectedCategory);
    return category ? category.label : 'Productos';
  }
}