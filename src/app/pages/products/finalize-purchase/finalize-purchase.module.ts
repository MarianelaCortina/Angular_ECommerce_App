import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinalizePurchaseRoutingModule } from './finalize-purchase-routing.module';
import { FinalizePurchaseComponent } from './finalize-purchase.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    FinalizePurchaseComponent
  ],
  imports: [
    CommonModule,
    FinalizePurchaseRoutingModule,
    MaterialModule
  ]
})
export class FinalizePurchaseModule { }
