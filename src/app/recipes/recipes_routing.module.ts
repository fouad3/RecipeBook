import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { FirstVisitRecipeComponent } from './first-visit-recipe/first-visit-recipe.component';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AuthGuard } from '../auth/auth-guard.service';



const recipesRoutes: Routes = [
  {path: '', component: RecipesComponent , children: [
    {path: '', component: FirstVisitRecipeComponent} ,
    {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard]},
    {path: ':id', component: RecipeDetailComponent},
    {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard]}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(recipesRoutes)],
  exports: [RouterModule]

})
export class RecipesRoutingModule {}
