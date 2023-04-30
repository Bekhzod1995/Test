import { configureStore, combineReducers } from "@reduxjs/toolkit";
import pokemonReducer from "./reducers/PokemonSlice";
import { pokemonApi } from "../services/PokemonService";

const rootReducer = combineReducers({
  pokemonReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

