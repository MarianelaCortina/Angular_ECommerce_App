import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinalizePurchaseComponent } from './finalize-purchase.component';

const routes: Routes = [{ path: '', component: FinalizePurchaseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinalizePurchaseRoutingModule { }
