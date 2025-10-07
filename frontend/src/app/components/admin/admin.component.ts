import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-admin',
  template: `
    <div class="admin-container">
      <div *ngIf="showProductList">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Gestión de Productos</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <button mat-raised-button color="primary" (click)="showAddForm()">
              Agregar Nuevo Producto
            </button>
            
            <div class="products-table">
              <mat-card *ngFor="let product of products" class="product-item">
                <div class="product-info">
                  <img [src]="product.image_url" [alt]="product.name" class="product-image">
                  <div class="product-details">
                    <h4>{{ product.name }}</h4>
                    <p>Precio: {{ product.price | colombianCurrency }}</p>
                    <p>Stock: {{ product.stock }}</p>
                    <p>Categoría: {{ product.category }}</p>
                  </div>
                </div>
                <div class="product-actions">
                  <button mat-button color="primary" (click)="editProduct(product)">Editar</button>
                  <button mat-button color="warn" (click)="deleteProduct(product.id)">Eliminar</button>
                </div>
              </mat-card>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div *ngIf="!showProductList">
        <mat-card>
          <mat-card-header>
            <mat-card-title>{{ editingProduct ? 'Editar Producto' : 'Agregar Producto' }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="fill">
                <mat-label>Nombre</mat-label>
                <input matInput formControlName="name" required>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Descripción</mat-label>
                <textarea matInput formControlName="description" rows="3"></textarea>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Precio</mat-label>
                <input matInput type="number" formControlName="price" required>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Stock</mat-label>
                <input matInput type="number" formControlName="stock" required>
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Categoría</mat-label>
                <mat-select formControlName="category" required>
                  <mat-option value="camisetas">Camisetas</mat-option>
                  <mat-option value="balones">Balones</mat-option>
                  <mat-option value="accesorios">Accesorios</mat-option>
                  <mat-option value="souvenirs">Souvenirs</mat-option>
                </mat-select>
              </mat-form-field>

              <div class="image-upload" *ngIf="!editingProduct">
                <input type="file" (change)="onFileSelect($event)" accept="image/*" #fileInput style="display: none;">
                <button mat-raised-button type="button" (click)="fileInput.click()">
                  Seleccionar Imagen
                </button>
                <div *ngIf="selectedFile">{{ selectedFile.name }}</div>
              </div>

              <div class="actions">
                <button mat-button type="button" (click)="cancelEdit()">Cancelar</button>
                <button mat-raised-button color="primary" type="submit" [disabled]="!productForm.valid">
                  {{ editingProduct ? 'Actualizar' : 'Agregar' }} Producto
                </button>
              </div>
            </form>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .admin-container { padding: 2rem; max-width: 1000px; margin: 0 auto; }
    mat-form-field { width: 100%; margin-bottom: 1rem; }
    .image-upload { margin: 1rem 0; }
    .actions { display: flex; gap: 1rem; margin-top: 2rem; }
    .products-table { margin-top: 2rem; }
    .product-item { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      margin-bottom: 1rem; 
      padding: 1rem; 
    }
    .product-info { display: flex; align-items: center; gap: 1rem; }
    .product-image { width: 60px; height: 60px; border-radius: 4px; object-fit: cover; }
    .product-details h4 { margin: 0; color: #d32f2f; }
    .product-details p { margin: 0.25rem 0; }
    .product-actions { display: flex; gap: 0.5rem; }
  `]
})
export class AdminComponent implements OnInit {
  productForm: FormGroup;
  selectedFile: File | null = null;
  products: Product[] = [];
  editingProduct: Product | null = null;
  showProductList = true;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  showAddForm() {
    this.showProductList = false;
    this.editingProduct = null;
    this.productForm.reset();
  }

  editProduct(product: Product) {
    this.editingProduct = product;
    this.showProductList = false;
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category
    });
  }

  cancelEdit() {
    this.editingProduct = null;
    this.showProductList = true;
    this.productForm.reset();
    this.selectedFile = null;
  }

  deleteProduct(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
        alert('Producto eliminado');
      });
    }
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async onSubmit() {
    if (!this.productForm.valid) return;

    let imageUrl = '';
    
    if (this.selectedFile && !this.editingProduct) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      
      try {
        const response = await fetch('http://localhost:3000/api/upload/image', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        imageUrl = result.imageUrl;
      } catch (error) {
        console.error('Error subiendo imagen:', error);
        return;
      }
    }

    const productData = {
      ...this.productForm.value,
      image_url: imageUrl || (this.editingProduct?.image_url || '')
    };

    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct.id, productData).subscribe({
        next: () => {
          alert('Producto actualizado exitosamente');
          this.loadProducts();
          this.cancelEdit();
        },
        error: (error) => alert('Error al actualizar producto')
      });
    } else {
      this.productService.createProduct(productData).subscribe({
        next: () => {
          alert('Producto agregado exitosamente');
          this.loadProducts();
          this.cancelEdit();
        },
        error: (error) => alert('Error al agregar producto')
      });
    }
  }
}