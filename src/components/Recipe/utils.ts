import type { RecipeData, Time, TimeUnit } from './types.ts';
import { PalmSugarHoneycombCake } from '@/data/recipes/PalmSugarHoneycombCake.ts';

export const ALL_RECIPES: RecipeData[] = [PalmSugarHoneycombCake];

export const RECIPE_MAP: Record<string, RecipeData> = ALL_RECIPES.reduce(
  (acc, recipe) => {
    acc[recipe.id] = recipe;
    return acc;
  },
  {} as Record<string, RecipeData>,
);

const TimeUnitMap: Record<TimeUnit, string> = {
  s: 'second',
  min: 'minute',
  h: 'hour',
  d: 'day',
};

export const getRecipeDuration = (time: Time) => {
  return `${time.amount} ${TimeUnitMap[time.unit]}`;
};
