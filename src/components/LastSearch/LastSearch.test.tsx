import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LastSearch from '.';
import { describe, expect, it, vi } from 'vitest';

// Mock useMealsStorage and expose the spy
const onDeleteMock = vi.fn();
vi.mock('../../hooks/useMealsStorage', () => ({
  default: () => ({
    storedMeals: [
      { idMeal: '1', strMeal: 'Meal 1', strMealThumb: '', strCategory: 'Cat', strArea: 'Area' },
    ],
    onDeleteMeal: onDeleteMock,
  }),
}));

describe('LastSearch', () => {
  it('renders saved recipes and calls onDelete when delete clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LastSearch />
      </MemoryRouter>
    );
    expect(screen.getByText('From your research')).toBeInTheDocument();
    expect(screen.getByText('Meal 1')).toBeInTheDocument();

    const deleteBtn = screen.getByLabelText('Delete Meal 1 recipe');
    await user.click(deleteBtn);
    expect(onDeleteMock).toHaveBeenCalledWith('1');
  });
});
