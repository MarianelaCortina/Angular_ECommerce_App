import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { ShoppingCartService } from 'src/app/shared/components/services/shopping-cart.service';

@Component({
  selector: 'app-finalize-purchase',
  templateUrl: './finalize-purchase.component.html',
  styleUrls: ['./finalize-purchase.component.css']
})
export class FinalizePurchaseComponent implements OnInit {

  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(
    public shoppingCartService: ShoppingCartService,
  ) {}

  ngOnInit(): void {
    this.shoppingCartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.shoppingCartService.totalSubject.subscribe(totalPrice => {
        this.totalPrice = totalPrice;
        console.log('finalizar totalPrice', this.totalPrice)
      });
   
    })
   
  }


}
