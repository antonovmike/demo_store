import productsReducer, { setProducts, clearProducts, fetchProducts } from '../ProductsSlice.js';
import { describe, test, expect } from 'vitest';

describe('products reducer', () => {
  test('setProducts and fetchProducts.fulfilled update state', () => {
    let state = productsReducer(undefined, { type: '@@INIT' });

    state = productsReducer(state, setProducts([{ id: 'a', name: 'A' }]));
    expect(state.items).toHaveLength(1);

    const loading = { ...state, status: 'loading' };
    const fulfilledAction = { 
      type: fetchProducts.fulfilled.type, 
      payload: [{ id: 'b', name: 'B' }] 
    };
    state = productsReducer(loading, fulfilledAction);
    expect(state.status).toBe('succeeded');
    expect(state.items[0].id).toBe('b');

    state = productsReducer(state, clearProducts());
    expect(state.items).toHaveLength(0);
    expect(state.status).toBe('idle');
  });
});