import { describe, it, expect } from 'vitest';
import { mapIngredientsPreparationStringToArray, mapIngredientsKeyToArray, mapIngredientsKeyToString } from './index';
import type { Meal } from '../types/TheMealDB';

describe('mapIngredientsPreparationStringToArray - additional cases', () => {
  it('parses numbered steps without double newlines', () => {
    const input = '1 Preheat oven. 2 Mix flour. 3 Bake.';
    const result = mapIngredientsPreparationStringToArray(input);
    expect(result).toEqual(['Preheat oven.', 'Mix flour.', 'Bake.']);
  });

  it('parses STEP labels', () => {
    const input = 'STEP 1: Chop onions. STEP 2: Fry onions.';
    const result = mapIngredientsPreparationStringToArray(input);
    expect(result).toEqual(['Chop onions.', 'Fry onions.']);
  });

  it('parses semicolon separated instructions', () => {
    const input = 'Heat oil; Add onions; Cook until golden';
    const result = mapIngredientsPreparationStringToArray(input);
    expect(result.length).toBeGreaterThan(1);
  });

  it('falls back to sentence splitting', () => {
    const input = 'Heat oil. Add onions. Cook until golden.';
    const result = mapIngredientsPreparationStringToArray(input);
    expect(result).toEqual(['Heat oil', 'Add onions', 'Cook until golden.']);
  });
});

describe('mapIngredientsKeyToArray and mapIngredientsKeyToString', () => {
  const mockMeal = {
    idMeal: '1',
    strMeal: 'Test Meal',
    strMealAlternate: null,
    strCategory: 'Category',
    strArea: 'Area',
    strInstructions: 'Do stuff',
    strMealThumb: 'http://example.com/img.jpg',
    strTags: 'tag1,tag2',
    strYoutube: '',
    strIngredient1: 'Flour',
    strIngredient2: 'Salt',
    strIngredient3: '',
    strIngredient4: null,
    strIngredient5: '',
    strIngredient6: '',
    strIngredient7: '',
    strIngredient8: '',
    strIngredient9: '',
    strIngredient10: '',
    strIngredient11: '',
    strIngredient12: '',
    strIngredient13: '',
    strIngredient14: '',
    strIngredient15: '',
    strIngredient16: '',
    strIngredient17: '',
    strIngredient18: '',
    strIngredient19: '',
    strIngredient20: '',
    strMeasure1: '200g',
    strMeasure2: '1 tsp',
    strMeasure3: '',
    strMeasure4: '',
    strMeasure5: '',
    strMeasure6: '',
    strMeasure7: '',
    strMeasure8: '',
    strMeasure9: '',
    strMeasure10: '',
    strMeasure11: '',
    strMeasure12: '',
    strMeasure13: '',
    strMeasure14: '',
    strMeasure15: '',
    strMeasure16: '',
    strMeasure17: '',
    strMeasure18: '',
    strMeasure19: '',
    strMeasure20: '',
    strSource: '',
    strImageSource: '',
    strCreativeCommonsConfirmed: null,
    dateModified: '',
  } as unknown as Meal;

  it('maps ingredients to array with quantity', () => {
    const arr = mapIngredientsKeyToArray(mockMeal);
    expect(arr).toEqual([
      { label: 'Flour', quantity: '200g' },
      { label: 'Salt', quantity: '1 tsp' },
    ]);
  });

  it('maps ingredients to string', () => {
    const str = mapIngredientsKeyToString(mockMeal);
    expect(str).toContain('Flour');
    expect(str).toContain('Salt');
  });
});
