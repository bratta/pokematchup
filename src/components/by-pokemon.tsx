import React, { ChangeEvent, MouseEvent } from 'react';
import Fuse from 'fuse.js';

import { AppContext, PokedexEntry } from '../app-context';
import { EffectivenessChart } from './effectiveness-chart';
import { PokemonList } from './pokemon-list';
import { PokemonSearchBox } from './pokemon-search-box';

interface ByPokemonProps {
  selected?: PokedexEntry,
  clickHandler: (event: MouseEvent<HTMLLIElement>) => void,
  resetHandler: (event: MouseEvent<HTMLDivElement>) => void
}

interface ByPokemonState {
  fuseOptions: Fuse.IFuseOptions<PokedexEntry>,
  fuse: Fuse<PokedexEntry>,
  searchTerm?: string,
  searchResults?: PokedexEntry[],
}

/**
 * ByPokemon - Show a searchable list of Pokemon
 */
export class ByPokemon extends React.Component<ByPokemonProps, ByPokemonState> {
  constructor(props: ByPokemonProps) {
    super(props);
    const fuseOptions: Fuse.IFuseOptions<PokedexEntry> = {
      includeScore: false,
      includeMatches: true,
      shouldSort: true,
      findAllMatches: true,
      useExtendedSearch: true,
      threshold: 0.4,
      keys: [ 'name' ]
    };
    this.state = {
      fuseOptions: fuseOptions,
      fuse: new Fuse([], fuseOptions),
    };
  }

  /**
   * Initialize Fuse.js when starting the component
   */
  componentDidMount() {
    this.setState({fuse: new Fuse(this.context.pokedex, this.state.fuseOptions)});
  }

  render() {
    if (this.props.selected) {
      return (
        <>
        <h1>Search By Pokémon</h1>
        <div className="pokemon-type clickable reset" onClick={(e) => this.resetAll(e)}>Clear</div>
        <EffectivenessChart selected={this.props.selected.types} name={this.props.selected.name} />
        </>
      );
    } else {
      const pokedex = this.getFilteredPokedex();
      return (
            <>
              <h1>Search By Pokémon</h1>
              <PokemonSearchBox clickHandler={(e) => this.handleSearch(e, this.state.fuse)} resetHandler={(e) => this.resetSearchForm(e)} />
              <PokemonList pokedex={pokedex} clickHandler={this.props.clickHandler} />
            </>
      );
    }
  }

  /**
   * Fire off a Fuse.js search
   * 
   * @param {ChangeEvent<HTMLInputElement>} event - scoped to an input tag
   * @param {Fuse<PokedexEntry>} fuse - Fuse.js instance
   */
  handleSearch(event: ChangeEvent<HTMLInputElement>, fuse: Fuse<PokedexEntry>) {
    const searchTerm = event.currentTarget.value;
    const searchResults = fuse.search(searchTerm).map((searchResult) =>  {
      const indices = searchResult.matches ? searchResult.matches[0].indices.slice() : [];
      const entry = { ...searchResult.item};
      entry.formattedName = !searchTerm ? undefined : this.highlight(searchResult.item.name, indices);
      return entry;
    }
    );
    this.setState({
      searchTerm: searchTerm,
      searchResults: searchResults,
    });
  }

  /**
   * Clears the search form, when the X button is hit
   * 
   * @param {MouseEvent<HTMLButtonElement>} event - scoped to a button
   */
  resetSearchForm(event: MouseEvent<HTMLButtonElement>) {
    this.setState({
      searchTerm: undefined,
      searchResults: undefined,
    });
  }

  /**
   * Clears the search form and clears the Pokemon/types selection
   * 
   * @param {MouseEvent<HTMLDivElement>} event - scoped to a div; eg. This will be the "Clear" button
   */
  resetAll(event: MouseEvent<HTMLDivElement>) {
    this.props.resetHandler(event);
    this.setState({
      searchTerm: undefined,
      searchResults: undefined,
    });
  };

  /**
   * Filter the Pokemon list by the Fuse.js search
   * 
   * @returns {PokedexEntry[]} - A filtered list of Pokemon
   */
  getFilteredPokedex() : PokedexEntry[] {
    if (!this.state.searchTerm) {
      return this.context.pokedex;
    }
    return this.state.searchResults ?? [];
  }

  /**
   * A recursive function to underline letters of the Pokemon's name based
   * on the fuzzy search term entered in the Fuse.js search box
   * 
   * @param {string} value - Name of the Pokemon
   * @param {Fuse.RangeTuple[]} indices - A tuple of indexes where search terms preside
   * @param {number} i - Iterator used for looking through results
   * @returns 
   */
  highlight(value: string, indices: Fuse.RangeTuple[] = [], i=1) : JSX.Element {
    const pair = indices.slice()[indices.length - i];
    if (pair) {
      return (
        <>
          {this.highlight(value.substring(0, pair[0]), indices, i+1)}
          <span className="searchResult">{value.substring(pair[0], pair[1]+1)}</span>
          {value.substring(pair[1]+1)}
        </>
      );
    } else {
      return <>{value}</>;
    }
  }
}
ByPokemon.contextType = AppContext;
