import { LevelMap } from './mechanics/types';
import { Maybe } from './utils/types';
import { Direction } from './mechanics/directions';

export const levels: LevelMap[] = [
  {
    height: 3, width: 3, targets: [[1, 2]],
    tiles: [
      [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }],
      [{ height: 1, objects: [] }, { height: 1, objects: [{ type: 'box' }] }, { height: 1, objects: [] }],
      [{ height: 1, objects: [] }, { height: 1, objects: [] }, { height: 1, objects: [] }]
    ],
    robot: { position: [1, 0], direction: Direction.NORTH }
  },
  // ... level lainnya
];

export const getLevelNames = (): string[] => {
  return levels.map((_, index) => `Level ${index + 1}`);
};

export const getLevelMap = (level: number): Maybe<LevelMap> => {
  const map = levels[level];
  // Deep copy sangat penting agar state Redux tidak merusak array asal
  return map ? addKeys(level, JSON.parse(JSON.stringify(map))) : undefined;
};

function addKeys(level: number, map: LevelMap): LevelMap {
  const [robotX, robotY] = map.robot.position;
  const robotTile = map.tiles[robotX] ? map.tiles[robotX][robotY] : null;
  const robotZ = robotTile ? robotTile.height + robotTile.objects.length : 0;

  return {
    ...map,
    robot: {
      ...map.robot,
      key: createUniqueKey(level, robotX, robotY, robotZ)
    },
    tiles: map.tiles.map((column, x) => (
      column.map(({ height, objects }, y) => ({
        height,
        objects: (objects || []).map((obj, index) => ({
          ...obj,
          key: createUniqueKey(level, x, y, height + 1 + index)
        }))
      }))
    ))
  };
}

const createUniqueKey = (lvl: number, x: number, y: number, z: number): string => 
  `lvl${lvl}-x${x}-y${y}-z${z}`;