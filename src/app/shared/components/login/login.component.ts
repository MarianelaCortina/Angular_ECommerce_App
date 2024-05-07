/* login.component.ts */
import { Component, OnInit } from '@angular/core';
import { Login } from '../interfaces/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';
   
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private shoppingCartService: ShoppingCartService,
    private router: Router,
 
  ) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    
  }
   
  closeLoginPanel() {
    this.loginService.closeLoginPanel();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const loginData = this.loginForm.value;
    this.loginService.login(loginData).subscribe({
      next:(data) => {
        if(data) {
          // Usuario válido, navegar a la página principal u otra página
          console.log(data);
          this.router.navigate(['/products']);
          // Cargar productos en el carrito después del inicio de sesión
          this.shoppingCartService.loadProducts(true).subscribe(products => {
            console.log(products);
          });
        } else {
          // Usuario no encontrado o credenciales incorrectas
          this.errorMessage = 'Email o contraseña incorrectos';
        }
      },
      error:() => {
        this.errorMessage = 'Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.';
      }
    });
  }


}
