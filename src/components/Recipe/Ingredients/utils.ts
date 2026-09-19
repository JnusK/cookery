import type { Ingredient } from './types.ts';

export const parseIngredient = (ingredient: Ingredient) => {
  return `${ingredient.amount} ${ingredient.measurement} of ${ingredient.name}`;
};
