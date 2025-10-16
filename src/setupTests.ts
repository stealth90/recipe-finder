import React from 'react';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});

// Global mocks for svgr imports used across the app
// These mock the '?react' imports used by vite-plugin-svgr
vi.mock('./assets/svg/search.svg?react', () => ({
  default: (props: any) => React.createElement('svg', { 'data-testid': 'mock-search-icon', width: props?.width, height: props?.height }),
}));

vi.mock('./assets/svg/area.svg?react', () => ({
  default: () => React.createElement('svg', { 'data-testid': 'mock-area-icon' }),
}));

vi.mock('./assets/svg/category.svg?react', () => ({
  default: () => React.createElement('svg', { 'data-testid': 'mock-category-icon' }),
}));
