import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recipe-page/:id', component: RecipePageComponent },
  { path: 'recipe-page', component: RecipePageComponent },
  { path: 'my-recipes', component: MyRecipesComponent },
  { path: 'recipes', component: AllRecipesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
