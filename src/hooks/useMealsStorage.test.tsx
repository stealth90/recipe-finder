import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useMealsStorage from './useMealsStorage';
import { beforeEach, describe, expect, it } from 'vitest';

const meal = {
  idMeal: '1',
  strMeal: 'Test Meal',
  strMealThumb: '',
  strCategory: 'Category',
  strArea: 'Area',
} as any;

const TestComponent = () => {
  const { storedMeals, saveMealToStorage, onDeleteMeal, getStoredMealById } = useMealsStorage();

  return (
    <div>
      <div data-testid="count">{storedMeals.length}</div>
      <button onClick={() => saveMealToStorage(meal)}>save</button>
      <button onClick={() => saveMealToStorage(meal)}>save-dup</button>
      <button onClick={() => onDeleteMeal(meal.idMeal)}>delete</button>
      <div data-testid="found">{getStoredMealById(meal.idMeal) ? 'yes' : 'no'}</div>
    </div>
  );
};

describe('useMealsStorage (integration)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves a meal and prevents duplicates, and deletes', async () => {
    render(<TestComponent />);
    const user = userEvent.setup();

    expect(screen.getByTestId('count').textContent).toBe('0');

    await user.click(screen.getByText('save'));
    expect(screen.getByTestId('count').textContent).toBe('1');
    expect(JSON.parse(localStorage.getItem('storedMeals') || '[]')).toHaveLength(1);

    // duplicate save should not increase length
    await user.click(screen.getByText('save-dup'));
    expect(screen.getByTestId('count').textContent).toBe('1');

    // getStoredMealById should return the saved meal
    expect(screen.getByTestId('found').textContent).toBe('yes');

    // delete
    await user.click(screen.getByText('delete'));
    expect(screen.getByTestId('count').textContent).toBe('0');
    expect(JSON.parse(localStorage.getItem('storedMeals') || '[]')).toHaveLength(0);
  });
});
