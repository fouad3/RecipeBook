import { Observable } from 'rxjs/Observable';
import {Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipActions from '../../recipes/store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor (private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSave() {
    this.store.dispatch(new ShoppingListActions.StoreIngredients());
    this.store.dispatch(new RecipActions.StoreRecipes());

  }

  onGet() {
    this.store.dispatch(new ShoppingListActions.FetchIngredients());
    this.store.dispatch(new RecipActions.FetchRecipes());
  }

  logout() {
    this.store.dispatch(new AuthActions.LogOut());
  }
}
