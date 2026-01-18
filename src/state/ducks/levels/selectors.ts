import { getLevelNames } from '../../../levels';
import { Maybe } from '../../../utils/types';
import { State } from './types';

export const getSelectedLevel = (state: State): Maybe<number> => {
  return state.selectedLevel;
};

// selectors.ts
export const isUnlocked = (state: any, levelIndex: number): boolean => {
  return levelIndex < state.unlockedLevels; 
};

export const getNextLevel = (state: State): Maybe<number> => {
  if (state.selectedLevel !== undefined) {
    const nextLevel = state.selectedLevel + 1;
    const allLevelNames = getLevelNames();

    if (nextLevel >= 0 && nextLevel < allLevelNames.length) {
      return nextLevel;
    }
  }
  return undefined;
};