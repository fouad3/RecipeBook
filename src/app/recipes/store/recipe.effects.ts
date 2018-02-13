import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../../recipes/recipe.model';
import {Actions, Effect } from '@ngrx/effects';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import * as RecipeActions from '../store/recipe.actions';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import * as fromRecipe from './recipe.reducers';


@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
  .ofType(RecipeActions.FETCH_RECIPES)
  .switchMap((action: RecipeActions.FetchRecipes) => {
    return this.httpClient.get<Recipe[]>
    ('https://ng-recipe-book-77d1d.firebaseio.com/recipes.json');
  })
  .map(
    (recipes) => {
      for (let recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      this.router.navigate(['/']);
      return {
        type: RecipeActions.SET_RECIPES,
        payload: recipes
      };
    }
  );


  @Effect({ dispatch: false })
  recipeStore = this.actions$
  .ofType(RecipeActions.STORE_RECIPES)
  .withLatestFrom(this.store.select('recipes'))
  .switchMap(([action, state]) => {
    const req = new HttpRequest('PUT',
      'https://ng-recipe-book-77d1d.firebaseio.com/recipes.json',
      state.recipes,
    {
      reportProgress: true,
    } );
      this.router.navigate(['/']);
      return this.httpClient.request(req);
    });

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipe.RecipeState>,
              private router: Router) {}
}
