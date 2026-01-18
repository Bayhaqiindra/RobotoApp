import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { Cmd, loop } from 'redux-loop';
import { getLevelMap } from '../../../levels';
import { Maybe, Reducer } from '../../../utils/types';
import { gameActions } from '../game';
import { LevelsAction, selectLevel } from './actions';
import { isUnlocked } from './selectors';
import { ActionTypes, State } from './types';

const INITIAL_STATE: State = {
  unlockedLevels: 1, // Level 1 (indeks 0) terbuka secara default
  selectedLevel: undefined
};

type HandledAction = LevelsAction | LocationChangeAction;
type TriggeredAction = LevelsAction | ReturnType<typeof gameActions.startLevel>;

const levelsReducer: Reducer<State, HandledAction, TriggeredAction> = (
  state = INITIAL_STATE, 
  action: HandledAction
): any => {
  
  switch (action.type) {
    
    case LOCATION_CHANGE: {
      const rawLevel = parseLevel(action.payload.location.pathname);
      
      // PERBAIKAN: Konversi angka URL (1) ke Indeks Array (0)
      const levelIndex = rawLevel !== undefined ? rawLevel - 1 : undefined;

      // PERBAIKAN: Langsung update state.selectedLevel agar React re-render tanpa refresh
      if (levelIndex !== undefined && levelIndex !== state.selectedLevel) {
        return loop(
          { ...state, selectedLevel: levelIndex }, 
          Cmd.action(selectLevel(levelIndex))
        );
      }
      return state;
    }

    case ActionTypes.SELECT_LEVEL: {
      const { level } = action.payload;
      const levelMap = getLevelMap(level);

      // Pastikan level sudah di-unlock sebelum dijalankan
      if (levelMap && isUnlocked(state, level)) {
        return loop(
          { ...state, selectedLevel: level },
          Cmd.action(gameActions.startLevel(levelMap))
        );
      }
      return state;
    }

    case ActionTypes.CLEAR_LEVEL: {
      // Jika yang diselesaikan adalah level tertinggi yang baru terbuka, buka level berikutnya
      const isCompletingLastUnlocked = state.selectedLevel === (state.unlockedLevels - 1);
      
      return {
        ...state,
        unlockedLevels: state.unlockedLevels + (isCompletingLastUnlocked ? 1 : 0)
      };
    }

    default:
      return state;
  }
};

/**
 * parseLevel - Mengambil angka level dari URL path.
 */
function parseLevel(path: string): Maybe<number> {
  const prefix = '/level/';
  if (!path.startsWith(prefix)) return undefined;
  
  const levelId = path.slice(prefix.length);
  const parsed = Number(levelId);
  
  return isNaN(parsed) ? undefined : parsed;
}

export default levelsReducer;