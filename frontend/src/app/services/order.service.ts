import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  id: number;
  total: number;
  status: string;
  created_at: string;
  items: Array<{name: string, quantity: number, price: number, image_url?: string}>;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) {}

  getMyOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/my-orders?user_id=${userId}`);
  }

  createOrder(orderData: any): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, orderData);
  }
}