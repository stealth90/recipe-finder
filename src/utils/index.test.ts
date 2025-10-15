import { describe, it, expect } from 'vitest';
import {
  mapIngredientsKeyToArray,
  mapIngredientsPreparationStringToArray,
  mapIngredientsKeyToString,
} from './index';
import type { Meal } from '../types/TheMealDB';

describe('mapIngredientsPreparationStringToArray function', () => {
  it('mapIngredientsPreparationStringToArray handles null input', () => {
    const result = mapIngredientsPreparationStringToArray(null);
    expect(result).toEqual([]);
  });
  it('parses mixed numbered steps with double newlines correctly', () => {
    const input = `1 Preheat the oven to 230°C.

2 Add the sugar and crumble the fresh yeast into warm water.

3 Allow the mixture to stand for 10 – 15 minutes in a warm place (we find a windowsill on a sunny day works best) until froth develops on the surface.

4 Sift the flour and salt into a large mixing bowl, make a well in the middle and pour in the yeast mixture and olive oil.

5 Lightly flour your hands, and slowly mix the ingredients together until they bind.

6 Generously dust your surface with flour.

7 Throw down the dough and begin kneading for 10 minutes until smooth, silky and soft.

8 Place in a lightly oiled, non-stick baking tray (we use a round one, but any shape will do!)

9 Spread the passata on top making sure you go to the edge.

10 Evenly place the mozzarella (or other cheese) on top, season with the oregano and black pepper, then drizzle with a little olive oil.

11 Cook in the oven for 10 – 12 minutes until the cheese slightly colours.

12 When ready, place the basil leaf on top and tuck in!`;

    const expected = [
      'Preheat the oven to 230°C.',
      'Add the sugar and crumble the fresh yeast into warm water.',
      'Allow the mixture to stand for 10 – 15 minutes in a warm place (we find a windowsill on a sunny day works best) until froth develops on the surface.',
      'Sift the flour and salt into a large mixing bowl, make a well in the middle and pour in the yeast mixture and olive oil.',
      'Lightly flour your hands, and slowly mix the ingredients together until they bind.',
      'Generously dust your surface with flour.',
      'Throw down the dough and begin kneading for 10 minutes until smooth, silky and soft.',
      'Place in a lightly oiled, non-stick baking tray (we use a round one, but any shape will do!)',
      'Spread the passata on top making sure you go to the edge.',
      'Evenly place the mozzarella (or other cheese) on top, season with the oregano and black pepper, then drizzle with a little olive oil.',
      'Cook in the oven for 10 – 12 minutes until the cheese slightly colours.',
      'When ready, place the basil leaf on top and tuck in!',
    ];

    const result = mapIngredientsPreparationStringToArray(input);
    expect(result).toEqual(expected);
  });
  it('handles numbers with dots and parentheses', () => {
    const input = '1. Preheat. 2) Mix. 3 - Bake.';
    const result = mapIngredientsPreparationStringToArray(input);
    expect(result).toEqual(['Preheat.', 'Mix.', 'Bake.']);
  });

  it('handles STEP uppercase and mixed content', () => {
    const input = 'STEP 1: Do this. Some extra. STEP 2: Do that.';
    const result = mapIngredientsPreparationStringToArray(input);
    expect(result).toEqual(['Do this. Some extra.', 'Do that.']);
  });

  it('ignores isolated numbers and empty lines', () => {
    const input = '\n1\n\nPreheat oven\n\n2\nMix\n';
    const result = mapIngredientsPreparationStringToArray(input);
    expect(result).toEqual(['Preheat oven', 'Mix']);
  });

  it('handles semicolon and commas', () => {
    const input = 'Heat oil; add onions, then garlic; cook.';
    const result = mapIngredientsPreparationStringToArray(input);
    expect(result.length).toBeGreaterThan(1);
  });

  it('returns single element when no split possible', () => {
    const input = 'Single paragraph with no obvious separators';
    const result = mapIngredientsPreparationStringToArray(input);
    expect(result).toEqual([input]);
  });
});

describe('mapIngredientsKeyToArray function', () => {
  it('handles missing measures and null values', () => {
    const meal = {
      idMeal: '1',
      strMeal: 'Edge',
      strMealAlternate: null,
      strCategory: '',
      strArea: '',
      strInstructions: '',
      strMealThumb: '',
      strTags: '',
      strYoutube: '',
      strIngredient1: 'Sugar',
      strIngredient2: 'Butter',
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
      strMeasure1: '',
      strMeasure2: '2 tbsp',
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

    const arr = mapIngredientsKeyToArray(meal);
    expect(arr).toEqual([
      { label: 'Sugar', quantity: '' },
      { label: 'Butter', quantity: '2 tbsp' },
    ]);
  });
});

describe('mapIngredientsKeyToString function', () => {
  it('mapIngredientsKeyToString returns comma separated list', () => {
    const meal = {
      strIngredient1: 'Tomato',
      strIngredient2: 'Basil',
      strIngredient3: '',
    } as unknown as Meal;

    const s = mapIngredientsKeyToString(meal);
    expect(s).toContain('Tomato');
    expect(s).toContain('Basil');
  });
});
