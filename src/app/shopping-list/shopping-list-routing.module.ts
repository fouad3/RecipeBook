import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { NgModule, Component } from '@angular/core';



const shoppingRoutes: Routes = [
  {
    path: '',
    component: ShoppingListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(shoppingRoutes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {}
