import { Recipe } from './../recipe.model';
import { Store } from '@ngrx/store';
import {Component, OnInit} from '@angular/core';
import * as fromRecipe from '../store/recipe.reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Observable<fromRecipe.State>;

  constructor(private store: Store<fromRecipe.RecipeState>) {}

  ngOnInit() {
    this.recipes = this.store.select('recipes');
  }


}
