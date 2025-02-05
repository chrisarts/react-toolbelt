import * as KeyMap from '@react-toolbelt/helpers/KeyMap';
import * as Cause from 'effect/Cause';
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Exit from 'effect/Exit';
import * as Layer from 'effect/Layer';
import * as LogLevel from 'effect/LogLevel';
import * as Logger from 'effect/Logger';
import * as Option from 'effect/Option';
import * as Queue from 'effect/Queue';
import * as Ref from 'effect/Ref';
import * as Atom from '../atomic/atoms.js';

export const make = Effect.gen(function* () {
  const instance = yield* Ref.make(KeyMap.make<string, Atom.Atom<any>>());
  const updates = yield* Queue.unbounded<any>();

  const createNewStore = <T>(id: string, initialState: T, debug = false) =>
    Effect.gen(function* () {
      const store = Atom.make(initialState);
      yield* Ref.update(instance, (cache) => cache.set(id, store));
      const getStore: Effect.Effect<Atom.Atom<T>> = Ref.get(instance).pipe(
        Effect.andThen((cache) => Effect.sync(() => KeyMap.unsafeGet(cache, id))),
      );

      const setStore = (newState: T) =>
        Ref.update(instance, (cache) => {
          KeyMap.get(cache, id).pipe(Option.map((atom) => atom.set(newState)));
          return cache;
        });

      if (debug) {
        const subscriber = store.subscribe((state) => updates.unsafeOffer(state));

        yield* Effect.addFinalizer((exit) =>
          Effect.sync(subscriber).pipe(
            Effect.andThen(() =>
              Exit.match(exit, {
                onSuccess: (result) =>
                  Effect.logDebug(
                    `Successfully unsubscribe from: ${id} with result: `,
                    result,
                  ),
                onFailure: (cause) =>
                  Effect.logWarning(
                    `Something happen while unsubscribe from: ${id} with result: `,
                    Cause.pretty(cause, { renderErrorCause: true }),
                  ),
              }),
            ),
          ),
        );
      }

      return {
        get: getStore,
        set: setStore,
        subscribe: Effect.runSync(
          getStore.pipe(Effect.andThen((atom) => Effect.sync(() => atom.subscribe))),
        ),
      };
    }).pipe(Effect.scoped);

  yield* Queue.take(updates).pipe(
    Effect.map((value) => Effect.logDebug('State Change: ', value)),
    Effect.flatten,
    Effect.forever,
    Effect.forkDaemon,
  );

  yield* Effect.addFinalizer(() => Queue.shutdown(updates));

  const getStore = <T>(id: string): Effect.Effect<Option.Option<Atom.Atom<T>>> =>
    Ref.get(instance).pipe(Effect.map((cache) => KeyMap.get(cache, id)));

  return {
    createNewStore,
    getStores: Ref.get(instance),
    getStore,
    getStoreOrNull: <T>(id: string) =>
      getStore<T>(id).pipe(Effect.map((cache) => Option.getOrNull(cache))),
  };
}).pipe(Logger.withMinimumLogLevel(LogLevel.Debug));

export interface StoreContext extends Effect.Effect.Success<typeof make> {}

export const StoreContext = Context.GenericTag<StoreContext>('metro/fs/service');

export const StoreContextLive = Layer.scoped(StoreContext, make);
