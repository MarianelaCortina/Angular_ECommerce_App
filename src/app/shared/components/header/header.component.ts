import { Component, EventEmitter, Output } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { LoginService } from '../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() openCart: EventEmitter<void> = new EventEmitter<void>();
  isLoginPanelOpen: boolean = false;
 
  constructor(
    private shoppingCartService: ShoppingCartService,
    private loginService: LoginService,
    public dialog: MatDialog
  ) {}

  OnToggleCart() {
    this.shoppingCartService.toggleCart();
    this.openCart.emit(); // Emitir evento para abrir el carrito
    console.log('Evento emitido')
    
  }

  OpenLoginDialog() {
    this.dialog.open(LoginComponent, {
     
    });
    
  }

  
  onLogout(){
    this.loginService.logOut()
  }


  
}
