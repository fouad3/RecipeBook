import { AuthEffects } from './../auth/store/auth.effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { FirstVisitRecipeComponent } from './first-visit-recipe/first-visit-recipe.component';
import { RecipesComponent } from './recipes.component';
import { RecipesRoutingModule } from './recipes_routing.module';
import { recipeReducer } from './store/recipe.reducers';
import { EffectsModule } from '@ngrx/effects';
import { RecipeEffects } from './store/recipe.effects';





@NgModule({
  declarations: [
    RecipesComponent,
    FirstVisitRecipeComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule,
    StoreModule.forFeature('recipes', recipeReducer),
    EffectsModule.forFeature([RecipeEffects])
  ]
})
export class RecipesModule {

}
