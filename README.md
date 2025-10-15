<h1 align="center">Recipe Finder</h1>

<h4 align="center">Recipe Finder is a small React + Vite + TypeScript application that searches recipes using TheMealDB API and displays recipe lists and detailed recipe pages</h4>



  <div align="center">
    <img src="https://github.com/yuriyyakym/awai/actions/workflows/tests.yml/badge.svg" />
    <img src="https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/stealth90/6f7058e8183ebe812f33411c08a54011/raw/coverage-master.json" alt="Coverage" />
    <img src="https://img.shields.io/badge/Stability-experimental-blue.svg" />
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" />
  </div>

## Table of Contents

- Project summary
- Tech stack
- Getting started
  - Requirements
  - Install
  - Environment variables
  - Run
  - Build
- Project structure
- Important modules
  - Routing
  - Pages
  - Components
  - Hooks
  - Services
  - Utilities
  - Types
- Accessibility notes
- FAQ
- License

---

## Project summary

Recipe Finder lets users search recipes (via a query) and view recipe details. Data is fetched from TheMealDB API. The user can search from the home page, see results on the recipes list page and click a recipe to view details (ingredients, preparation steps, tags, metadata, and optional video source).

## Tech stack

- Vite
- React 19 + TypeScript
- React Router (v7)
- Tailwind CSS
- vite-plugin-svgr (SVG as React components)

## Getting started

### Requirements

- Node.js 18+ (recommended)
- npm or pnpm

### Install

1. Install dependencies:

```bash
yarn
```

### Environment variables

The app uses TheMealDB API. Create a `.env` file at project root and add your key (or use the public key if available):

```
VITE_MEALDB_API_KEY=1
```

> The API base URL is assembled inside `src/services/TheMealDBService.ts` using `import.meta.env.VITE_MEALDB_API_KEY`.

### Run in development

```bash
yarn dev
```

Open the port Vite reports (usually http://localhost:5173) and start using the app.

### Build for production

```bash
yarn build
yarn preview
```

---

## Project structure (important files)

```
src/
├─ App.tsx                # Router provider
├─ main.tsx               # App entry
├─ routes.tsx             # App routes
├─ pages/
│  ├─ Home.tsx            # Landing page + search form
│  ├─ RecipeList.tsx      # Search results page
│  └─ Recipe.tsx          # Single recipe page (details)
├─ components/
│  ├─ SearchBar.tsx       # Search input + submit button
│  ├─ RecipeCard/         # Recipe card + styles
│  ├─ Ingredients/        # Ingredients list component
│  ├─ Preparation/        # Preparation steps component
│  ├─ Spinner/            # Spinner SVG component
│  └─ Tag/                # Small Tag component
├─ services/
│  └─ TheMealDBService.ts # Wrapper for TheMealDB API
├─ hooks/
│  ├─ useRecipe.ts
│  └─ useSearchRecipes.ts
├─ utils/
│  └─ index.ts            # Utilities: mapIngredients, parsing helpers
├─ types/
│  └─ TheMealDB.ts        # Meal and Ingredient types
└─ index.css              # Global styles + line-clamp helpers
```

---

## Important modules & details

### Routing

`src/routes.tsx` registers three main screens using `createBrowserRouter`:

- `/` -> `Home` (index)
- `/recipes` -> `RecipeList` (index)
- `/recipes/:id` -> `Recipe` (detail)

Search is implemented using `react-router`'s `<Form>` and `useSearchParams` in `useSearchRecipes`.

### Pages

- `Home.tsx` contains the search form (`<Form action="/recipes">`) and `SearchBar` component.
- `RecipeList.tsx` displays search results using `useSearchRecipes` hook and `RecipeCard` components.
- `Recipe.tsx` displays a single recipe using `useRecipe` hook, `Ingredients` and `Preparation` components and includes accessibility improvements (focus management, keyboard handling, aria tags).

### Components

- `SearchBar.tsx`: uses a `ref` for the input and a submit button. Supports pressing Enter to trigger search and returns the query via `onSearch` or form submission. When used inside a `<Form>` from react-router it can submit the form directly.

- `RecipeCard`: small card showing thumbnail, title, category and area. Uses CSS `line-clamp` helpers to limit title/description length.

- `Ingredients`: renders a list of ingredients with quantities. The utility `mapIngredientsKeyToArray` maps `strIngredient{n}` with `strMeasure{n}` into `{label, quantity}` objects.

- `Preparation`: renders preparation steps passed as array of strings. The utility `mapIngredientsPreparationStringToArray` parses the instructions string from TheMealDB into steps trying multiple patterns (numbered steps, STEP, CRLF, etc.).

- `Spinner`: accessible SVG spinner component.

- `Tag`: simple tag pill.

### Hooks

- `useSearchRecipes.ts`: reads `query` from `useSearchParams`, fetches recipe list from `TheMealDBService.searchRecipeByQuery`, and provides `searchMeal(query)` to update the URL params.

- `useRecipe.ts`: reads `id` from `useParams`, fetches details via `TheMealDBService.getMealById`, exposes `goBack()` to navigate back.

### Services

- `src/services/TheMealDBService.ts` is a small wrapper around fetch for:
  - `search.php?s={query}`
  - `lookup.php?i={id}`
  - `random.php`

Handle `VITE_MEALDB_API_KEY` in `.env`.

### Utils

`src/utils/index.ts` includes:
- `mapIngredientsPreparationStringToArray(input: string | null): string[]`:
  - Tries to normalize the free-form instructions string from TheMealDB into an array of steps.
  - Implements several heuristics: numbered steps (e.g. `1 ... 2 ...`), `STEP` / `Step` labels, double line breaks, single line breaks, sentence heuristics and semicolons.
  - This function is intentionally defensive because instructions from TheMealDB are inconsistent.

- `mapIngredientsKeyToString(meal: Meal): string`:
  - Joins available `strIngredientX` values into a comma-separated string.

- `mapIngredientsKeyToArray(meal: Meal): Ingredient[]`:
  - Maps `strIngredient{n}` with `strMeasure{n}` into `{label, quantity}` objects used by `Ingredients` component.

### Types

- `src/types/TheMealDB.ts` contains `Meal` and `Ingredient` TS type definitions that mirror TheMealDB API shape used by this app.


## Accessibility notes

The `Recipe.tsx` page includes several accessibility enhancements:

- Keyboard handling for global Backspace navigation and local back button (`Enter` / `Space`).
- Focus management: when recipe data loads or an error occurs, the appropriate container is focused with `tabIndex={-1}`.
- `aria-live` regions for loading (`role=status`, `aria-live="polite"`) and errors (`role=alert`, `aria-live="assertive"`).
- Buttons and links have explicit `aria-label`s and `rel="noopener noreferrer"` on external links.
- Skip-to-content link is provided on the recipe page.

The rest of components follow semantic HTML and use proper headings. Consider adding more tests for keyboard navigation and screen reader usage.


## FAQ

Q: Why does the parser sometimes fail?
A: TheMealDB content is free-form and inconsistent; the parser uses heuristics and won't be perfect. Add test cases and expand regexes where needed.

Q: How many ingredients are supported?
A: TheMealDB provides up to 20 ingredients (`strIngredient1..20`), the code iterates through those keys.

Q: How to add unit tests?
A: Add a testing framework like Vitest or Jest. Start with unit tests for `utils/index.ts` parsing edge cases.

---

## License

This repo doesn't include a license file. Add one if you plan to publish.
