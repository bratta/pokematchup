import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { EffectivenessChart } from '../components/effectiveness-chart';

test('shows a list of types with a name', () => {
  render(<EffectivenessChart name={'Firestarter'} selected={['Fire', 'Grass']} />)
  expect(screen.getByText('Firestarter (Fire, Grass)', { selector: 'h3' })).toBeInTheDocument();
});

test('shows a list of types', () => {
  render(<EffectivenessChart selected={['Fire', 'Grass']} />)
  expect(screen.getByText('Fire, Grass', { selector: 'h3' })).toBeInTheDocument();
  expect(screen.queryByText('Firestarter', { selector: 'h3' })).not.toBeInTheDocument();
});

test('shows super effective types', () => {
  render(<EffectivenessChart selected={['Fire', 'Grass']} />)
  const superEffective = screen.getByTestId('Super Effective');
  expect(superEffective).toHaveTextContent('flying');
  expect(superEffective).toHaveTextContent('psychic');
  expect(superEffective).toHaveTextContent('rock');
});

test('shows effective types', () => {
  render(<EffectivenessChart selected={['Fire', 'Grass']} />)
  const effective = screen.getByTestId('Effective');
  for (const effectiveType of ['bug', 'dark', 'dragon', 'fighting', 'fire', 'ghost', 'ground', 'ice', 'normal', 'poison', 'water']) {
    expect(effective).toHaveTextContent(effectiveType);
  }
});

test('shows not very effective types', () => {
  render(<EffectivenessChart selected={['Fire', 'Grass']} />)
  const notVeryEffective = screen.getByTestId('Not Very Effective');
  expect(notVeryEffective).toHaveTextContent('electric');
  expect(notVeryEffective).toHaveTextContent('fairy');
  expect(notVeryEffective).toHaveTextContent('steel');
});

test('shows not very effective (0.25x) types', () => {
  render(<EffectivenessChart selected={['Fire', 'Grass']} />)
  const notVeryEffective = screen.getByTestId('Not Very Effective (0.25x)');
  expect(notVeryEffective).toHaveTextContent('grass');
});