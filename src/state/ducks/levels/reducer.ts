import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { Cmd, loop } from 'redux-loop';
import { getLevelMap } from '../../../levels';
import { assertNever, Maybe, Reducer } from '../../../utils/types';
import { gameActions } from '../game';
import { LevelsAction, selectLevel } from './actions';
import { isUnlocked } from './selectors';
import { ActionTypes, State } from './types';

/**
 * INITIAL_STATE - Pemain mulai dengan hanya level 1 yang terbuka.
 */
const INITIAL_STATE: State = {
  unlockedLevels: 1
};

type HandledAction = LevelsAction | LocationChangeAction;
type TriggeredAction = LevelsAction | ReturnType<typeof gameActions.startLevel>;

/**
 * levelsReducer - Mengelola navigasi level dan progresi 'unlocked'.
 */
const levelsReducer: Reducer<State, HandledAction, TriggeredAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    // 1. Menangani perubahan URL (misal: user mengetik /level/2 di browser)
    case LOCATION_CHANGE: {
      const level = parseLevel(action.payload.location.pathname);

      if (level !== undefined) {
        return loop(
          state,
          Cmd.action(selectLevel(level))
        );
      }
      return state;
    }

    // 2. Menangani pemilihan level (dari menu atau dari sinkronisasi URL di atas)
    case ActionTypes.SELECT_LEVEL: {
      const { level } = action.payload;
      const levelMap = getLevelMap(level);

      // Pastikan map ada dan level tersebut sudah terbuka untuk dimainkan
      if (levelMap && isUnlocked(state, level)) {
        return loop(
          { ...state, selectedLevel: level },
          Cmd.action(gameActions.startLevel(levelMap))
        );
      }
      return state;
    }

    // 3. Menangani ketika pemain menyelesaikan sebuah level
    case ActionTypes.CLEAR_LEVEL: {
      const isCompletingLastUnlocked = state.selectedLevel === state.unlockedLevels - 1;
      
      return {
        ...state,
        unlockedLevels: state.unlockedLevels + (isCompletingLastUnlocked ? 1 : 0)
      };
    }

    default:
      assertNever(action);
      return state;
  }
};

/**
 * parseLevel - Mengambil angka level dari URL path.
 * Contoh: "/level/3" => 3
 */
function parseLevel(path: string): Maybe<number> {
  const prefix = '/level/';

  if (!path.startsWith(prefix)) {
    return undefined;
  }
  
  // Menggunakan slice dan Number() yang lebih modern daripada substr dan parseInt
  const levelId = path.slice(prefix.length);
  const parsed = Number(levelId);
  
  return isNaN(parsed) ? undefined : parsed;
}

export default levelsReducer;