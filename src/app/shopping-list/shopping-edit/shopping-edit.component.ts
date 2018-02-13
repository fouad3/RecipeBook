import { Subscription } from 'rxjs/Subscription';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {Ingredient} from '../../shared/Ingredient.model';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListform: NgForm;
  editMode = false;
  editedItem: Ingredient;
  subscription: Subscription;

  constructor(private store: Store<fromShoppingList.ShoppingListState>) {}

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
          .subscribe(
            data => {
              if (data.editedIngredientIndex > -1) {
                this.editedItem = data.editedIngredient;
                this.editMode = true;
                this.shoppingListform.setValue({
                  name: this.editedItem.name,
                  amount: this.editedItem.amount
                });
              } else {
                this.editMode = false;
              }
            }
          );
  }

  onSubmitItem() {
    const ingredient = new Ingredient(this.shoppingListform.value.name,
                      this.shoppingListform.value.amount);
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
      this.editMode = false;
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }
    this.shoppingListform.reset();
  }

  deleteItem() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient);
    this.resetForm();
  }

  resetForm () {
    this.shoppingListform.reset();
    this.editMode = false;
  }

  ngOnDestroy () {
    this.store.dispatch(new ShoppingListActions.StoptEdit());
    this.subscription.unsubscribe();
  }
}
