export interface AddProductForm{
    // productId: string; set when submitting product
    productTitle: string;
    // productBrand: string; set when submitting product
    highlights: string;
    color:string;
    sizes:string;
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
}