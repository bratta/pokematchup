import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { PokemonList } from '../components/pokemon-list';
import { defaultAppContext } from '../app-context';

test('shows a list of pokemon', () => {
  render(<PokemonList clickHandler={jest.fn()} pokedex={defaultAppContext.pokedex} />)
  expect(screen.getByText('Bulbasaur', { selector: 'span' })).toBeInTheDocument();
});

test('pokemon can be clicked', () => {
  const handleClick=jest.fn((e) => {
    expect(e.currentTarget.dataset.pokemon).toEqual("1");
  });
  render(<PokemonList clickHandler={(e) => handleClick(e)} pokedex={defaultAppContext.pokedex} />)
  fireEvent.click(screen.getByText(/bulbasaur/i));
});
