import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ByPokemon } from '../components/by-pokemon';

const handleClick=jest.fn();
const handleReset=jest.fn();

function renderComponent() {
  return render(
    <ByPokemon clickHandler={handleClick} resetHandler={handleReset} />
  );
}

test('shows a searchable list of pokemon', () => {
  renderComponent();
  expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  expect(screen.getByText(/squirtle/i)).toBeInTheDocument();
});

test('can click on a pokemon', () => {
  renderComponent();
  fireEvent.click(screen.getByText(/bulbasaur/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('can search for a pokemon', () => {
  renderComponent();
  const inputEl = screen.getByTestId("pokemon-search");
  userEvent.type(inputEl, 'bulbasaur');
  expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  expect(screen.queryByText(/charmander/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/squirtle/i)).not.toBeInTheDocument();
  fireEvent.click(screen.getByText(/bulbasaur/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});