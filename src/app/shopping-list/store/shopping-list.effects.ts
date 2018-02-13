import { Ingredient } from '../../shared/Ingredient.model';
import { Store } from '@ngrx/store';
import {Actions, Effect } from '@ngrx/effects';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import * as ShoppingListActions from './shopping-list.actions';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import * as fromShoppingList from './shopping-list.reducers';


@Injectable()
export class ShoppingListEffects {
  @Effect()
  shoppingListFetch = this.actions$
  .ofType(ShoppingListActions.FETCH_INGREDIENTS)
  .switchMap((action: ShoppingListActions.FetchIngredients) => {
    return this.httpClient.get<Ingredient[]>('https://ng-recipe-book-77d1d.firebaseio.com/shopping-list.json');
    })
  .map((ingredients) => {
      return {
        type: ShoppingListActions.SET_INGREDIENTS,
        payload: ingredients
      };
    }
  );


  @Effect({ dispatch: false })
  shoppingListStore = this.actions$
  .ofType(ShoppingListActions.STORE_INGREDIENTS)
  .withLatestFrom(this.store.select('shoppingList'))
  .switchMap(([action, state]) => {
    const req = new HttpRequest('PUT',
     'https://ng-recipe-book-77d1d.firebaseio.com/shopping-list.json',
      state.ingredients,
      {
        reportProgress: true
      }
    );
    return this.httpClient.request(req);
    });

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromShoppingList.ShoppingListState>) {}
}
