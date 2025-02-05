import { beforeAll, describe, expect, it, vi } from 'vitest';
import { createStore } from '../src/index.js';

describe('Simple Store', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });
  it('Simple store reactive', () => {
    const initialState = { a: 1 };
    const checkState = (nextState: typeof initialState) => {
      expect(nextState).not.toStrictEqual(initialState);
    };
    const store = createStore(initialState);
    const spy = vi.fn(checkState);
    const subscriber = store.subscribe(spy);

    store.setState((p) => ({ a: 2 }));

    expect(spy).toHaveBeenCalled();
    expect(initialState).not.toStrictEqual(store.getState());

    subscriber();
  });

  it('Fails on in-place mutation', () => {
    const initialState = { a: 1 };
    const checkState = (nextState: typeof initialState) => {
      expect(nextState).toStrictEqual(initialState);
    };
    const store = createStore(initialState);
    const spy = vi.fn(checkState);
    const subscriber = store.subscribe(spy);

    store.setState((p) => {
      p.a = 2;
      return p;
    });

    expect(spy).not.toHaveBeenCalled();
    expect(initialState).toStrictEqual(store.getState());

    subscriber();
  });
});
