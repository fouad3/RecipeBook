import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {Recipe} from '../recipe.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import { Subscription } from 'rxjs/Subscription';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';



@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipeItem: Recipe;
  id: number;
  subscription: Subscription;
  authState: fromAuth.State;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>,
              private recipeStore: Store<fromRecipe.RecipeState>) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.subscription = this.recipeStore.select('recipes').subscribe((state) => {
          this.recipeItem = state.recipes[+params['id']];
          this.id = +params['id'];
        });
        }
      );

    this.store.select('auth')
      .take(1)
      .subscribe((authState: fromAuth.State) => {
          this.authState = authState;
        }
      );
  }

  addIngredients() {
    if (this.authState.authenticated) {
      this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipeItem.ingredients));
    } else {
      this.router.navigate(['/']);
    }
  }

  deleteRecipe () {
    if (this.authState.authenticated) {
      this.recipeStore.dispatch(new RecipeActions.DeleteRecipe(this.id) );
      this.router.navigate(['../'], {relativeTo: this.route});
      } else {
        this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
