import { Component, OnInit } from '@angular/core';
import { EdamamService } from '../edamam.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss'],
})
export class RecipeSearchComponent implements OnInit {
  recipes: any[] = [];

  constructor(
    private edamamService: EdamamService,
    private authService: AuthService,
    private router: Router,
    private recipe: RecipeService
  ) {}

  ngOnInit(): void {
    this.search('dinner');
    console.log(this.recipes);
  }

  search(query: string): void {
    this.edamamService.searchRecipes(query).subscribe({
      next: (response) => {
        console.log(response);
        this.recipes = response.hits;
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  addRecipe(recipe: any): void {
    this.authService.addRecipeToUserList(recipe).subscribe({
      next: (response) => {
        console.log('Recipe added to list', response);
      },
      error: (error) => {
        console.error('Error adding recipe to list', error);
      },
    });
  }

  viewRecipeDetail(uri: string): void {
    const id = uri.split('#recipe_')[1];
    this.router.navigate(['/recipe-page', id]);
  }
}
