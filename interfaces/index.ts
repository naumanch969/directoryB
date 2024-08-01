export interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>;
  saveToken: (key: string, token: string) => Promise<void>;
  clearToken?: (key: string) => void;
}

export interface Business {
  id?: string,
  about: string,
  address: string,
  category: string,
  name: string,
  imageUrl: string,
  website: string,
  contact: string,
  reviews: Review[],
  email: string,
  userName: string,
  userImage: string,
  createdAt: Date,
  updatedAt: Date
}

export interface Category {
  name: string,
  imageUrl: string,
  id: string
}

export interface Slider {
  name: string,
  imageUrl: string,
  id: string
}

export interface Review {
  comment: string,
  rating: number,
  userName: string,
  userImage: string,
  userEmail: string,
}