import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    ProductsComponent
  
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ProductsRoutingModule,

  ]
})
export class ProductsModule { }
