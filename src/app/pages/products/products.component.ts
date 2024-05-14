/* products.component.ts */
import { Component, OnDestroy } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Product } from './interfaces/product.interface';
import { tap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/shared/components/services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/shared/components/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy {


  product!: Product;
  products: Product[] = [];
  listaproductos: any [] = []
  isCartOpen: boolean = false;
  cartSubscription!: Subscription;

  constructor(
    private productSvc: ProductsService, 
    public shoppingCartService: ShoppingCartService,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ){}

   ngOnInit(): void {
    this.productSvc.getProducts()
      .pipe(
        tap((products: Product[]) => this.products = products)
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
        this.shoppingCartService.addToCart(product);
        this.listaproductos.push(product);
      
      } else {
        this.snackBar.open('Primero debes iniciar sesión', 'Cerrar', {
          duration: 3000, 
        });
        
      }
    });
  }


   ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
  
}
