export interface IPokemon {
  name: string;
  avatar: string;
  type: string[];
  base_experience: number;
  weight: number;
  abilities: string[];
}

export interface IOptions {
  page: number,
  pageSize: number,
}

export interface IPokemonsData {
  modifiedPokemons: IPokemon[];
  count: number;
}

export enum Colors {
  normal = '#f5222d' as any,
  fighting = '#a8071a' as any,
  flying = '#006d75' as any,
  poison = '#ad2102' as any,
  ground = '#fadb14' as any,
  rock = '#ad8b00' as any,
  bug = '#a0d911' as any,
  ghost = '#5b8c00' as any,
  steel = '#52c41a' as any,
  fire = '#fa541c' as any,
  water = '#13c2c2' as any,
  grass = '#237804' as any,
  electric = '#1677ff' as any,
  psychic = '#003eb3' as any,
  ice = '#2f54eb' as any,
  dragon = '#10239e' as any,
  dark = '#722ed1' as any,
  fairy = '#391085' as any,
  unknown = '#eb2f96' as any,
  shadow = '#9e1068' as any,
}

export interface IShortInfo {
  name: string,
  url: string
}

export interface IUrlParams {
  limit: number;
  offset: number;
  currentPage?: number;
  type?: string[];
  name?: string;
}