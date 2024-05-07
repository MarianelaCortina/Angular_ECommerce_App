/* shopping-cart.service.ts */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { Product } from 'src/app/pages/products/interfaces/product.interface';
import { ShoppingCart } from '../interfaces/shopping-cart';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private readonly API_URL = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
    private loginService: LoginService
  
  ) { }

  
  cartItems: Product[] = [];

  private isCartOpenSubject = new BehaviorSubject<boolean>(false);
  private totalSubject = new BehaviorSubject<number>(0);
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

  clearCart(): void {
    this.cartItems = [];
    this.cartItems$.next([]);
    this.totalSubject.next(0); 
    this.quantitySubject.next(0); 
    
  }

  addToCart(product: Product) {
    // Agrega el producto al carrito solo si está cargado
    if (this.cartItems.length > 0) {
      const isProductInCart = this.cartItems.find(({ id }) => id === product.id);
      if (isProductInCart) {
        isProductInCart.qty += 1;
      } else {
        this.cartItems.push({ ...product, qty: 1 });
      }
      this.cartItems$.next(this.cartItems);
    }
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

  calcTotal(): number {
    const total = this.cartItems.reduce((acc, prod) => acc += (prod.price * prod.qty), 0);
    this.totalSubject.next(total);
    return total;
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
  
  updateCartItems(products: Product[]): void {
    this.cartItems = products; // Actualiza los elementos del carrito con los productos cargados
    this.cartItems$.next(this.cartItems); // Notifica a los suscriptores sobre el cambio en los elementos del carrito
  }

}
