
export enum UserRole {
  DONOR = 'DONOR',
  SUPPLIER = 'SUPPLIER'
}

export enum Category {
  FOOD = 'FOOD',
  CLOTHES = 'CLOTHES',
  FURNITURE = 'FURNITURE',
  ESSENTIALS = 'ESSENTIALS'
}

export enum ItemCondition {
  NEW = 'NEW',
  USED = 'USED',
  GOOD = 'GOOD',
  FRESH = 'FRESH' // Specific to food
}

export enum DonationStatus {
  AVAILABLE = 'AVAILABLE',
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
  COLLECTED = 'COLLECTED'
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  address: string;
  locality: string;
  role: UserRole | null;
  age?: number;
  dob?: string;
  gender?: string;
}

export interface Donation {
  id: string;
  donorId: string;
  donorName: string;
  category: Category;
  itemName: string;
  image: string;
  quantity?: string; // e.g., "Feeds 5 people"
  condition: ItemCondition;
  city: string;
  status: DonationStatus;
  requestedBy?: string; // Supplier ID
  acceptedBy?: string; // Supplier ID
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'REQUEST' | 'ACCEPTANCE' | 'SYSTEM';
  read: boolean;
  createdAt: string;
}
