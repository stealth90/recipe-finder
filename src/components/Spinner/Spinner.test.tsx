import { render, screen } from '@testing-library/react';
import Spinner from '.';
import { describe, expect, it } from 'vitest';

describe('Spinner', () => {
  it('renders svg with correct attributes', () => {
    render(<Spinner color="red" width={24} height={24} />);
    // Spinner doesn't expose role, select svg directly
    const svg = document.querySelector('svg');
    expect(svg).toBeTruthy();
    // check attributes
    const circle = document.querySelector('circle');
    expect(circle).toBeTruthy();
    if (circle) {
      expect(circle?.getAttribute('cx')).toBe('10');
    }
  });
});
