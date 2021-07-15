import React, { MouseEvent } from 'react';
import { PokemonTypes } from './pokemon-type';
import { EffectivenessChart } from './effectiveness-chart';

interface ByTypeProps {
  selected?: string[],
  clickHandler: (event: MouseEvent<HTMLDivElement>) => void,
  resetHandler: (event: MouseEvent<HTMLDivElement>) => void
}

/**
 * ByType - Show a list of types and the chart of effectiveness
 * based on the user's selection.
 */
export class ByType extends React.Component<ByTypeProps> {
  render() {
    const resetButtonClasses = (this.props.selected && this.props.selected.length > 0) ? "pokemon-type clickable reset" : "hide";
    return (
          <>
            <h1>Search By Type(s)</h1>
            <p>Select up to two types to figure out how to beat it.</p>
            <PokemonTypes clickHandler={this.props.clickHandler} selected={this.props.selected} />
            <div className={resetButtonClasses} onClick={this.props.resetHandler}>Clear</div>
            <EffectivenessChart selected={this.props.selected} />
          </>
    );
  }
}