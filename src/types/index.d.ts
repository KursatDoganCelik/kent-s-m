export interface Product {
  id?: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  createdAt: string;
  imageUrl: string;
  stockQuantity: number;
  isActive: boolean;
}
