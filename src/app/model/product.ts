export type Material = 'wood' | 'plastic' | 'paper';

export interface Product {
  id: number;
  name: string;
  cost: number;
  image: string;
  type: Material;
}
