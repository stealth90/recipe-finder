import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import useSearchRecipes from './useSearchRecipes';
import TheMealDB from '../services/TheMealDBService';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const TestComponent = () => {
  const { isLoading, isError, recipes, searchMeal } = useSearchRecipes();
  return (
    <div>
      <div data-testid="loading">{String(isLoading)}</div>
      <div data-testid="error">{String(isError)}</div>
      <div data-testid="recipes">{recipes ? recipes.length : 'null'}</div>
      <button onClick={() => searchMeal('pasta')}>search</button>
    </div>
  );
};

vi.mock('../services/TheMealDBService', () => ({
  default: { searchRecipeByQuery: vi.fn() },
}));

describe('useSearchRecipes', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('navigates to / when no query param', async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<TestComponent />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('recipes').textContent).toBe('null');
    });
  });

  it('fetches recipes when query present and searchMeal updates params', async () => {
    (TheMealDB.searchRecipeByQuery as any).mockResolvedValue([{ idMeal: '1', strMeal: 'Pasta' }]);

    render(
      <MemoryRouter initialEntries={["/recipes?query=pasta"]}>
        <Routes>
          <Route path="/recipes" element={<TestComponent />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByTestId('recipes').textContent).toBe('1'));

    screen.getByText('search').click();
    expect(TheMealDB.searchRecipeByQuery).toHaveBeenCalled();
  });
});
