import React from 'react';
import TypeEffectiveness from '../type-effectiveness';
import { PokemonTypes } from './pokemon-type';
import { PokemonOfType } from './pokemon-of-type';
import { Suggestions } from './suggestions';

interface EffectivenessChartProps {
  selected?: string[],
  name?: string
}

/**
 * EffectivenessChart - Show the chart of type effectiveness based on selected
 * types and an optional Pokemon name
 */
export class EffectivenessChart extends React.Component<EffectivenessChartProps> {
  /**
   * Simple and basic helper to capitalize a string
   * 
   * @param {string} str - String to capitalize, eg. "pikachu"
   * @returns {string} - A capitalized string. eg. "Pikachu"
   */
  capitalize(str: string) : string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  /**
   * Returns a comma-separated list of types, preceeded by an optional Pokemon name
   * 
   * @returns {string} Eg. "Fire", "Fire, Bug", or "Centiskorch (Fire, Bug)"
   */
  formattedTitle() : string {
    let formatted = '';
    const selected = this.props.selected ? this.props.selected.sort().map((type) => this.capitalize(type)).join(', ') : '';
    if (this.props.name) {
      formatted += this.props.name + ' (' + selected + ')';
    } else {
      formatted += selected;
    }
    return formatted;
  }

  render() {
    if (this.props.selected && this.props.selected.length > 0) {
      const types: [string, string?] = [this.props.selected[0], this.props.selected[1]];
      const grouped = TypeEffectiveness.GroupResults(TypeEffectiveness.By(types)).map((group) =>
        <div key={group.label} data-testid={group.label}>
          <h2>{group.label}</h2>
          <PokemonTypes types={group.types} />
        </div>
      );
      return (
            <>
              <h2>Effectiveness Against:</h2>
              <h3>{this.formattedTitle()}</h3>
              <div className="groups">{grouped}</div>
              <PokemonOfType selected={this.props.selected} />
              <Suggestions selected={this.props.selected} />
            </>
      );
    } else {
      return '';
    }
  }
}