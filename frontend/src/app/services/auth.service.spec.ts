import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login user', () => {
    const loginData = { email: 'test@test.com', password: 'password123' };
    const mockResponse = {
      token: 'mockToken',
      user: { id: 1, email: 'test@test.com', name: 'Test User', role: 'user' }
    };

    service.login(loginData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginData);
    req.flush(mockResponse);
  });

  it('should register user', () => {
    const registerData = {
      name: 'New User',
      email: 'new@test.com',
      password: 'password123',
      role: 'user'
    };
    const mockResponse = { message: 'Usuario registrado exitosamente' };

    service.register(registerData)
      .subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

    const req = httpMock.expectOne('http://localhost:3000/api/auth/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(registerData);
    req.flush(mockResponse);
  });

  it('should logout user', () => {
    // Set initial data
    localStorage.setItem('token', 'mockToken');

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should have currentUser$ observable', () => {
    expect(service.currentUser$).toBeDefined();
  });
});