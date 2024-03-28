import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.scss'],
})
export class AllRecipesComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];

  private appId: string = 'a70e13cc';
  private appKey: string = '6bc7956167e26b2efa8c5ccd8e78334c';
  private apiUrl: string = 'https://api.edamam.com/api/recipes/v2';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  searchRecipes(): void {
    const params = `?type=public&q=${this.searchQuery}&app_id=${this.appId}&app_key=${this.appKey}`;
    this.http.get(`${this.apiUrl}${params}`).subscribe(
      (data: any) => {
        this.searchResults = data.hits;
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }
}
