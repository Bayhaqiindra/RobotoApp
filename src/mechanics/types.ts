import { Direction, Point2D } from './directions';
import { DeepReadonly } from 'utility-types';

/**
 * MovableObject - Definisi objek yang bisa digerakkan.
 * Menggunakan Discriminated Unions agar TypeScript bisa membedakan 
 * tipe objek secara otomatis saat melakukan pengecekan 'type'.
 */
export type MovableObjectType = 'box' | 'ramp';

interface BaseMovableObject {
  readonly key: string; // Key sekarang diwajibkan untuk optimasi rendering React
}

export interface Box extends BaseMovableObject {
  readonly type: 'box';
}

export interface Ramp extends BaseMovableObject {
  readonly type: 'ramp';
  readonly direction: Direction;
}

// Gabungkan tipe objek yang mungkin ada
export type MovableObject = Box | Ramp;

/**
 * Tile - Mewakili satu petak dalam grid.
 */
export interface Tile {
  readonly height: number;
  readonly objects: readonly MovableObject[];
}

/**
 * LevelMap - Struktur utama peta permainan.
 */
export interface LevelMap {
  readonly height: number;
  readonly width: number;
  readonly tiles: readonly (readonly Tile[])[];
  readonly targets: DeepReadonly<Point2D[]>;
  readonly robot: {
    readonly position: Point2D;
    readonly direction: Direction;
    readonly key: string;
  };
}