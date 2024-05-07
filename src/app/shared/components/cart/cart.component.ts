/* cart.component.ts */
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/pages/products/interfaces/product.interface';
import { ProductsService } from 'src/app/pages/products/services/products.service';
import { ShoppingCart } from '../interfaces/shopping-cart';
import { LoginService } from '../services/login.service';


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

  constructor(
    public shoppingCartService: ShoppingCartService,
    private productsService: ProductsService,
    private loginService: LoginService
   
  ) {}

  ngOnInit(): void {
    console.log('Is cart open:', this.isCartOpen);
    this.cartSubscription = this.shoppingCartService.isCartOpen$.subscribe(open => {
      this.isCartOpen = open;
      console.log('Estado del carrito actualizado:', this.isCartOpen);
      if (open) {
        this.loadProducts();
        console.log('load del cart', this.loadProducts())
      }
      
    }); 
    this.shoppingCartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      console.log(this.cartItems)
      this.calculateTotal();
      
    })

    
  }


  
  private loadProducts() {
    this.productsService.getProducts().subscribe(products => {
      this.cartItems = products;
      console.log('Mensaje del metodo load del products service  en cart',this.cartItems)
      /* Este metodo cuando se presiona el carrito, te trae 
      todo el array de productos */
    });
  }

/* 
  cargaProd(){
    console.log('estoy aca')
    this.shoppingCartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      console.log(this.cartItems)
      this.calculateTotal();
      
    })
  } */
 

  calculateTotal(): void {
    this.totalAmount = this.shoppingCartService.calcTotal();
  }

  /* Boton agregar un producto */
  addProductToCart(product: Product){
    console.log('Agregando producto al carrito:', product);
    this.shoppingCartService.addToCart(product); // Agregar producto al carrito
}


/* 
 (click)="agregarProductoSeleccionado(product)"

 agregarProductoSeleccionado(producto: any): void {
    this.DcListService.agregarProducto(producto);
    this.prodFavorite = this.DcListService.obtenerProductos();
  }


/* 
obtenerProductos(): any[] {
    return this.productos;
  }

this.productosRaros = this.dcListService.obtenerProductos();




 */

/* 
  addProductToCart(product: Product){
    this.shoppingCartService.addToCart(product); // Agregar producto al carrito
   
  }
 */
  /* private loadProducts(): void {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
     
      this.shoppingCartService.updateCartItems(this.products);
    });
  } */


  removeItemProductFromCart(cartItems: Product){
    this.shoppingCartService.removeItemFromCart(cartItems);
    
  }

  deleteProductFromCart(cartItems: Product) {
    this.shoppingCartService.removeProductFromCart(cartItems);
  }

  closeCart() {
    this.shoppingCartService.closeCart();
  }

  clearCart(): void {
    this.shoppingCartService.clearCart();
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  
  

}
