/* products.component.ts */
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Product } from './interfaces/product.interface';
import { tap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/shared/components/services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/shared/components/services/login.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy {


  product!: Product;
  products!: Product[];
  isCartOpen: boolean = false;
  cartSubscription!: Subscription;

  constructor(
    private productSvc: ProductsService, 
    public shoppingCartService: ShoppingCartService,
    private loginService: LoginService
  ){}

   ngOnInit(): void {
    this.productSvc.getProducts()
      .pipe(
         tap((products: Product[]) => this.products = products)
         /* tap( res => console.log( res )) */
      )
      .subscribe();

      this.cartSubscription = this.shoppingCartService.isCartOpen$.subscribe(isOpen => {
        this.isCartOpen = isOpen;
      });
   }

   /* BOTON EN C/CARD DE PRODUCTO para agregar un producto al carrito */
  addProductToCart(product: Product) {
    this.loginService.isLoggedIn().subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        console.log('Estado del usuario', loggedIn)
        this.shoppingCartService.addToCart(product);
        console.log('Prodcuto elegido', product);
        
      // Añade el producto al array de productos
      this.products.push(product);
      console.log('Producto agregado a la lista de productos', product);
      } else {
        console.log('Error: usuario no ha iniciado sesión');
        
      }
    });
  }


   ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
  
}
