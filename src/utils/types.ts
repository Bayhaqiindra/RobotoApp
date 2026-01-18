import { Loop } from 'redux-loop';

/**
 * Generic type for when a function may return a value or not.
 */
export type Maybe<T> = T | undefined;

/**
 * Use this function in the case default of a switch that should exhaustively check all possible values.
 */
export function assertNever(value: never): never {
  return value;
}

/**
 * Type for Redux actions.
 */
export type Action<T, P = void> = P extends void
  ? { type: T }
  : { type: T; payload: P };

/**
 * Type for reducers using redux-loop.
 * * PERBAIKAN: Loop memerlukan S (State) dan LA (Action yang akan dipicu).
 * Kita juga menambahkan return type S saja untuk mendukung return tanpa Cmd.
 */
export type Reducer<S, HA extends Action<any, any>, LA extends Action<any, any> = HA> = 
  (state: S | undefined, action: HA) => S | Loop<LA>; 
  // Catatan: Jika Anda menggunakan redux-loop v6+, Loop hanya butuh satu argumen <Action>.
  // Jika menggunakan v5 kebawah, gunakan Loop<S, LA>.