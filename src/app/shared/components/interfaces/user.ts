import { Product } from "src/app/pages/products/interfaces/product.interface";

export interface User {
    id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    isVip: boolean;
    vipProducts: Product[]
}
