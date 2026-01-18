import { Cmd, loop } from 'redux-loop';
import {
  Direction,
  move as getNeighbor,
  oppositeDirection,
  rotateLeft,
  rotateRight
} from '../../../mechanics/directions';
import getRelevantTiles from '../../../mechanics/getRelevantTiles';
import isLevelCleared from '../../../mechanics/isLevelCleared';
import isMoveValid from '../../../mechanics/isMoveValid';
import pushObjects from '../../../mechanics/pushObjects';
import { LevelMap } from '../../../mechanics/types';
import { assertNever, Reducer } from '../../../utils/types';
import { levelsActions } from '../levels';
import { finishLevel, GameAction, move } from './actions';
import { ActionTypes, State } from './types';

export const INITIAL_STATE: State = {
  finished: false
};

type TriggeredAction = GameAction | ReturnType<typeof levelsActions.clearLevel>;

/**
 * PERBAIKAN:
 * 1. Menambahkan return type eksplisit agar TS tidak menganggap bisa 'undefined'.
 * 2. Memastikan loop menggunakan tipe 'TriggeredAction'.
 */
const gameReducer: Reducer<State, GameAction, TriggeredAction> = (
  state = INITIAL_STATE, 
  action: GameAction
): State | any => { // Menggunakan 'any' sementara untuk menyesuaikan dengan Loop dari library

  // 1. Handling awal level
  if (action.type === ActionTypes.START_LEVEL) {
    return {
      finished: false,
      map: action.payload.map
    };
  }

  // 2. Proteksi
  if (!state.map) {
    return state;
  }

  // 3. Logika Mekanik Game
  switch (action.type) {
    case ActionTypes.MOVE_FORWARD: {
      const direction = state.map.robot.direction;
      if (canMove(state.map, direction)) {
        return loop(state, Cmd.action(move(direction)));
      }
      return state;
    }

    case ActionTypes.MOVE_BACKWARD: {
      const direction = oppositeDirection(state.map.robot.direction);
      if (canMove(state.map, direction)) {
        return loop(state, Cmd.action(move(direction)));
      }
      return state;
    }

    case ActionTypes.TURN_RIGHT:
      return {
        ...state,
        map: {
          ...state.map,
          robot: {
            ...state.map.robot,
            direction: rotateRight(state.map.robot.direction)
          }
        }
      };

    case ActionTypes.TURN_LEFT:
      return {
        ...state,
        map: {
          ...state.map,
          robot: {
            ...state.map.robot,
            direction: rotateLeft(state.map.robot.direction)
          }
        }
      };

    case ActionTypes.MOVE: {
      const direction = action.payload;
      const nextTiles = pushObjects(state.map.tiles as any, state.map.robot.position, direction);
      const nextPosition = getNeighbor(state.map.robot.position, direction);

      const newState: State = {
        ...state,
        map: {
          ...state.map,
          tiles: nextTiles,
          robot: {
            ...state.map.robot,
            position: nextPosition,
          }
        }
      };

      if (isLevelCleared(newState.map!)) {
        return loop(newState, Cmd.action(finishLevel()));
      }

      return newState;
    }

    case ActionTypes.FINISH_LEVEL:
      return loop(
        { ...state, finished: true },
        Cmd.action(levelsActions.clearLevel())
      );

    default:
      // Gunakan return state untuk menjamin tidak 'undefined'
      return state;
  }
};

function canMove(map: LevelMap, direction: Direction): boolean {
  const relevantTiles = getRelevantTiles(map.tiles as any, map.robot.position, direction);
  return isMoveValid(...relevantTiles);
}

export default gameReducer;