import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="hero">
      <div class="hero-content">
        <h1>⚽ Tienda Oficial Mundial de Fútbol 2026</h1>
        <p>Encuentra los mejores productos de tu selección favorita</p>
        <button class="cta-button" (click)="goToProducts()">Ver Productos</button>
      </div>
    </div>

    <section class="featured-products">
      <div class="container">
        <h2>Productos Destacados</h2>
        <div class="products-grid">
          <div *ngFor="let product of featuredProducts" class="product-card">
            <img [src]="product.image_url" [alt]="product.name">
            <h3>{{ product.name }}</h3>
            <p class="team">{{ product.category }}</p>
            <p class="price">{{ product.price | colombianCurrency }}</p>
            <div class="actions">
              <button (click)="viewProduct(product.id)">Ver Detalles</button>
              <button (click)="addToCart(product)" class="add-to-cart">Agregar al Carrito</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="categories">
      <div class="container">
        <h2>Categorías</h2>
        <div class="categories-grid">
          <div class="category-card" (click)="goToCategory('camisetas')">
            <div class="category-icon">👕</div>
            <h3>Camisetas</h3>
          </div>
          <div class="category-card" (click)="goToCategory('balones')">
            <div class="category-icon">⚽</div>
            <h3>Balones</h3>
          </div>
          <div class="category-card" (click)="goToCategory('accesorios')">
            <div class="category-icon">🧢</div>
            <h3>Accesorios</h3>
          </div>
          <div class="category-card" (click)="goToCategory('souvenirs')">
            <div class="category-icon">🏆</div>
            <h3>Souvenirs</h3>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #d32f2f, #f44336);
      color: white;
      padding: 4rem 2rem;
      text-align: center;
    }
    .hero-content h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    .hero-content p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }
    .cta-button {
      background: #ffc107;
      color: #333;
      border: none;
      padding: 1rem 2rem;
      font-size: 1.1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s;
      font-weight: bold;
    }
    .cta-button:hover {
      background: #ffb300;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .featured-products, .categories {
      padding: 3rem 0;
    }
    .featured-products h2, .categories h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: #d32f2f;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }
    .product-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      text-align: center;
      transition: transform 0.3s;
    }
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    .product-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 4px;
    }
    .product-card h3 {
      margin: 1rem 0 0.5rem;
      color: #d32f2f;
    }
    .team {
      color: #666;
      font-weight: bold;
    }
    .price {
      font-size: 1.2rem;
      font-weight: bold;
      color: #d32f2f;
      margin: 0.5rem 0;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    .actions button {
      flex: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s;
    }
    .actions button:first-child {
      background: #f0f0f0;
      color: #333;
    }
    .add-to-cart {
      background: #d32f2f !important;
      color: white !important;
    }
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }
    .category-card {
      text-align: center;
      padding: 2rem;
      border: 2px solid #d32f2f;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .category-card:hover {
      background: #d32f2f;
      color: white;
    }
    .category-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts() {
    this.productService.getProducts().subscribe(products => {
      this.featuredProducts = products.slice(0, 3);
    });
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

  viewProduct(id: number) {
    this.router.navigate(['/products', id]);
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }

  goToCategory(category: string) {
    this.router.navigate(['/products'], { queryParams: { category } });
  }
}