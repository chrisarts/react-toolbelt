import { describe, expect, it } from 'vitest';
import { globalStores } from '../src/cache/globalCache.js';

describe('Global Values', () => {
  it('remain as the same', () => {
    globalStores['asd'] = 'asd';
    expect(globalStores).toEqual(globalStores);
  });
});
