import * as G from 'effect/GlobalValue';

export const globalStores = G.globalValue('root', (): Record<string, any> => ({}));
console.log('STORES: ', globalStores);
