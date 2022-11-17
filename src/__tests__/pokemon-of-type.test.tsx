import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { PokemonOfType } from '../components/pokemon-of-type';

test('shows a list of pokemon having specific types', () => {
  render(<PokemonOfType selected={['psychic', 'fairy']} />);
  expect(screen.queryByText("Gardevoir (Mega)")).toBeInTheDocument();
  expect(screen.queryByText("Ralts")).toBeInTheDocument();
  expect(screen.queryByText("Kirlia")).toBeInTheDocument();
});

test('shows a message when no pokemon match the types', () => {
  render(<PokemonOfType selected={['fire', 'fairy']} />);
  expect(screen.queryByText(/No Pokémon have this typing/)).toBeInTheDocument();
});