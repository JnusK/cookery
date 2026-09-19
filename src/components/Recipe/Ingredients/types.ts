export type Measurement = 'tbsp' | 'tsp' | 'ml' | 'g' | 'pcs';

export interface Ingredient {
  amount: number;
  measurement: Measurement;
  name: string;
}
