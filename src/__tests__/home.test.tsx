import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Home } from '../components/home';

test('shows the home screen with links to the search functionality', () => {
  render(<Home />);
  expect(screen.getByText('Pokémon Matchup', {selector: 'h1'})).toBeInTheDocument();
});