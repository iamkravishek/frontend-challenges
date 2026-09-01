import {client} from './client'

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
  description?: string;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: Dimensions;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Review[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: Meta;
  images?: string[];
}

type ProductsResponse = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};

export const ProductService = {
    getProducts(skip:number, limit:number):Promise<ProductsResponse>{
       return client.get(`/products?limit=${limit}&skip=${skip}`)
    }
}