import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { Suggestions } from '../components/suggestions';

test('shows a list of suggested pokemon', () => {
  render(<Suggestions selected={['psychic', 'fairy']} />);
  const details = screen.getByTestId('suggestion-summary');
  fireEvent.click(details);
  expect(screen.getByRole('heading', { name: 'Try using one of these Pokémon * :' })).toBeInTheDocument();
  expect(screen.getByText('Sandslash', { selector: 'span' })).toBeInTheDocument();
  expect(screen.queryByText('Sandshrew', { selector: 'span' })).not.toBeInTheDocument();
});