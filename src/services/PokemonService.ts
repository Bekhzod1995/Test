import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (build) => ({
    fetchAllPokemons: build.query({
      query: ({ pageSize, page }) => ({
        url: `/pokemon`,
        params: {
          limit: pageSize,
          offset: page,
        }
      })
    }),
  })
});
