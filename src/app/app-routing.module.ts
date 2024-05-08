import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'', redirectTo:'/products', pathMatch: 'full' },
  { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },
  { path: 'finalize-purchase', loadChildren: () => import('./pages/products/finalize-purchase/finalize-purchase.module').then(m => m.FinalizePurchaseModule) },
  { path:'**', redirectTo:'', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
