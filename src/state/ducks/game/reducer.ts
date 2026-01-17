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

/**
 * INITIAL_STATE - State awal permainan
 */
export const INITIAL_STATE: State = {
  finished: false
};

/**
 * Type untuk Aksi yang dapat dipicu oleh Cmd.action
 */
type TriggeredAction = GameAction | ReturnType<typeof levelsActions.clearLevel>;

/**
 * Game Reducer - Mengelola state transisi antar level dan mekanik gameplay.
 */
const gameReducer: Reducer<State, GameAction, TriggeredAction> = (state = INITIAL_STATE, action) => {
  // 1. Handling awal level (Tanpa pengecekan state.map)
  if (action.type === ActionTypes.START_LEVEL) {
    return {
      finished: false,
      map: action.payload.map
    };
  }

  // 2. Proteksi: Abaikan aksi lain jika map belum dimuat
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
      const nextTiles = pushObjects(state.map.tiles, state.map.robot.position, direction);
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

      // Cek apakah pergerakan ini menyelesaikan level
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
      // Memastikan semua case ditangani (Exhaustive Checking)
      assertNever(action);
      return state;
  }
};

/**
 * Helper: canMove
 * Mengintegrasikan logika tile relevan dan validasi ketinggian.
 */
function canMove(map: LevelMap, direction: Direction): boolean {
  const relevantTiles = getRelevantTiles(map.tiles, map.robot.position, direction);
  return isMoveValid(...relevantTiles);
}

export default gameReducer;