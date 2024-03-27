import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { EdamamService } from '../edamam.service';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss'],
})
export class RecipePageComponent implements OnInit {
  recipe: any;
  selectedIngredients = new Set<number>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private edamamService: EdamamService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const recipeId = params.get('id');
      if (recipeId) {
        this.edamamService.getRecipeDetails(recipeId).subscribe({
          next: (data) => {
            this.recipe = data.recipe;
          },
          error: (error) =>
            console.error('Error fetching recipe details:', error),
        });
      }
    });
  }
  toggleIngredient(index: number): void {
    if (this.selectedIngredients.has(index)) {
      this.selectedIngredients.delete(index);
    } else {
      this.selectedIngredients.add(index);
    }
  }

  getIngredientsList(): string {
    return (
      this.recipe?.ingredients
        ?.map((ingredient: any) => ingredient.text)
        .join(', ') ?? 'No ingredients available'
    );
  }
}
