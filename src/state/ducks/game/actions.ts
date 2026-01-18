import { Direction } from '../../../mechanics/directions';
import { LevelMap } from '../../../mechanics/types';
import { Action } from '../../../utils/types';
import { ActionTypes } from './types';

/**
 * GameAction - Definisi Union Type untuk semua aksi di dalam game.
 * Menggunakan utility type Action untuk konsistensi struktur.
 */
export type GameAction =
  | Action<ActionTypes.START_LEVEL, { map: LevelMap }>
  | Action<ActionTypes.FINISH_LEVEL>
  | Action<ActionTypes.MOVE_FORWARD>
  | Action<ActionTypes.MOVE_BACKWARD>
  | Action<ActionTypes.TURN_LEFT>
  | Action<ActionTypes.TURN_RIGHT>
  | Action<ActionTypes.MOVE, Direction>;


export const startLevel = (map: LevelMap): GameAction => ({
  type: ActionTypes.START_LEVEL,
  payload: { map }
});

export const finishLevel = (): GameAction => ({ 
  type: ActionTypes.FINISH_LEVEL 
});

export const moveForward = (): GameAction => ({ 
  type: ActionTypes.MOVE_FORWARD 
});

export const moveBackward = (): GameAction => ({ 
  type: ActionTypes.MOVE_BACKWARD 
});

export const turnRight = (): GameAction => ({ 
  type: ActionTypes.TURN_RIGHT 
});

export const turnLeft = (): GameAction => ({ 
  type: ActionTypes.TURN_LEFT 
});

export const move = (direction: Direction): GameAction => ({
  type: ActionTypes.MOVE,
  payload: direction
});