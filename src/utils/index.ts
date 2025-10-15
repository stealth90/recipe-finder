import type { Ingredient, Meal } from '../types/TheMealDB';

export const mapIngredientsPreparationStringToArray = (input: string | null): string[] => {
  if (!input) return [];

  // Normalize line endings and trim
  const normalized = input.replace(/\r\n/g, '\n').trim();

  // Helper to strip leading step numbering like "1.", "1)", "1 ", "STEP 1:" etc.
  const stripLeadingNumber = (text: string) => text.replace(/^\s*(?:STEP\s*)?\d{1,3}[\)\.:\-]?\s*/i, '').trim();

  // 1) If double line breaks present, split by them first (common in TheMealDB)
  if (/\n\s*\n/.test(normalized)) {
    const parts = normalized.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    if (parts.length > 1) {
      const cleaned = parts.map((p) => stripLeadingNumber(p)).filter(Boolean);
      if (cleaned.length > 1) return cleaned;
    }
  }

  // 2) Detect numbered steps anywhere and extract by positions (handles 1..9, 10, 11 etc.)
  const numberedMarker = /(^|\n)\s*(?:STEP\s*)?\d{1,3}[\)\.:\-]?\s*/gi;
  const matches = Array.from(normalized.matchAll(numberedMarker));
  if (matches.length > 1) {
    const positions = matches.map((m) => m.index as number).sort((a, b) => a - b);
    const steps: string[] = [];
    for (let i = 0; i < positions.length; i++) {
      const start = positions[i];
      const end = i + 1 < positions.length ? positions[i + 1] : normalized.length;
      let chunk = normalized.slice(start, end).trim();
      chunk = stripLeadingNumber(chunk);
      if (chunk) steps.push(chunk);
    }
    if (steps.length > 1) return steps;
  }

  // 3) STEP labels without double-newline but multiple occurrences
  const stepLabelMarker = /(^|\n)\s*STEP\s*\d{1,3}[\)\.:\-]?\s*/gi;
  const stepLabelMatches = Array.from(normalized.matchAll(stepLabelMarker));
  if (stepLabelMatches.length > 1) {
    const positions = stepLabelMatches.map((m) => m.index as number).sort((a, b) => a - b);
    const steps: string[] = [];
    for (let i = 0; i < positions.length; i++) {
      const start = positions[i];
      const end = i + 1 < positions.length ? positions[i + 1] : normalized.length;
      let chunk = normalized.slice(start, end).trim();
      chunk = chunk.replace(/^\s*STEP\s*\d{1,3}[\)\.:\-]?\s*/i, '').trim();
      if (chunk) steps.push(chunk);
    }
    if (steps.length > 1) return steps;
  }

  // 4) Fallbacks: try splits by single newline, then by sentence boundary
  const singleLines = normalized.split(/\n/).map((l) => l.trim()).filter((l) => l.length > 0);
  if (singleLines.length > 1 && singleLines.some((l) => l.length > 10)) {
    return singleLines;
  }

  const sentences = normalized
    .split(/\.\s+(?=[A-Z0-9"'\(])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  if (sentences.length > 1) return sentences;

  return [normalized];
};

export const mapIngredientsKeyToString = (meal: Meal): string => {
  const propertyKeys = Object.keys(meal) as (keyof Meal)[];
  const ingredientsKeys = propertyKeys.filter((key) => key.startsWith('strIngredient'));
  const ingredients = ingredientsKeys
    .map((key) => meal[key])
    .filter((value) => value && value.trim() !== '');
  return ingredients.join(', ') as string;
};

export const mapIngredientsKeyToArray = (meal: Meal): Ingredient[] => {
  const ingredients: Ingredient[] = [];
  const propertyKeys = Object.keys(meal) as (keyof Meal)[];
  const ingredientKeys = propertyKeys.filter((key) => key.startsWith('strIngredient'));

  ingredientKeys.forEach((ingredientKey) => {
    const ingredientValue = meal[ingredientKey];

    // Verifica che l'ingrediente non sia vuoto
    if (ingredientValue && ingredientValue.trim() !== '') {
      // Estrai il numero dall'ingrediente (es: strIngredient1 -> 1)
      const number = ingredientKey.replace('strIngredient', '');
      const measureKey = `strMeasure${number}` as keyof Meal;

      // Ottieni la quantità corrispondente
      const measureValue = meal[measureKey] || '';

      ingredients.push({
        label: ingredientValue.trim(),
        quantity: measureValue.trim(),
      });
    }
  });
  return ingredients;
};
