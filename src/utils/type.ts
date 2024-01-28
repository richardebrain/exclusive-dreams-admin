export interface AddProductForm {
  // productId: string; set when submitting product
  productTitle: string;
  // productBrand: string; set when submitting product
  highlights: string;
  color: string;
  sizes: string;
  price: string;
  category: string;
  imageUrl: FileList;
  // href: string;  set when submitting product
  quantity: string;
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
  sizes: string;
  price: string;
  category: string;
  imageUrl: string[];
  href: string;
  quantity: string;
}

export interface OrderItemType {
  productTitle: string;
  productBrand: string;
  productId: string;
  color: string;
  sizes: string;
  price: string;
  category: string;
  imageUrl: string[];
  href: string;
  quantity: string;
}

export interface OrderType {
  orderId: string;
  orderDate: string;
  orderStatus: string;
  orderTotal: string;
  orderItems: OrderItemType[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
} 