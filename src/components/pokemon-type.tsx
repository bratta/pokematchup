import React, { MouseEvent } from 'react';
import { AppContext } from '../app-context';

type PokemonTypeProps = {
  type: string,
  clickHandler?: (event: MouseEvent<HTMLDivElement>) => void,
  clickable: boolean,
  selected: boolean
}

type PokemonTypesProps = {
  types?: string[],
  clickHandler?: (event: MouseEvent<HTMLDivElement>) => void,
  selected?: string[]
}

/**
 * PokemonType - Component for building an optionally clickable/selectable Pokemon type
 * widget.
 * 
 * @param {PokemonTypeProps} props - Component properties
 * @returns The Pokemon type
 */
export function PokemonType(props: PokemonTypeProps) {
  const classes: string[] = ["pokemon-type", props.type]
  if (props.clickable) {
    classes.push("clickable");
  }
  if (props.selected) {
    classes.push("selected");
  }

  return (
    <div className={classes.join(' ')} data-testid="pokemon-type" data-pokemon-type={props.type} onClick={props.clickHandler}>{props.type}</div>
  )
}

/**
 * PokemonTypes - Return a list of optionally clickable/selectable Pokemon type
 * widgets.
 * 
 * @param {PokemonTypesProps} props - Component properties
 * @returns The list of Pokemon types
 */
export function PokemonTypes(props: PokemonTypesProps) {
  const appContext = React.useContext(AppContext);
  const pokemonTypes = props.types ? props.types : appContext.pokemonTypes;
  const clickable = props.clickHandler ? true : false;
  const typeItems = pokemonTypes.sort().map((pokemonType) => {
    const isSelected = props.selected?.includes(pokemonType) ?? false;
    return (
      <PokemonType key={pokemonType} type={pokemonType} clickHandler={props.clickHandler} clickable={clickable} selected={isSelected} />
    )
  }
  );
  return <>{typeItems}</>;
};