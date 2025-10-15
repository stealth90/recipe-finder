import type { Ingredient, Meal } from '../types/TheMealDB';

export const mapIngredientsPreparationStringToArray = (input: string | null): string[] => {
  if (!input) return [];

  // Normalize line endings and trim
  const normalized = input.replace(/\r\n/g, '\n').trim();

  // Helper to strip leading step numbering like "1.", "1)", "1 ", "STEP 1:" etc.
  // Strip leading numbering and common list bullets/punctuation.
  // Handles: "1.", "1)", "STEP 1:", "3 -", "3 - ", bullets like "- item" or "• item".
  const stripLeadingNumber = (text: string) =>
    text
      // remove leading STEP/number markers and any intervening punctuation/spaces
      .replace(/^\s*(?:STEP\s*)?\d{1,3}(?:[\)\.\:\-]|(?:\s*[-–—•]\s*))*\s*/i, '')
      // remove any leading bullets/dashes that remain
      .replace(/^[\s\-–—•]+/, '')
      .trim();

  // 1) If double line breaks present, split by them first (common in TheMealDB)
  if (/\n\s*\n/.test(normalized)) {
    const parts = normalized.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    if (parts.length > 1) {
      const cleaned = parts.map((p) => stripLeadingNumber(p)).filter(Boolean);
      if (cleaned.length > 1) return cleaned;
    }
  }

  // 1b) STEP labels: use lookahead split (handle "STEP 1: ... STEP 2: ...")
  if (/\bSTEP\s*\d{1,3}[\)\.:\-]?\s*/i.test(normalized)) {
    const parts = normalized
      .split(/(?=\bSTEP\s*\d{1,3}[\)\.:\-]?\s*)/i)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => p.replace(/^\s*STEP\s*\d{1,3}[\)\.:\-]?\s*/i, '').trim());
    if (parts.length > 1) return parts;
  }

  // 1c) Inline numbered steps: split by number markers using lookahead (handles "1 Preheat... 2 Mix...")
  // Avoid matching patterns that begin with STEP (already handled above)
  if (/\b\d{1,3}[\)\.:\-]?\s+[A-Z]/.test(normalized)) {
    const parts = normalized
      .split(/(?=\b\d{1,3}[\)\.:\-]?\s+)/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => stripLeadingNumber(p));
    if (parts.length > 1) return parts;
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
  // 3) STEP labels: use lookahead split
  if (/\bSTEP\s*\d{1,3}[\)\.:\-]?\s*/i.test(normalized)) {
    const parts = normalized
      .split(/(?=\bSTEP\s*\d{1,3}[\)\.:\-]?\s*)/i)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => p.replace(/^\s*STEP\s*\d{1,3}[\)\.:\-]?\s*/i, '').trim());
    if (parts.length > 1) return parts;
  }

  // 3b) Semicolon-separated steps
  if (normalized.includes(';')) {
    const parts = normalized.split(/;\s*/).map((p) => p.trim()).filter(Boolean);
    if (parts.length > 1) return parts;
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
