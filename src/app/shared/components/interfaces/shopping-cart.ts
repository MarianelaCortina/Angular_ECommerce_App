import { Product } from "src/app/pages/products/interfaces/product.interface";

export interface ShoppingCart {
    id: number;
    type: string[];
    items: Product[];
    createdDate: Date;
    total: number;
    status: string;
}
