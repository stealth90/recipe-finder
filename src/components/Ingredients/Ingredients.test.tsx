import { render, screen } from '@testing-library/react';
import Ingredients from '.';
import { describe, it, expect } from 'vitest';

describe('Ingredients', () => {
  it('renders a list of ingredients with quantities', () => {
    const data = [
      { label: 'Sugar', quantity: '1 cup' },
      { label: 'Salt', quantity: '1 tsp' },
    ];
    render(<Ingredients ingredients={data} />);

    expect(screen.getByText('Ingredients')).toBeTruthy();
    expect(screen.getByText('Sugar')).toBeTruthy();
    expect(screen.getByText('(1 cup)')).toBeTruthy();
    expect(screen.getByText('Salt')).toBeTruthy();
  });

  it('renders gracefully with empty ingredients array', () => {
    render(<Ingredients ingredients={[]} />);
    expect(screen.getByText('Ingredients')).toBeTruthy();
    // no list items should be present
    const items = screen.queryAllByRole('listitem');
    expect(items.length).toBe(0);
  });
});
