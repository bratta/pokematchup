import React, { MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { AppContext, defaultAppContext, PokedexEntry } from './app-context';
import { Home } from './components/home';
import { About } from './components/about';
import { ByType } from './components/by-type';
import { ByPokemon } from './components/by-pokemon';

import './sass/pokematchup.scss';

interface AppProps {
}

/** Holds the state for the entire application */
interface AppState {
  /** The Pokemon types selected by the user */
  selectedTypes: string[],
  /** The Pokemon selected by the user */
  selectedPokemon?: PokedexEntry,
}

/**
 * Pokemon Matchup - An application for determining type effectiveness for
 * a variety of Pokemon battles.
 */
class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      selectedTypes: [],
    };
  }

  /**
   * Click handler for selecting/deselecting Pokemon types
   * 
   * @param {MouseEvent<HTMLDivElement> event - Scoped to div (eg. clicking a Pokemon Type widget)
   */
  handleClickForType(event: MouseEvent<HTMLDivElement>) {
    const selectedType = event.currentTarget.dataset.pokemonType;
    if (selectedType) {
      let current: string[] = this.state.selectedTypes ? this.state.selectedTypes.slice() : [];
      if (current.includes(selectedType)) {
        current = current.filter(item => item !== selectedType);
      } else {
        // Pokémon have either one or two types, so
        // remove the first entry if an additional type was selected
        if (current.length === 2) {
          current.shift();
        }
        current.push(selectedType);
      }
      this.setState({ selectedTypes: current });
    }
  }

  /**
   * Click handler for selecting Pokemon
   * 
   * @param {MouseEvent<HTMLLIElement>} event - Scoped to a list item (eg. A list of Pokemon)
   */
  handleClickForPokemon(event: MouseEvent<HTMLLIElement>) {
    const selectedId = event.currentTarget.dataset.pokemon;
    if (selectedId) {
      const selectedPokemon = this.getPokemonById(parseInt(selectedId));
      if (selectedPokemon) {
        this.setState({ selectedPokemon: selectedPokemon });
      }
    }
  }

  /**
   * Click handler for resetting selected Pokemon
   * 
   * @param {MouseEvent<HTMLDivElement>} event - Scoped to div (eg. Clear button)
   */
  handleResetPokemon(event: MouseEvent<HTMLDivElement>) {
    this.setState({ selectedPokemon: undefined });
  }

  /**
   * Click handler for resetting selected Pokemon types
   * 
   * @param {MouseEvent<HTMLDivElement>} event - Scoped to div (eg. Clear button)
   */
  handleResetTypes(event: MouseEvent<HTMLDivElement>) {
    this.setState({ selectedTypes: [] });
  }

  /**
   * Return a PokedexEntry by ID, or undefined if not found
   * 
   * @param {number} id - The Pokemon ID (not the pokedex entry, but the unique JSON ID field)
   * @returns {PokedexEntry | undefined} - The appropriate Pokemon, if found
   */
  getPokemonById(id: number) : PokedexEntry | undefined {
    const pokedex = this.context.pokedex as PokedexEntry[];
    const pokemon = pokedex.find((pokedexEntry) =>
      pokedexEntry.id === id
    );
    return pokemon;
  }

  render() {
    return (
      <AppContext.Provider value={defaultAppContext}>
        <Router>
          <div>
            <nav>
              <ul>
                <li><Link to="/" className="navigate-home">🏠 Home</Link></li>
                <li><Link to="/by-type" className="navigate-by-type">🔎 Type</Link></li>
                <li><Link to="/by-pokemon" className="navigate-by-pokemon">🔎 Pokémon</Link></li>
              </ul>
            </nav>
          </div>
          <div className="app-container">
            <Switch>
              <Route path="/by-type">
                <ByType selected={this.state.selectedTypes}
                        clickHandler={(e) => this.handleClickForType(e)}
                        resetHandler={(e) => this.handleResetTypes(e)}
                />
              </Route>
              <Route path="/by-pokemon">
                <ByPokemon selected={this.state.selectedPokemon}
                          clickHandler={(e) => this.handleClickForPokemon(e)}
                          resetHandler={(e) => this.handleResetPokemon(e)}
                />
              </Route>
              <Route path="/about"><About /></Route>
              <Route path="/"><Home /></Route>
            </Switch>
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}
App.contextType = AppContext;

ReactDOM.render(<App />, document.getElementById('root'));