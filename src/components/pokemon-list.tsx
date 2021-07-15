import { MouseEvent } from 'react';
import { PokedexEntry } from '../app-context';
import { PokemonType } from './pokemon-type';

interface PokemonListProps {
  pokedex: Array<PokedexEntry>,
  clickHandler: (event: MouseEvent<HTMLLIElement>) => void
}

/**
 * PokemonList - Return an unordered list of Pokemon and its types 
 * 
 * @param {PokemonListProps} props - Component properties
 * @returns The unordered list of Pokemon
 */
export function PokemonList(props: PokemonListProps) {
  const pokemonList = props.pokedex.map((pokemon) => (
    <li key={pokemon.id + '-' + pokemon.name.toLowerCase()} data-pokemon={pokemon.id} onClick={props.clickHandler}>
      <span className="pokemonName">{pokemon.formattedName ?? pokemon.name}</span>
      <span className="typeList">{typesForPokemon(pokemon)}</span>
    </li>
    )
  );
  return (
    <ul className="pokemon-list">{pokemonList}</ul>
  );
}

/**
 * Builds the formatted type or types components for a Pokemon 
 * @param {PokedexEntry} pokemon - The Pokemon in question
 * @returns One or more PokemonType components
 */
function typesForPokemon(pokemon: PokedexEntry) {
  const types: string[] = pokemon.types;
  return (
    types.map((pokemonType) =>
      <PokemonType key={pokemon.id + '-' + pokemon.name.toLowerCase() + '-' + pokemonType.toLowerCase()} type={pokemonType.toLowerCase()} clickable={false} selected={false} />
    )
  );
}