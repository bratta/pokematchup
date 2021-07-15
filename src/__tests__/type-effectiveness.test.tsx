import TypeEffectiveness, { Effectiveness, EffectivenessGroup } from "../type-effectiveness";
import { defaultAppContext, PokedexEntry } from '../app-context';

describe('checkType', () => {
  test('it returns true for a valid pokemon type', () => {
    const te = new TypeEffectiveness('fire');
    expect(te.checkType('fire')).toBeTruthy();
  });

  test('it throws an error with an invalid type', () => {
    const te = new TypeEffectiveness('fire');
    expect(() => { te.checkType('beef') }).toThrowError();
  });
});

describe('effectiveness', () => {
  test('it calculates effectiveness against a pokemon with a single type', () => {
    const te = new TypeEffectiveness('fire');
    expect(te.effectiveness(['water'])).toEqual(0.5);
    expect(te.effectiveness(['steel'])).toEqual(2.0);
  });

  test('it calculates effectiveness against a pokemon with two types', () =>  {
    const te = new TypeEffectiveness('fairy');
    expect(te.effectiveness(['psychic', 'steel'])).toEqual(0.25);
    expect(te.effectiveness(['fighting', 'dark'])).toEqual(4.0);
  });
});

describe('By', () => {
  test('builds a list of effectiveness for a single type', () => {
    const results: Effectiveness[] = TypeEffectiveness.By(['fighting']);
    const nve = results.find(x => x.damage === 0.5);
    const eff = results.find(x => x.damage === 1.0);
    const sef = results.find(x => x.damage === 2.0);
    expect(nve?.types).toEqual(['bug', 'dark', 'rock']);
    expect(eff?.types).toEqual([
      'dragon', 'electric', 'fighting', 'fire', 'ghost', 'grass',
      'ground', 'ice', 'normal', 'psychic', 'steel', 'water'
    ]);
    expect(sef?.types).toEqual(['fairy', 'flying', 'poison']);
  });

  test('builds a list of effectiveness for two types', () => {
    const results: Effectiveness[] = TypeEffectiveness.By(['fairy', 'psychic']);
    const nve25 = results.find(x => x.damage === 0.25);
    const nve   = results.find(x => x.damage === 0.5);
    const nodmg = results.find(x => x.damage === 0);
    const eff   = results.find(x => x.damage === 1.0);
    const sef   = results.find(x => x.damage === 2.0);
    expect(nve25?.types).toEqual(['bug', 'fighting']);
    expect(nve?.types).toEqual(['dark', 'fairy', 'grass']);
    expect(nodmg?.types).toEqual(['dragon']);
    expect(eff?.types).toEqual([
      'electric', 'fire', 'flying', 'ghost', 'ice', 'normal',
      'psychic', 'rock', 'water'
    ]);
    expect(sef?.types).toEqual(['ground', 'poison', 'steel']);
  });
});

describe('GroupResults', () => {
  test('builds a list of effectiveness pre-grouped with labels', () => {
    const results: Effectiveness[] = TypeEffectiveness.By(['fairy', 'psychic']);
    const grouped: EffectivenessGroup[] = TypeEffectiveness.GroupResults(results);
    expect(grouped.length).toEqual(5);
    expect(grouped[0].label).toEqual("Super Effective");
    expect(grouped[0].types).toEqual(['ground', 'poison', 'steel']);
    expect(grouped[1].label).toEqual("Effective");
    expect(grouped[1].types).toEqual([
      'electric', 'fire', 'flying', 'ghost', 'ice', 'normal',
      'psychic', 'rock', 'water'
    ]);
    expect(grouped[2].label).toEqual("Not Very Effective");
    expect(grouped[2].types).toEqual(['dark', 'fairy', 'grass']);
    expect(grouped[3].label).toEqual("Not Very Effective (0.25x)");
    expect(grouped[3].types).toEqual(['bug', 'fighting']);
    expect(grouped[4].label).toEqual("No Effect");
    expect(grouped[4].types).toEqual(['dragon']);
  });
});

