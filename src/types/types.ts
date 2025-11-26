export type TourCategory = {
    id: string;
    name: string;
    description?: string;
};

export type Tour = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  category: TourCategory;
  imageUrls: string[];
};



export type UserRole = 'USER' | 'ADMIN';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
};

export type UserWithPassword = User & {
  passwordHash: string;
};


export type TourDeparture = {
  id: string;
  tourId: string;
  departureDate: string;
  price: number;
  capacity: number;
  availableSeats: number;
};

export type OrderStatus = 'PENDING' | 'PAID' | 'CANCELLED';

export type OrderItem = {
  id: string;
  orderId: string;
  tourDepartureId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type Order = {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt?: string;
  items: OrderItem[];
};

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'CASH' | 'CREDIT_CARD' | 'BANK_TRANSFER' | 'E_WALLET';

export type Transaction = {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  createdAt: string;
};

export type Rating = 1 | 2 | 3 | 4 | 5;

export type Review = {
  id: string;
  tourId: string;
  userId: string;
  comment?: string;
  rating: Rating;
  createdAt: string;
};
