import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from '../../shared/Ingredient.model';

export interface ShoppingListState {
  shoppingList: State;
 }

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
 }

const initialState: State = {
  ingredients: [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes' , 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

function filter (myarr: Ingredient[]) {
  return myarr.filter((obj, index, arr) => {
    return arr.map((arrayCopy) => arrayCopy.name).indexOf(obj.name) === index;
  }
  );
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions
  .ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: [...action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: filter([...state.ingredients, action.payload])
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: filter([...state.ingredients, ...action.payload])
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };
      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.START_EDIT:
      const editedIngredient = {...state.ingredients[action.payload]};
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}
