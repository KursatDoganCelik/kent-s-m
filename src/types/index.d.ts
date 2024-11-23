export interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  createdAt: string;
  imageUrl: string;
  stockQuantity: number;
  isActive: boolean;
}

export interface CardsProps {
  products: Product[];
}
