import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService, Product } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all products', () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Camiseta Colombia',
        description: 'Camiseta oficial',
        price: 350000,
        stock: 10,
        category: 'camisetas',
        image_url: 'colombia.jpg'
      }
    ];

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(1);
      expect(products[0].name).toBe('Camiseta Colombia');
    });

    const req = httpMock.expectOne('http://localhost:3000/api/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });
});