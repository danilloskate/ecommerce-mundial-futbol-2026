import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Cart>({ items: [], total: 0 });
  public cart$ = this.cartSubject.asObservable();

  constructor() {}

  addToCart(item: CartItem) {
    const currentCart = this.cartSubject.value;
    const existingItem = currentCart.items.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      currentCart.items.push(item);
    }
    
    this.updateTotal(currentCart);
  }

  updateQuantity(id: number, quantity: number) {
    const currentCart = this.cartSubject.value;
    const item = currentCart.items.find(i => i.id === id);
    if (item) {
      item.quantity = quantity;
      this.updateTotal(currentCart);
    }
  }

  removeItem(id: number) {
    const currentCart = this.cartSubject.value;
    currentCart.items = currentCart.items.filter(i => i.id !== id);
    this.updateTotal(currentCart);
  }

  clearCart() {
    this.cartSubject.next({ items: [], total: 0 });
  }

  private updateTotal(cart: Cart) {
    cart.total = cart.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    this.cartSubject.next(cart);
  }
}