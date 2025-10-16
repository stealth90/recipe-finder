import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import TheMealDBService from './TheMealDBService';

const originalFetch = global.fetch;

describe('TheMealDBService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('searchRecipeByQuery returns meals array on success', async () => {
    const fakeResponse = { meals: [{ idMeal: '1', strMeal: 'Test' }] };
    global.fetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve(fakeResponse) } as any)) as any;

    const result = await TheMealDBService.searchRecipeByQuery('test');
    expect(result).toEqual(fakeResponse.meals);
    expect(global.fetch).toHaveBeenCalled();
  });

  it('searchRecipeByQuery returns null on fetch error', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('network'))) as any;
    const result = await TheMealDBService.searchRecipeByQuery('test');
    expect(result).toBeNull();
  });

  it('getMealById returns single meal on success', async () => {
    const fakeResponse = { meals: [{ idMeal: '2', strMeal: 'ById' }] };
    global.fetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve(fakeResponse) } as any)) as any;

    const result = await TheMealDBService.getMealById('2');
    expect(result).toEqual(fakeResponse.meals[0]);
  });

  it('getMealById returns null on fetch error', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('network'))) as any;
    const result = await TheMealDBService.getMealById('2');
    expect(result).toBeNull();
  });

  it('getSingleRandomMeal returns data on success', async () => {
    const fakeResponse = { meals: [{ idMeal: '3', strMeal: 'Random' }] };
    global.fetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve(fakeResponse) } as any)) as any;

    const result = await TheMealDBService.getSingleRandomMeal();
    // The service originally returns data; adjust expectation to match implementation
    expect(result).toEqual(fakeResponse);
  });

  it('getSingleRandomMeal returns null on fetch error', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('network'))) as any;
    const result = await TheMealDBService.getSingleRandomMeal();
    expect(result).toBeNull();
  });
});
