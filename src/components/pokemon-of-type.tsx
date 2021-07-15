import React from 'react';
import { AppContext } from '../app-context';
import { PokemonList } from './pokemon-list';
import TypeEffectiveness from '../type-effectiveness';

export interface PokemonOfTypeProps {
  selected?: string[],
}

/**
 * PokemonOfType - Component building a filtered list of Pokemon
 * of a specific type or types
 */
export class PokemonOfType extends React.Component<PokemonOfTypeProps> {
  render() {
    if (this.props.selected) {
      const types: [string, string?] = [this.props.selected[0], this.props.selected[1]];
      const pokemon = Array.from(TypeEffectiveness.PokemonOfType(types, this.context.pokedex));
      if (!pokemon || pokemon.length === 0) {
        return (
          <div className="pokemonOfType">
            <h3>No Pokémon have this typing (yet...)</h3>
          </div>
        );
      } else {
        return (
          <div className="pokemonOfType">
            <details>
              <summary>
                <h2>Pokémon with this typing:</h2>
              </summary>
              <PokemonList pokedex={pokemon} clickHandler={() => {}} />
            </details>
          </div>
        );
      }
    } else {
      return '';
    }
  }
}
PokemonOfType.contextType = AppContext;