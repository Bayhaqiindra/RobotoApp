import { LevelMap } from './mechanics/types';
import { Maybe } from './utils/types';
import { Direction } from './mechanics/directions';

/**
 * Helper untuk membuat grid kosong dengan tinggi standar (1)
 */
const createGrid = (w: number, h: number) => 
  Array(w).fill(0).map(() => Array(h).fill(0).map(() => ({ height: 1, objects: [] })));

/**
 * DATA 10 LEVEL SOKOBOT
 */
export const levels: any[] = [
  // LEVEL 1: Tutorial (3x3)
  {
    height: 3, width: 3, targets: [[1, 2]],
    tiles: createGrid(3, 3),
    robot: { position: [1, 0], direction: Direction.NORTH }
  },
  // LEVEL 2: Dua Box (4x4)
  {
    height: 4, width: 4, targets: [[1, 3], [2, 3]],
    tiles: createGrid(4, 4),
    robot: { position: [0, 0], direction: Direction.EAST }
  },
  // LEVEL 3: Lorong Sempit (3x5) - Target di ujung lorong
  {
    height: 5, width: 3, targets: [[0, 4], [2, 4]],
    tiles: createGrid(3, 5),
    robot: { position: [1, 0], direction: Direction.NORTH }
  },
  // LEVEL 4: Area Luas (5x5)
  {
    height: 5, width: 5, targets: [[0, 4], [4, 4]],
    tiles: createGrid(5, 5),
    robot: { position: [2, 0], direction: Direction.NORTH }
  },
  // LEVEL 5: Zig-Zag (4x6)
  {
    height: 6, width: 4, targets: [[0, 0], [3, 5]],
    tiles: createGrid(4, 6),
    robot: { position: [0, 5], direction: Direction.EAST }
  },
  // LEVEL 6: Labirin Sempit (5x5)
  {
    height: 5, width: 5, targets: [[4, 0], [4, 2], [4, 4]],
    tiles: createGrid(5, 5),
    robot: { position: [0, 2], direction: Direction.NORTH }
  },
  // LEVEL 7: Ketinggian Bertingkat (6x6)
  {
    height: 6, width: 6, targets: [[5, 5], [0, 5]],
    tiles: createGrid(6, 6),
    robot: { position: [3, 0], direction: Direction.NORTH }
  },
  // LEVEL 8: Gudang Besar (7x7)
  {
    height: 7, width: 7, targets: [[0, 6], [3, 6], [6, 6], [3, 0]],
    tiles: createGrid(7, 7),
    robot: { position: [0, 0], direction: Direction.NORTH }
  },
  // LEVEL 9: Tantangan Kotak Terkunci (7x7)
  {
    height: 7, width: 7, targets: [[6, 0], [6, 3], [6, 6]],
    tiles: createGrid(7, 7),
    robot: { position: [0, 3], direction: Direction.SOUTH }
  },
  // LEVEL 10: Final Boss (8x8)
  {
    height: 8, width: 8, targets: [[0, 7], [7, 7], [3, 7], [4, 7], [7, 0]],
    tiles: createGrid(8, 8),
    robot: { position: [4, 0], direction: Direction.NORTH }
  }
];

/**
 * PENEMPATAN BOX DAN TEMBOK MANUAL
 */

// Level 1
levels[0].tiles[1][1].objects = [{ type: 'box' }];

// Level 2
levels[1].tiles[1][1].objects = [{ type: 'box' }];
levels[1].tiles[2][2].objects = [{ type: 'box' }];

// Level 3 (Penting: Agar tidak kosong lagi!)
levels[2].tiles[1][2].objects = [{ type: 'box' }];
levels[2].tiles[1][3].objects = [{ type: 'box' }];
levels[2].tiles[1][1].height = 3; // Tembok tengah lorong

// Level 4
levels[3].tiles[2][2].objects = [{ type: 'box' }];
levels[3].tiles[2][3].objects = [{ type: 'box' }];
levels[3].tiles[0][2].height = 4; levels[3].tiles[4][2].height = 4; // Tembok samping

// Level 5
levels[4].tiles[2][1].height = 4; levels[4].tiles[2][2].height = 4;
levels[4].tiles[1][1].objects = [{ type: 'box' }];
levels[4].tiles[2][4].objects = [{ type: 'box' }];

// Level 6
levels[5].tiles[1][2].objects = [{ type: 'box' }];
levels[5].tiles[2][2].objects = [{ type: 'box' }];
levels[5].tiles[3][2].objects = [{ type: 'box' }];
for(let i=0; i<5; i++) if(i!==2) levels[5].tiles[i][1].height = 3; // Labirin tembok

// Level 7
levels[6].tiles[5][5].height = 3;
levels[6].tiles[0][5].height = 3;
levels[6].tiles[3][3].objects = [{ type: 'box' }];
levels[6].tiles[3][4].objects = [{ type: 'box' }];

// Level 8
levels[7].tiles[1][1].objects = [{ type: 'box' }];
levels[7].tiles[5][1].objects = [{ type: 'box' }];
levels[7].tiles[1][5].objects = [{ type: 'box' }];
levels[7].tiles[5][5].objects = [{ type: 'box' }];
levels[7].tiles[3][3].height = 5; // Menara tengah

// Level 9
levels[8].tiles[2][0].objects = [{ type: 'box' }];
levels[8].tiles[2][3].objects = [{ type: 'box' }];
levels[8].tiles[2][6].objects = [{ type: 'box' }];
for(let x=1; x<6; x++) levels[8].tiles[x][4].height = 4; // Tembok panjang

// Level 10
for(let i=0; i<5; i++) {
  levels[9].tiles[i+1][4].objects = [{ type: 'box' }];
  levels[9].tiles[i+1][2].height = 5; 
}

/**
 * HELPER FUNCTIONS
 */

export const getLevelNames = (): string[] => {
  return levels.map((_, index) => `Level ${index + 1}`);
};

export const getLevelMap = (level: number): Maybe<LevelMap> => {
  const map = levels[level];
  return map ? addKeys(level, JSON.parse(JSON.stringify(map))) : undefined;
};

function addKeys(level: number, map: LevelMap): LevelMap {
  const [robotX, robotY] = map.robot.position;
  return {
    ...map,
    robot: { 
      ...map.robot, 
      key: `lvl${level}-rob-${robotX}-${robotY}` 
    },
    tiles: map.tiles.map((column, x) =>
      column.map(({ height, objects }, y) => ({
        height,
        objects: (objects || []).map((obj, index) => ({
          ...obj,
          key: `lvl${level}-obj-${x}-${y}-${index}`
        }))
      }))
    )
  };
} 