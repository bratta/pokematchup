import '@testing-library/jest-dom';
import { MouseEvent } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ByType } from '../components/by-type';

const handleClick=jest.fn();
const handleReset=jest.fn();

function renderWithHandlers(clickHandler: any=handleClick, resetHandler: any=handleReset) {
  return render(
    <ByType clickHandler={clickHandler} resetHandler={resetHandler} />
  );
}

test('shows a list of types', () => {
  renderWithHandlers();
  expect(screen.getByText(/fire/i)).toBeInTheDocument();
  expect(screen.getByText(/water/i)).toBeInTheDocument();
  expect(screen.getByText(/grass/i)).toBeInTheDocument();
});

test('can click on the types', () => {
  const handleClickWater = jest.fn((e: MouseEvent<HTMLDivElement>) => {
    expect(e.currentTarget.dataset.pokemonType).toEqual("water");
  });
  renderWithHandlers(handleClickWater);
  fireEvent.click(screen.getByText(/water/i));
  expect(handleClickWater).toHaveBeenCalledTimes(1);
});