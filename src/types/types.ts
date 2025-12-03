export type Role = 'USER' | 'ADMIN';
export type OrderStatus = 'PENDING' | 'PAID' | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED';
export type PaymentMethod = 'CASH' | 'BANK_TRANSFER';
export type Promo = 'NEW' | 'ALL';
export type Money = number;

export interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

export interface Tour {
  id: number;
  name: string;
  description: string;
  basePrice: Money;
  discount?: Money | null;
  createdAt: string;
  categoryId: number;
}

export interface TourImage {
  id: number;
  url: string;
  position: number;
  tourId: number;
}

export interface TourDeparture {
  id: number;
  departure: string;
  price: Money;
  capacity: number;
  availableSeats: number;
  tourId: number;
}

export interface Order {
  id: number;
  status: OrderStatus;
  totalAmount: Money;
  createdAt: string;
  updatedAt?: string | null;

  userId: number;
}

export interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: Money;
  totalPrice: Money;

  orderId: number;
  tourDepartureId: number;
}

export interface Payment {
  id: number;
  amount: Money;
  status: PaymentStatus;
  method: PaymentMethod;
  createdAt: string;

  orderId: number;
  userId: number;
}

export interface Review {
  id: number;
  rating: number;
  comment?: string | null;
  createdAt: string;

  tourId: number;
  userId: number;
}

