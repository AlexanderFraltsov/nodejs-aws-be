export enum SKATE_TYPES {
  DERBY = 'Roller derby skates',
  RETRO = 'Retro Skates & Disco Roller'
}

export interface IProduct {
  id?: string;
  title: string;
  description?: SKATE_TYPES;
  price: number;
  image?: string;
  count?: number;
}
