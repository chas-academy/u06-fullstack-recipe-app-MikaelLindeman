import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EdamamService } from '../edamam.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.scss'],
})
export class AllRecipesComponent implements OnInit {
  searchResults: any[] = [];
  allergies = ['Gluten', 'Dairy', 'Eggs'];
  selectedAllergies: string[] = [];
  searchQuery: string = '';
  allRecipes: any[] = [];
  displayedRecipes: any[] = [];
  selectedHealthLabels: string[] = [];
  healthLabels = [
    { label: 'Dairy-Free', value: 'dairy-free' },
    { label: 'Vegan', value: 'vegan' },
    { label: 'Gluten-Free', value: 'gluten-free' },
  ];
  selectedFilters: Set<string> = new Set();
  mealTypes = [
    { label: 'Breakfast', value: 'breakfast' },
    { label: 'Snack', value: 'snack' },
    { label: 'Brunch', value: 'brunch' },
  ];
  selectedMealTypes: Set<string> = new Set();

  private appId: string = 'a70e13cc';
  private appKey: string = '6bc7956167e26b2efa8c5ccd8e78334c	';
  private apiUrl: string = 'https://api.edamam.com/api/recipes/v2';

  constructor(
    private http: HttpClient,
    private edamameService: EdamamService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {}

  searchRecipes(): void {
    const selectedHealthLabels = Array.from(this.selectedFilters);
    const selectedMealTypesArray = Array.from(this.selectedMealTypes);

    // Pass the search query, selected health labels, and selected meal types to the service
    this.edamameService
      .searchRecipes(
        this.searchQuery,
        selectedHealthLabels,
        selectedMealTypesArray
      )

      .subscribe({
        next: (response) => {
          this.searchResults = response.hits;
        },
        error: (error) => {
          console.error('Error fetching recipes with filters:', error);
        },
      });
  }

  onCheckboxChange(allergy: string, event: any) {
    if (event.target.checked) {
      if (!this.selectedAllergies.includes(allergy)) {
        this.selectedAllergies.push(allergy);
      }
    } else {
      this.selectedAllergies = this.selectedAllergies.filter(
        (item) => item !== allergy
      );
    }
  }

  applyFilters() {
    this.displayedRecipes = this.allRecipes.filter((recipe) =>
      this.selectedHealthLabels.every((label) =>
        recipe.recipe.healthLabels.includes(label)
      )
    );
  }

  onHealthLabelChange(value: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedFilters.add(value);
    } else {
      this.selectedFilters.delete(value);
    }

    this.searchRecipes();
  }

  onMealTypeChange(value: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedMealTypes.add(value);
    } else {
      this.selectedMealTypes.delete(value);
    }

    this.searchRecipes();
  }
}
