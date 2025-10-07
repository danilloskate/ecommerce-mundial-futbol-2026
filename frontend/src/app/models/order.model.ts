import { Product } from './product.model';

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    country: string;
    zipCode: string;
  };
  createdAt: string;
  updatedAt: string;
}