import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { About } from '../components/about';

test('shows the about screen', () => {
  render(<About />);
  expect(screen.getByText('About Pokémon Matchup', {selector: 'h1'})).toBeInTheDocument();
});