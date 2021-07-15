import React, { ChangeEvent, FormEvent, MouseEvent } from 'react';

interface PokemonSearchBoxProps {
  clickHandler: (event: ChangeEvent<HTMLInputElement>) => void,
  resetHandler: (event: MouseEvent<HTMLButtonElement>) => void,
}

/**
 * PokemonSearchBox - Return a form and input field used for performing
 * a fuzzy search using Fuse.js
 * 
 * @param {PokemonSearchBoxProps} props - Component properties
 * @returns The search form
 */
export function PokemonSearchBox(props: PokemonSearchBoxProps) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="searchBox">
        <input className="pokemon-search-field" data-testid="pokemon-search" type="text" placeholder="Search..." onChange={props.clickHandler} required={true} />
        <button className="closeIcon" type="reset" data-testid="reset-button" onClick={props.resetHandler} />
      </div>
    </form>
  );
}

/**
 * Ignore any form submissions via pressing enter
 * 
 * @param {FormEvent<HtmlFormEvent>} event - Scoped to the form
 */
function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
}