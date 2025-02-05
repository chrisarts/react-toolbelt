import * as Effect from 'effect/Effect';
import { describe, expect, it, vi } from 'vitest';
import { StoreContext } from '../src/effect/Store.layer.js';
import { StoreRuntime } from '../src/effect/Store.runtime.js';

describe('Store Runtime', async () => {
  const storeCtx = await StoreRuntime.runPromise(StoreContext);
  const createTestStore = <T>(a: T) =>
    StoreRuntime.runSync(storeCtx.createNewStore('test', a, true));

  it('Creates Store', () => {
    const { get } = createTestStore({ a: 1 });
    const getState = () =>
      StoreRuntime.runSync(get.pipe(Effect.andThen((atom) => atom.get())));
    expect(getState()).toStrictEqual({ a: 1 });
  });

  it('Set Store State correctly', () => {
    const { get, set } = createTestStore({ a: 1 });
    const getState = () =>
      StoreRuntime.runSync(get.pipe(Effect.andThen((atom) => atom.get())));
    expect(getState()).toStrictEqual({ a: 1 });

    Effect.runSync(set({ a: 2 }));
    expect(getState()).not.toStrictEqual({ a: 1 });
    expect(getState()).toStrictEqual({ a: 2 });
  });

  it('Should call subscribers', () => {
    const { get, set, subscribe } = createTestStore({ a: 1 });
    const getState = () =>
      StoreRuntime.runSync(get.pipe(Effect.andThen((atom) => atom.get())));
    expect(getState()).toStrictEqual({ a: 1 });

    const spy = vi.fn(subscribe);

    spy((_) => void {});

    Effect.runSync(set({ a: 2 }));

    expect(spy).toHaveBeenCalled();
    expect(getState()).not.toStrictEqual({ a: 1 });
    expect(getState()).toStrictEqual({ a: 2 });
  });
});
