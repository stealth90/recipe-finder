import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import useRecipe from './useRecipe';
import TheMealDB from '../services/TheMealDBService';
import { beforeEach, describe, expect, it, vi } from 'vitest';

let getStoredMealByIdMock: (id: string) => any = () => null;
let saveMock = vi.fn();

vi.mock('./useMealsStorage', () => ({
  default: () => ({
    getStoredMealById: (id: string) => getStoredMealByIdMock(id),
    saveMealToStorage: (...args: any[]) => saveMock(...args),
  }),
}));

const TestComponent = () => {
  const { isLoading, isError, recipe } = useRecipe();
  return (
    <div>
      <div data-testid="loading">{String(isLoading)}</div>
      <div data-testid="error">{String(isError)}</div>
      <div data-testid="recipe">{recipe ? recipe.strMeal : 'null'}</div>
    </div>
  );
};

vi.mock('../services/TheMealDBService', () => ({
  default: { getMealById: vi.fn() },
}));

describe('useRecipe', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    getStoredMealByIdMock = () => null;
    saveMock = vi.fn();
  });

  it('returns stored meal if available and does not call network', async () => {
    const stored = { idMeal: '1', strMeal: 'Stored Meal' } as any;
    getStoredMealByIdMock = () => stored;

    render(
      <MemoryRouter initialEntries={["/recipes/1"]}>
        <Routes>
          <Route path="/recipes/:id" element={<TestComponent />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByTestId('recipe').textContent).toBe('Stored Meal'));
    expect(TheMealDB.getMealById).not.toHaveBeenCalled();
  });

  it('fetches meal when not stored and saves it', async () => {
    (TheMealDB.getMealById as any).mockResolvedValue({ idMeal: '2', strMeal: 'Fetched Meal' });
    getStoredMealByIdMock = () => null;
    saveMock = vi.fn();

    render(
      <MemoryRouter initialEntries={["/recipes/2"]}>
        <Routes>
          <Route path="/recipes/:id" element={<TestComponent />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByTestId('recipe').textContent).toBe('Fetched Meal'));
    expect(TheMealDB.getMealById).toHaveBeenCalledWith('2');
    expect(saveMock).toHaveBeenCalled();
  });
});
