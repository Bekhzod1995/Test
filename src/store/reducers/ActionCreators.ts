import axios from "axios";
import { AppDispatch } from "../store";
import {
  IPokemon,
  IShortInfo,
  IUrlParams,
} from "../models/IPokemon";
import { pokemonSlice } from "./PokemonSlice";

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonsUrl = (options: IUrlParams) => async (dispatch: AppDispatch) => {
  dispatch(pokemonSlice.actions.fetchPokemonsUrlFetching());
  try {
    const request = await axios.get(`${BASE_URL}/pokemon/`, {
      params: options
    });
    return dispatch(fetchPokemons(request.data));
  } catch (error) {
    return dispatch(pokemonSlice.actions.fetchPokemonsUrlFetchingFailed("Couldn't load pokemons"));
  }
}

export const fetchPokemons = (pokemons: any) => async (dispatch: AppDispatch) => {
  dispatch(pokemonSlice.actions.pokemonsFetching());
  try {
    const { results } = pokemons;
    const pokemonsSearchUrl = results.map(({ url }: { url: string }, index: number) => ({ url, index }));
    let modifiedData: IPokemon[] = [];
    for (const pokemon of pokemonsSearchUrl) {
      const { data } = await axios.get(pokemon.url);
      modifiedData = [
        ...modifiedData,
        {
          name: data.name,
          avatar: data.sprites.front_default,
          type: data.types.map(({ type }: { type: { name: string, url: string } }) => type.name),
          base_experience: data.base_experience,
          weight: data.weight,
          abilities: data.abilities.map(({ ability }: { ability: IShortInfo }) => ability.name),
        }
      ];
    }
    return dispatch(pokemonSlice.actions.pokemonsFetchingSuccess({ modifiedPokemons: modifiedData, count: pokemons.count }));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(pokemonSlice.actions.pokemonsFetchingFailed(error.message));
    } else {
      dispatch(pokemonSlice.actions.pokemonsFetchingFailed("Couldn't load pokemons"));
    }
  }
}

export const fetchAllTypes = () => async (dispatch: AppDispatch) => {
  dispatch(pokemonSlice.actions.colorsFetching());
  try {
    const { data } = await axios.get(`${BASE_URL}/type/`);
    return dispatch(pokemonSlice.actions.colorsFetchingSuccess(data.results));
  } catch (error) {
    return dispatch(pokemonSlice.actions.colorsFetchingFailed("Couldn't load types"));
  }
}