import { Recipe } from './../recipe.model';
import { Action } from '@ngrx/store';


export const FETCH_RECIPES = 'FETCH_RECIPES';
export const STORE_RECIPES = 'STORE_RECIPES';
export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';

export class FetchRecipes {
  readonly type = FETCH_RECIPES;
}

export class StoreRecipes {
  readonly type = STORE_RECIPES;
}

export class SetRecipes {
  readonly type = SET_RECIPES;
  constructor (public payload: Recipe[]) {}
}

export class AddRecipe {
  readonly type = ADD_RECIPE;
  constructor (public payload: Recipe) {}
}

export class UpdateRecipe {
  readonly type = UPDATE_RECIPE;
  constructor (public payload: {recipeIndex: number, recipe: Recipe} ) {}
}

export class DeleteRecipe {
  readonly type = DELETE_RECIPE;
  constructor(public payload: number) {}
}



export type RecipeActions =
  SetRecipes |
  AddRecipe |
  UpdateRecipe |
  DeleteRecipe
  ;