describe('PokemonOfType', () => {
  const fakePokedex: PokedexEntry[] = [
    { id: 1, dex_id: 1, name: "GrassGoober", fully_evolved: false, types: ['grass'] },
    { id: 2, dex_id: 2, name: "WaterGoober", fully_evolved: false, types: ['water'] },
    { id: 3, dex_id: 3, name: "FireGoober", fully_evolved: false, types: ['fire'] },
    { id: 4, dex_id: 4, name: "PsyLol", fully_evolved: false, types: ['psychic', 'grass'] },
    { id: 5, dex_id: 5, name: "Psyking", fully_evolved: true, types: ['psychic', 'grass'] },
    { id: 6, dex_id: 6, name: "PsyNoob", fully_evolved: true, types: ['psychic'] },
  ];

  test('returns a list of pokemon of a specific type', () => {
    let results = TypeEffectiveness.PokemonOfType(['grass'], fakePokedex, false);
    expect(results.length).toEqual(1);
    expect(results[0].name).toEqual("GrassGoober");
    results = TypeEffectiveness.PokemonOfType(['grass', 'psychic'], fakePokedex, false);
    expect(results.length).toEqual(2);
    expect(results[0].name).toEqual("PsyLol");
    expect(results[1].name).toEqual("Psyking");
  });

  test('returns nothing if no pokemon of the specified type exists', () => {
    let results = TypeEffectiveness.PokemonOfType(['steel'], fakePokedex, false);
    expect(results.length).toEqual(0);
  });

  test('returns only fully-evolved pokemon (or those with no evolutions)', () => {
    const results = TypeEffectiveness.PokemonOfType(['grass', 'psychic'], fakePokedex, true);
    expect(results.length).toEqual(1);
    expect(results[0].name).toEqual("Psyking");
  });
});

describe('PokemonOfTypeExcluding', () => {
  const fakePokedex: PokedexEntry[] = [
    { id: 1, dex_id: 1, name: "GrassGoober", fully_evolved: false, types: ['grass'] },
    { id: 2, dex_id: 2, name: "WaterGoober", fully_evolved: false, types: ['water'] },
    { id: 3, dex_id: 3, name: "FireGoober", fully_evolved: false, types: ['fire'] },
    { id: 4, dex_id: 4, name: "PsyLol", fully_evolved: false, types: ['psychic', 'grass'] },
    { id: 5, dex_id: 5, name: "Psyking", fully_evolved: true, types: ['psychic', 'grass'] },
    { id: 6, dex_id: 6, name: "PsyNoob", fully_evolved: true, types: ['psychic'] },
    { id: 4, dex_id: 4, name: "SteelLol", fully_evolved: false, types: ['steel', 'grass'] },
    { id: 5, dex_id: 5, name: "Steelking", fully_evolved: true, types: ['steel', 'grass'] },
    { id: 6, dex_id: 6, name: "SteelNoob", fully_evolved: true, types: ['steel'] },
    { id: 4, dex_id: 4, name: "GrassFire", fully_evolved: false, types: ['fire', 'grass'] },
    { id: 5, dex_id: 5, name: "GrassierFire", fully_evolved: true, types: ['fire', 'grass'] }
  ];

  test('returns pokemon having one type but not having another', () => {
    const results = TypeEffectiveness.PokemonOfTypeExcluding('grass', ['psychic', 'steel'], fakePokedex, false);
    expect(results.length).toEqual(2);
    expect(results[0].name).toEqual('GrassFire');
    expect(results[1].name).toEqual('GrassierFire');
  });

  test('excludes pokemon plus excluding non-evolved pokemon', () => {
    const results = TypeEffectiveness.PokemonOfTypeExcluding('grass', ['psychic', 'steel'], fakePokedex, true);
    expect(results.length).toEqual(1);
    expect(results[0].name).toEqual('GrassierFire');
  });
});

describe('Suggestions', () => {
  const suggestions = Array.from(TypeEffectiveness.Suggestions(['flying', 'water'], defaultAppContext.pokedex)).map(x => x.name);

  test('includes 4x super effective including permutations', () => {
    expect(suggestions.includes('Raichu')).toBeTruthy();
    expect(suggestions.includes('Zapdos')).toBeTruthy();
  });

  test('includes 2x super effective including permutations', () => {
    expect(suggestions.includes('Regirock')).toBeTruthy();
    expect(suggestions.includes('Tyranitar')).toBeTruthy();
  });

  test('excludes non-evolved pokemon', () => {
    expect(suggestions.includes('Pichu')).not.toBeTruthy();
    expect(suggestions.includes('Pikachu')).not.toBeTruthy();
    expect(suggestions.includes('Larvitar')).not.toBeTruthy();
    expect(suggestions.includes('Pupitar')).not.toBeTruthy();
  });

  test('excludes not very effective', () => {
    expect(suggestions.includes('Lucario')).not.toBeTruthy();
    expect(suggestions.includes('Blastoise')).not.toBeTruthy();
  });

  test('excludes not effect', () => {
    expect(suggestions.includes('Sandslash')).not.toBeTruthy();
  });

  test('excludes effective', () => {
    expect(suggestions.includes('Alcremie')).not.toBeTruthy();
  });
});