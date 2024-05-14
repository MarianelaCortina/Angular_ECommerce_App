/* shopping-cart.service.ts */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from 'src/app/pages/products/interfaces/product.interface';
import { ShoppingCart } from '../interfaces/shopping-cart';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private readonly API_URL = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
  
  ) { }

  
  cartItems: Product[] = [];
  listproducts: any [] = [];
  currentUser: User | null = null;
  total: number = 0;

  private isCartOpenSubject = new BehaviorSubject<boolean>(false);
  totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);
  cartItems$ = new BehaviorSubject<Product[]>([]);

 
  isCartOpen$ = this.isCartOpenSubject.asObservable();
  cartOpen$ = this.isCartOpenSubject.asObservable(); // Nuevo observable
  totalAction$ = this.totalSubject.asObservable();
  quantityAction$ = this.quantitySubject.asObservable();
  cart$ = this.cartItems$.asObservable();
 
  createCart(cartData: ShoppingCart): Observable<ShoppingCart> {
    return this.http.post<ShoppingCart>(`${this.API_URL}/cart`, cartData);
  }
  
  toggleCart() {
    this.isCartOpenSubject.next(!this.isCartOpenSubject.value);
  }

  openCart() {
    this.isCartOpenSubject.next(true);
  }

  closeCart() {
    this.isCartOpenSubject.next(false);
  }

  addToCart(product: Product) {
    // Agrega el producto al carrito y si ya exise en el carrito le aumenta la cantidad en 1
      const isProductInCart = this.cartItems.find(({ id }) => id === product.id);
      if (isProductInCart) {
        isProductInCart.qty += 1;
      } else {
        this.cartItems.push({ ...product, qty: 1 });
      }
      this.cartItems$.next(this.cartItems); 
}

  getProductCart(){
    return this.cartItems
    
  }


  removeItemFromCart(product: Product) {
    const index = this.cartItems.findIndex(({ id }) => id === product.id);
    if (index !== -1) {
      if (this.cartItems[index].qty > 1) {
        this.cartItems[index].qty -= 1;
      } else {
        this.cartItems.splice(index, 1);
      }
      this.cartItems$.next(this.cartItems);
    }
  }

  removeProductFromCart(product: Product) {
    const updatedCartItems = this.cartItems.filter(item => item.id !== product.id);
    this.cartItems = updatedCartItems;
    this.cartItems$.next(this.cartItems);
  
  }

  //Este método extrae la cantidad de productos que el usuario haya agregado al carrito
  private quantityProducts(): void {
    const quantity = this.cartItems.reduce((acc, prod) => acc += prod.qty, 0);
    this.quantitySubject.next(quantity);
  }

  registerVipPurchase(product: Product): void {
    if (this.currentUser && this.currentUser.isVip) {
      if (!this.currentUser.vipProducts) {
        this.currentUser.vipProducts = [];
      }
      this.currentUser.vipProducts.push(product);
    }
  }

  calculateDiscountAndBonification(currentUser: User | null): number {
    const totalQuantity = this.cartItems.reduce((acc, prod) => acc + prod.qty, 0);
    const totalAmount = this.calcTotal();
  
    if (totalQuantity > 10) {
      console.log('dentro del if > 10', currentUser)
      if (currentUser && currentUser.isVip) {
        console.log('dentro del if si vip')
        // Usuario VIP: Bonificación del producto más barato y descuento general de $500
        const minPriceProduct = this.cartItems.reduce((min, p) => p.price < min.price ? p : min, this.cartItems[0]);
        const discountedAmount = totalAmount - 500;
        minPriceProduct.qty -= 1; // Disminuir la cantidad del producto más barato
        this.cartItems$.next(this.cartItems);
        return discountedAmount;
      } else {
        // Usuario no VIP: Descuento de $100
        return totalAmount - 100;
      }
    }
    this.total = totalAmount
    this.totalSubject.next(totalAmount)

    return totalAmount;
    
  }
  
 
  
  /* este calcula bien el total */
   calcTotal(): number {
    const subTotal = this.cartItems.reduce((acc, prod) => acc += (prod.price * prod.qty), 0);
    
    let descuento = 0;
    const totalQuantity = this.cartItems.reduce((acc, prod) => acc += prod.qty, 0);

    if (totalQuantity === 4) {
        descuento = subTotal * 0.25; // Aplica un descuento del 25% si hay 4 unidades en total
    }

    const totalConDescuento = subTotal - descuento;
    
    this.totalSubject.next(totalConDescuento);
    return totalConDescuento;
} 

  
  loadProducts(loggedIn: boolean): Observable<Product> {
    // Verifica si el usuario está logueado antes de cargar los productos
    if (loggedIn) {
      // Si el usuario está logueado, carga los productos del carrito del usuario
      return this.http.get<Product>(`${this.API_URL}/products`);
    } else {
      // Si el usuario no está logueado, devuelve un array vacío
      return of();
    }
  }

  
  clearCart(): void {
    this.cartItems = [];
    this.cartItems$.next([]);
    this.totalSubject.next(0); 
    this.quantitySubject.next(0); 
    
  }
  
  updateCartItems(products: Product[]): void {
    this.cartItems = products; 
    this.cartItems$.next(this.cartItems); 
  }

}
