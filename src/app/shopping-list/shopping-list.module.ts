import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { NgModule } from '@angular/core';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './store/shopping-list.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ShoppingListEffects } from './store/shopping-list.effects';




@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShoppingListRoutingModule,
    StoreModule.forFeature('shoppingList', shoppingListReducer),
    EffectsModule.forFeature([ShoppingListEffects]),

  ]

})
export class ShoppingListModule {}
