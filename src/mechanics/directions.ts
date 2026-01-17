/**
 * Point2D - Representasi koordinat [x, y]
 */
export type Point2D = [number, number];

/**
 * Direction - Definisi arah menggunakan Enum
 */
export enum Direction {
  NORTH = 'NORTH',
  EAST = 'EAST',
  SOUTH = 'SOUTH',
  WEST = 'WEST'
}

/**
 * Konstanta Matematika untuk Rotasi
 */
const RIGHT_ANGLE = Math.PI / 2;
const FULL_ROTATION = 2 * Math.PI;

/**
 * Metadata Arah - Menggabungkan delta koordinat dan sudut radian
 */
const DIRECTIONS = {
  [Direction.NORTH]: { dx: 0, dy: 1, angle: 0 },
  [Direction.WEST]:  { dx: -1, dy: 0, angle: RIGHT_ANGLE },
  [Direction.SOUTH]: { dx: 0, dy: -1, angle: 2 * RIGHT_ANGLE },
  [Direction.EAST]:  { dx: 1, dy: 0, angle: 3 * RIGHT_ANGLE }
} as const;

/**
 * Tabel Pemetaan Rotasi
 */
const RIGHT_OF: Record<Direction, Direction> = {
  [Direction.NORTH]: Direction.EAST,
  [Direction.EAST]:  Direction.SOUTH,
  [Direction.SOUTH]: Direction.WEST,
  [Direction.WEST]:  Direction.NORTH
};

const LEFT_OF: Record<Direction, Direction> = {
  [Direction.NORTH]: Direction.WEST,
  [Direction.WEST]:  Direction.SOUTH,
  [Direction.SOUTH]: Direction.EAST,
  [Direction.EAST]:  Direction.NORTH
};

/**
 * Menggerakkan titik satu langkah ke arah tertentu
 */
export const move = (point: Point2D, direction: Direction): Point2D => {
  const [x, y] = point;
  const { dx, dy } = DIRECTIONS[direction];
  return [x + dx, y + dy];
};

/**
 * Fungsi-fungsi Rotasi
 */
export const rotateRight = (direction: Direction): Direction => RIGHT_OF[direction];
export const rotateLeft = (direction: Direction): Direction => LEFT_OF[direction];
export const oppositeDirection = (direction: Direction): Direction => RIGHT_OF[RIGHT_OF[direction]];

/**
 * Konversi arah ke sudut radian
 */
export const directionToAngle = (direction: Direction): number => DIRECTIONS[direction].angle;

/**
 * Menghitung sudut terdekat (Shortest Path Rotation) agar animasi rotasi 
 * tidak berputar lebih dari 180 derajat (tidak melakukan putaran penuh yang tidak perlu).
 */
export const minimizeRotation = (previousAngle: number, currentDirection: number): number => {
  const directionDiff = (currentDirection - previousAngle) % FULL_ROTATION;

  // Normalisasi agar selisih berada di rentang yang paling dekat
  if (directionDiff > Math.PI) {
    return previousAngle + directionDiff - FULL_ROTATION;
  } 
  
  if (directionDiff < -Math.PI) {
    return previousAngle + directionDiff + FULL_ROTATION;
  }

  return previousAngle + directionDiff;
};