export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  address?: {
    street: string;
    city: string;
    country: string;
    zipCode: string;
  };
}

export interface AuthResponse {
  token: string;
  user: User;
}