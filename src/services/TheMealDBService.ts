import type { Meal } from '../types/TheMealDB';

class TheMealDBService {
  private readonly API_KEY = import.meta.env.VITE_MEALDB_API_KEY;
  private readonly BASE_URL = `https://www.themealdb.com/api/json/v1/${this.API_KEY}/`;
  private signedUrl: string = '';

  constructor() {
    this.signedUrl = this.BASE_URL;
  }

  async searchRecipeByQuery(query: string): Promise<Meal[] | null> {
    try {
      const url = `${this.signedUrl}search.php?s=${query}`;
      const response = await fetch(url);
      const data = await response.json();
      return data.meals;
    } catch (error) {
      console.error('Error fetching recipe by query:', error);
      return null;
    }
  }

  async getMealById(id: string): Promise<Meal | null> {
    try {
      const url = `${this.signedUrl}lookup.php?i=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      return data?.meals?.[0] || null;
    } catch (error) {
      console.error('Error fetching meal details by id:', error);
      return null;
    }
  }

  async getSingleRandomMeal(): Promise<Meal | null> {
    try {
      const url = `${this.signedUrl}random.php`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching meal by name:', error);
      return null;
    }
  }
}

export default new TheMealDBService();
