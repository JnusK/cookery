import type { Ingredient } from '@/components/Recipe/Ingredients/types.ts';
import type { Step } from './Steps/types.ts';

export type TimeUnit = 's' | 'min' | 'h' | 'd';

export interface Time {
  amount: number;
  unit: TimeUnit;
}

export type CourseTag = 'appetizer' | 'main' | 'dessert';

export type CuisineTag =
  | 'burmese'
  | 'chinese'
  | 'french'
  | 'german'
  | 'indian'
  | 'italian'
  | 'japanese'
  | 'korean'
  | 'malaysian'
  | 'other'
  | 'singaporean'
  | 'thai'
  | 'vietnamese';

export type DietTag = 'vegan' | 'gluten-free' | 'vegetarian';

export type DifficultyTag = 'easy' | 'medium' | 'hard';

export type MealTag = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type TemperatureTag = 'hot' | 'cold';

export interface Tags {
  course?: CourseTag;
  cuisine: CuisineTag;
  diet?: DietTag[];
  difficulty: DifficultyTag;
  meal?: MealTag;
  temperature: TemperatureTag;
}

export interface RecipeData {
  cookDuration: Time;
  description: string;
  id: string;
  ingredients: Ingredient[];
  prepDuration: Time;
  serving: number;
  steps: Step[];
  tags: Tags;
  title: string;
}
