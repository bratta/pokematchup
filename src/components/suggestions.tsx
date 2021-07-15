import React from 'react';
import { AppContext } from '../app-context';
import { PokemonList } from './pokemon-list';
import TypeEffectiveness from '../type-effectiveness';

export interface SuggestionsProps {
  selected?: string[],
}

/**
 * Suggestions - Show the list of suggestions of Pokemon to
 * use, plus a disclaimer about the limitations of how this is calculated.
 */
export class Suggestions extends React.Component<SuggestionsProps> {
  render() {
    if (this.props.selected) {
      const types: [string, string?] = [this.props.selected[0], this.props.selected[1]];
      const pokemon = Array.from(TypeEffectiveness.Suggestions(types, this.context.pokedex));
      if (!pokemon || pokemon.length === 0) {
        return '';
      } else {
        return (
          <div className="suggestions">
            <details data-testid="suggestion-summary">
              <summary>
                <h2>Try using one of these Pokémon<sup>*</sup>:</h2>
              </summary>
              <PokemonList pokedex={pokemon} clickHandler={() => {}} />
              <p><sup>*</sup> The list of suggested Pokémon only looks at types to determine suggestions. It does not take in to account the Pokémon
              generation, move pool, or stats. So your mileage may vary based on what you have trained and in what game. Use this
              list as a potential starting point.</p>
            </details>
          </div>
        );
      }
    } else {
      return '';
    }
  }
}
Suggestions.contextType = AppContext;