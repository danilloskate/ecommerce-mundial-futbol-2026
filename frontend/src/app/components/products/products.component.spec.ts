import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProductsComponent } from './products.component';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ColombianCurrencyPipe } from '../../pipes/currency.pipe';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);
    const activatedRouteSpy = { queryParams: of({}) };

    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ColombianCurrencyPipe],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatButtonModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    const mockProducts: Product[] = [{
      id: 1,
      name: 'Test Product',
      description: 'Test',
      price: 100000,
      stock: 10,
      category: 'camisetas',
      image_url: 'test.jpg'
    }];
    
    productService.getProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(productService.getProducts).toHaveBeenCalled();
  });
});