/* cart.component.ts */
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/pages/products/interfaces/product.interface';
import { ProductsService } from 'src/app/pages/products/services/products.service';
import { ShoppingCart } from '../interfaces/shopping-cart';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  
  isCartOpen: boolean = false;
  cartSubscription!: Subscription;
  products: Product[] = [];
  cartItems: Product[] = [];
  product!: Product;
  totalAmount: number = 0;
  currentUser: User | any;

  constructor(
    public shoppingCartService: ShoppingCartService,
    private productsService: ProductsService,
    private loginService: LoginService,
    private router: Router
   
  ) {}

  ngOnInit(): void {
   
    console.log('Is cart open:', this.isCartOpen);
    this.cartSubscription = this.shoppingCartService.isCartOpen$.subscribe(open => {
      this.isCartOpen = open;
      console.log('Estado del carrito actualizado:', this.isCartOpen);
      if (open) {
        this.shoppingCartService.getProductCart()
        console.log(this.shoppingCartService.getProductCart())
        this.loadProducts();
        console.log('load del cart', this.loadProducts())
        this.currentUser = this.getCurrentUser();
      }
    }); 
    this.shoppingCartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    })

    
  }
  
  private loadProducts() {
    this.productsService.getProducts().subscribe(products => {
     this.products = products;
    });
  }


  calculateTotal(): void {
    this.totalAmount = this.shoppingCartService.calculateDiscountAndBonification(this.currentUser);
  }

  /* Boton agregar un producto */
  addProductToCart(product: Product){
    console.log('Agregando producto al carrito:', product);
    this.shoppingCartService.addToCart(product); 
  }

  removeItemProductFromCart(cartItems: Product){
    this.shoppingCartService.removeItemFromCart(cartItems);
    
  }

  deleteProductFromCart(cartItems: Product) {
    this.shoppingCartService.removeProductFromCart(cartItems);
  }

  onFinalizePurchase(){
    this.router.navigate(['/products/finalize-purchase']);
    this.closeCart();
  }

  closeCart() {
    this.shoppingCartService.closeCart();
  }

  clearCart(): void {
    this.shoppingCartService.clearCart();
  }

  getCurrentUser() {
    const userId = localStorage.getItem('userId'); 
    console.log(userId)
    if (userId) {
      this.loginService.getUsers().subscribe(users => {
        this.currentUser = users.find(user => user.id === userId) || null;
        if (this.currentUser) {
          console.log('this.current', this.currentUser)
          if (this.currentUser.isVip) {
            console.log('Usuario VIP');
          } else {
            console.log('Usuario no VIP');
          }
        }
      });
      
    }
    return this.currentUser;
    
  } 

  
  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

 
  

}
