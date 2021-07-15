import '@testing-library/jest-dom';
import { ChangeEvent } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PokemonSearchBox } from '../components/pokemon-search-box';

test('displays a search box on the form', () => {
  render(<PokemonSearchBox clickHandler={jest.fn()} resetHandler={jest.fn()} />);
  expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
});

test('calls click handler on input field change', () => {
  const handleChange = jest.fn((e: ChangeEvent<HTMLInputElement>) => {
    expect(e.currentTarget.dataset.testid).toEqual("pokemon-search");
  });
  render(<PokemonSearchBox clickHandler={(e) => handleChange(e)} resetHandler={jest.fn()} />);
  const inputEl = screen.getByTestId("pokemon-search");
  userEvent.type(inputEl, 'bulbasaur');
  expect(handleChange).toHaveBeenCalled();
});

test('reset clears the value of the search field', () => {
  const handleReset = jest.fn();
  render(<PokemonSearchBox clickHandler={jest.fn()} resetHandler={handleReset} />);
  const inputEl = screen.getByTestId("pokemon-search") as HTMLInputElement;
  userEvent.type(inputEl, 'bulbasaur');
  expect(inputEl.value).toEqual('bulbasaur');
  const resetEl = screen.getByTestId("reset-button");
  userEvent.click(resetEl);
  expect(handleReset).toHaveBeenCalled();
  expect(inputEl.value).toEqual('');
});