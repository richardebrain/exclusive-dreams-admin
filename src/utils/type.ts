export interface AddProductForm {
  // productId: string; set when submitting product
  productTitle: string;
  // productBrand: string; set when submitting product
  highlights: string;
  color: string;
  sizes?: string;
  price: string;
  category: string;
  hasSize: boolean;
  imageUrl: FileList;
  // href: string;  set when submitting product
}

export type RegisterAdminForm = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};
export type LoginType = {
  email: string;
  password: string;
};

export interface AdminType {
  email: string;
  firstName: string;
  lastName: string;
  uid: string;
}

export type UploadProductType = {
  productTitle: string;
  productBrand: string;
  highlights: string;
  productId: string;
  color: string;
  sizes?: string;
  hasSize: boolean;
  price: string;
  category: string;
  imageUrl: string[];
  href: string;
  
}

export interface OrderItemType {
  productTitle: string;
  productBrand: string;
  productId: string;
  color: string;
  sizes?: string;
  price: string;
  category: string;
  imageUrl: string[];
  href: string;
  
}

export type ProductCheckoutType = {
  productId: string;
  productTitle: string;
  price: string;
  quantity: number;
  size: string;
  color: string;
  imageUrl: string;
  category: string;
  hasSize: boolean;
};

export interface OrderType {
  orderId: string;
  amount: number;
  cart: ProductCheckoutType[];
  deliveryFee: number;
  shipping: {
    address: {
      city: string;
      country: string;
      line1: string;
      line2: null | string;
      postal_code: string;
      state: string;
    };
    carrier: null | string;
    name: string;
    phone: string;
    tracking_number: null;
  };
  totalItems: number;
  hasSize: boolean;
  status:
    | "requires_payment_method"
    | "requires_confirmation"
    | "requires_action"
    | "processing"
    | "requires_capture"
    | "canceled"
    | "succeeded";
    deliveryStatus: "pending" | "shipped" | "delivered"|"cancelled"|"order placed";
    userId: string;
    createdAt: number;
} 