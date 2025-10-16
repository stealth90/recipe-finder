import { render, screen } from '@testing-library/react';
import Preparation from '.';
import { describe, it, expect } from 'vitest';

describe('Preparation', () => {
  it('renders steps with numbering', () => {
    const steps = ['Chop onions', 'Fry onions', 'Serve'];
    render(<Preparation steps={steps} />);

    expect(screen.getByText('Preparation')).toBeTruthy();
    expect(screen.getByText('1')).toBeTruthy();
    expect(screen.getByText('Chop onions')).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy();
  });

  it('handles empty steps array gracefully', () => {
    render(<Preparation steps={[]} />);
    expect(screen.getByText('Preparation')).toBeTruthy();
    const steps = screen.queryAllByText(/\d+/);
    expect(steps.length).toBe(0);
  });

  it('renders duplicate step texts with unique keys', () => {
    const steps = ['Repeat', 'Repeat'];
    render(<Preparation steps={steps} />);
    const occurrences = screen.getAllByText('Repeat');
    expect(occurrences.length).toBe(2);
  });
});
