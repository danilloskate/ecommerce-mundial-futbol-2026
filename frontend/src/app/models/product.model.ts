export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: 'camisetas' | 'balones' | 'accesorios' | 'souvenirs';
  team: string;
  image: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}