import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PokemonType, PokemonTypes } from '../components/pokemon-type';

test('renders a clickable type', () => {
  const handleClick = jest.fn();
  render(<PokemonType type={'Fire'} clickHandler={handleClick} clickable={true} selected={false} />);
  const pokemonType = screen.getByTestId("pokemon-type") as HTMLDivElement;
  userEvent.click(pokemonType);
  expect(handleClick).toHaveBeenCalledTimes(1);
  expect(pokemonType).toHaveClass('clickable');
  expect(pokemonType).not.toHaveClass('selected');
});

test('renders a non-clickable type', () => {
  render(<PokemonType type={'Fire'} clickable={false} selected={false} />);
  const pokemonType = screen.getByTestId("pokemon-type") as HTMLDivElement;
  userEvent.click(pokemonType);
  expect(pokemonType).not.toHaveClass('clickable');
  expect(pokemonType).not.toHaveClass('selected');
});

test('renders a selected type', () => {
  render(<PokemonType type={'Fire'} clickable={false} selected={true} />);
  const pokemonType = screen.getByTestId("pokemon-type") as HTMLDivElement;
  userEvent.click(pokemonType);
  expect(pokemonType).not.toHaveClass('clickable');
  expect(pokemonType).toHaveClass('selected');
});

test('renders a list of types', () =>  {
  const types = ['fire', 'water', 'grass'];
  const selected = ['water'];
  render(<PokemonTypes types={types} selected={selected} />);
  expect(screen.getByText(/fire/i)).toBeInTheDocument();
  expect(screen.getByText(/water/i)).toBeInTheDocument();
  expect(screen.getByText(/grass/i)).toBeInTheDocument();
  expect(screen.queryByText(/psychic/i)).not.toBeInTheDocument();
  const selectedEl = screen.getByText(/water/i) as HTMLDivElement;
  expect(selectedEl).toHaveClass('selected');
});

test('renders a list of clickable types', () =>  {
  const handleClick = jest.fn();
  const types = ['fire', 'water', 'grass'];
  render(<PokemonTypes types={types} clickHandler={handleClick} />);
  userEvent.click(screen.getByText(/water/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});