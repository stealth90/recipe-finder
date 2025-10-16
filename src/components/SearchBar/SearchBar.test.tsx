import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// SVG mocks are provided globally in src/setupTests.ts

import SearchBar from '.';

describe('SearchBar', () => {
  it('renders input and button and triggers onSearch on Enter and click', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    const onChange = vi.fn();

    render(<SearchBar onSearch={onSearch} onChange={onChange} />);

    const input = screen.getByPlaceholderText(/Search for recipes/i) as HTMLInputElement;
    const button = screen.getByRole('button');

    await user.type(input, 'pasta{Enter}');
    expect(onSearch).toHaveBeenCalled();

    // change value and click
    await user.clear(input);
    await user.type(input, 'pizza');
    await user.click(button);
    expect(onSearch).toHaveBeenCalledTimes(2);
  });

  it('disables button when isLoading or isDisabled', async () => {
    const { rerender } = render(<SearchBar isLoading={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    rerender(<SearchBar isDisabled={true} />);
    expect(button).toBeDisabled();
  });
});
