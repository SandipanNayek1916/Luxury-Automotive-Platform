export type Role = "USER" | "ADMIN";
export type BookingStatus = "PENDING" | "CONFIRMED" | "ACTIVE" | "COMPLETED" | "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  pricePerDay: number;
  estimatedValue: number;
  transmission: string;
  fuelType: string;
  drivetrain: string;
  seats: number;
  doors: number;
  mileage: string;
  engine: string;
  horsepower: number;
  acceleration: string;
  topSpeed: string;
  description: string;
  soundProfile: string;
  features: string[];
  tags: string[];
  images: string[];
  mainImage: string;
  location: string;
  available: boolean;
  featured: boolean;
  rarity: string;
  createdAt: string;
  updatedAt: string;
  // Media-resolved fields (populated by API when CarMedia records exist)
  heroImage?: string | null;
  heroImages?: string[];
  showcaseImage?: string | null;
  mobileImages?: string[];
  videoPreview?: string | null;
  hasCloudinaryMedia?: boolean;
}

export type MediaType = "hero" | "thumbnail" | "gallery" | "showcase" | "mobile" | "video";

export interface CarMedia {
  id: string;
  carId: string;
  type: MediaType;
  url: string;
  publicId: string;
  width: number | null;
  height: number | null;
  format: string | null;
  alt: string;
  caption: string;
  sortOrder: number;
  isPrimary: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  carId: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropLocation: string;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  car?: Car;
}

export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: Role;
  phone?: string;
}

export interface Review {
  id: string;
  userId: string;
  carId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user?: User;
}
