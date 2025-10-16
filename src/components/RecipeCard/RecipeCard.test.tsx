import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipe from '.';
import { describe, it, expect, vi } from 'vitest';

// SVG mocks are provided globally in src/setupTests.ts

describe('RecipeCard', () => {
  it('renders title, description and metadata', () => {
    const onPress = vi.fn();
    render(
      <Recipe
        title="Test"
        description="A description"
        category="Dessert"
        area="Italy"
        onPress={onPress}
        imageUrl="/test.jpg"
      />
    );

    expect(screen.getByText('Test')).toBeTruthy();
    expect(screen.getByText('A description')).toBeTruthy();
    expect(screen.getByText('Dessert')).toBeTruthy();
    expect(screen.getByText('Italy')).toBeTruthy();
  });

  it('calls onPress when card is clicked', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    const { container } = render(
      <Recipe title="Clickable" onPress={onPress} />
    );

    await user.click(container.firstChild as Element);
    expect(onPress).toHaveBeenCalled();
  });

  it('renders with minimal props and does not throw on click when no onPress', async () => {
    const user = userEvent.setup();
    const { container } = render(<Recipe title="Minimal" />);
    await user.click(container.firstChild as Element);
    // no assertion other than not throwing
    expect(screen.getByText('Minimal')).toBeTruthy();
  });
});
