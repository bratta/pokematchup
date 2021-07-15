import React from 'react';
import data from './data/pokedex.json';

/** A data structure representing a Pokemon */
export type PokedexEntry = {
  /** A unique identifier for the entry in the json file */
  id: number,
  /** Dex number. This is not unique as variants such as megas and different formes share a dex number */
  dex_id: number,
  /** Name of the Pokemon */
  name: string,
  /** A list of one or two types the Pokemon has */
  types: Array<string>,
  /** True if the Pokemon has no more evolution options */
  fully_evolved: boolean,
  /** Used by Fuse.js to hold the highlighted name when searching */
  formattedName?: JSX.Element,
}

/** Application context properties to propagate throughout the application */
export interface AppContextInterface {
  /** A list of valid Pokemon types */
  pokemonTypes: string[],
  /** The entire Pokedex of Pokemon */
  pokedex: Array<PokedexEntry>
};

/** Defaults for the application; Used as application constants */
export const defaultAppContext: AppContextInterface = {
  /** All 18 current Pokemon types */
  pokemonTypes: [ "normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison", "ground",
                  "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
  ],
  /** The Pokedex as defined in the pokedex.json file */
  pokedex: data as any as Array<any>
};

/** Defines the AppContext that all components can use */
export const AppContext = React.createContext<AppContextInterface>(defaultAppContext);
