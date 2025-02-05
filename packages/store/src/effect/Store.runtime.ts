import * as Layer from 'effect/Layer';
import * as ManagedRuntime from 'effect/ManagedRuntime';
import { StoreContextLive } from './Store.layer.js';

const MainLayer = Layer.mergeAll(StoreContextLive);

export const StoreRuntime = ManagedRuntime.make(MainLayer);
