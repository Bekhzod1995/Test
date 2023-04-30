import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPokemon, IPokemonsData, IShortInfo } from "../models/IPokemon";

interface PokemonState {
  modifiedPokemons: IPokemon[];
  isLoading: boolean;
  error: string;
  initialPokemons: [];
  count: number;
  types: string[];
};

const initialState: PokemonState = {
  modifiedPokemons: [],
  isLoading: false,
  error: '',
  initialPokemons: [],
  count: 0,
  types: []
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    pokemonsFetchingSuccess: (state, action: PayloadAction<IPokemonsData>) => {
      const { count, modifiedPokemons } = action.payload;
      state.isLoading = false;
      state.error = '';
      state.modifiedPokemons = modifiedPokemons;
      state.count = count;
    },
    pokemonsFetching: (state) => {
      state.isLoading = true;
    },
    pokemonsFetchingFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    colorsFetchingSuccess: (state, action: PayloadAction<IShortInfo[]>) => {
      state.isLoading = false;
      state.error = '';
      state.types = action.payload.map(({ name }) => name)
    },
    colorsFetching: (state) => {
      state.isLoading = true;
    },
    colorsFetchingFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchPokemonsUrlFetching: (state) => {
      state.isLoading = true;
    },
    fetchPokemonsUrlFetchingFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default pokemonSlice.reducer;