import { api, type ApiResponse, type PaginatedResponse } from './api';

// Product Types
export interface Product {
  _id: string;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  comparePrice?: number;
  sku: string;
  category: string;
  subcategory?: string;
  brand?: string;
  tags: string[];
  images: ProductImage[];
  variants: ProductVariant[];
  inventory: ProductInventory;
  shipping: ProductShipping;
  seo: ProductSEO;
  averageRating: number;
  totalReviews: number;
  featured: boolean;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  url: string;
  alt?: string;
  isPrimary: boolean;
}

export interface ProductVariant {
  name: string;
  options: ProductVariantOption[];
}

export interface ProductVariantOption {
  name: string;
  value: string;
  priceAdjustment: number;
}

export interface ProductInventory {
  quantity: number;
  lowStockThreshold: number;
  trackQuantity: boolean;
  allowBackorder: boolean;
}

export interface ProductShipping {
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  shippingClass: 'standard' | 'heavy' | 'fragile' | 'digital';
}

export interface ProductSEO {
  metaTitle?: string;
  metaDescription?: string;
  slug: string;
}

export interface ProductFilters {
  category?: string;
  subcategory?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
  status?: string;
  search?: string;
  tags?: string[];
}

export interface ProductQueryParams extends ProductFilters {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// Product Service
export const productService = {
  // Get all products with filters and pagination
  getProducts: async (params?: ProductQueryParams): Promise<ApiResponse<PaginatedResponse<Product>>> => {
    const queryString = params ? new URLSearchParams(params as any).toString() : '';
    return api.get(`/products${queryString ? `?${queryString}` : ''}`);
  },

  // Get single product by ID
  getProduct: async (id: string): Promise<ApiResponse<Product>> => {
    return api.get(`/products/${id}`);
  },

  // Get product by slug
  getProductBySlug: async (slug: string): Promise<ApiResponse<Product>> => {
    return api.get(`/products/slug/${slug}`);
  },

  // Create new product (admin only)
  createProduct: async (productData: Partial<Product>): Promise<ApiResponse<Product>> => {
    return api.post('/products', productData);
  },

  // Update product (admin only)
  updateProduct: async (id: string, productData: Partial<Product>): Promise<ApiResponse<Product>> => {
    return api.put(`/products/${id}`, productData);
  },

  // Delete product (admin only)
  deleteProduct: async (id: string): Promise<ApiResponse<void>> => {
    return api.delete(`/products/${id}`);
  },

  // Get featured products
  getFeaturedProducts: async (limit?: number): Promise<ApiResponse<Product[]>> => {
    const queryString = limit ? `?limit=${limit}` : '';
    return api.get(`/products/featured${queryString}`);
  },

  // Get products by category
  getProductsByCategory: async (category: string, params?: ProductQueryParams): Promise<ApiResponse<PaginatedResponse<Product>>> => {
    const queryString = params ? new URLSearchParams(params as any).toString() : '';
    return api.get(`/products/category/${category}${queryString ? `?${queryString}` : ''}`);
  },

  // Search products
  searchProducts: async (query: string, params?: ProductQueryParams): Promise<ApiResponse<PaginatedResponse<Product>>> => {
    const searchParams = { ...params, search: query };
    const queryString = new URLSearchParams(searchParams as any).toString();
    return api.get(`/products/search?${queryString}`);
  },

  // Get product reviews
  getProductReviews: async (productId: string): Promise<ApiResponse<any[]>> => {
    return api.get(`/products/${productId}/reviews`);
  },

  // Add product review
  addProductReview: async (productId: string, reviewData: { rating: number; comment: string }): Promise<ApiResponse<any>> => {
    return api.post(`/products/${productId}/reviews`, reviewData);
  },

  // Update product inventory
  updateInventory: async (id: string, inventoryData: Partial<ProductInventory>): Promise<ApiResponse<Product>> => {
    return api.patch(`/products/${id}/inventory`, inventoryData);
  },

  // Bulk update products (admin only)
  bulkUpdateProducts: async (updates: { ids: string[]; data: Partial<Product> }): Promise<ApiResponse<void>> => {
    return api.patch('/products/bulk-update', updates);
  },

  // Get low stock products (admin only)
  getLowStockProducts: async (): Promise<ApiResponse<Product[]>> => {
    return api.get('/products/low-stock');
  },
};

export default productService;
