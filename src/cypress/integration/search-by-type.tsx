export {};

describe('Search By Type', () => {
  it('Loads the list of types', () => {
    cy.visitSearchByType();
    cy.get('div.app-container h1')
      .should('be.visible')
      .contains('Search By Type(s)');
  });
  
  it('selects a single type', () => {
    cy.visitSearchByType();
    cy.clickPokemonType('flying');
    cy.get('div.app-container h3')
      .should('be.visible')
      .contains('Flying');
    cy.verifyTypesInGroup('Super Effective', ['electric', 'ice', 'rock']);
    cy.verifyTypesInGroup('Effective', ['dark', 'dragon', 'fairy', 'fire', 'flying', 'ghost', 'normal', 'poison', 'psychic', 'steel', 'water']);
    cy.verifyTypesInGroup('Not Very Effective', ['bug', 'fighting', 'grass']);
    cy.verifyTypesInGroup('No Effect', ['ground']);
    cy.get('div.pokemonOfType details summary')
      .should('be.visible')
      .click();
    cy.pokemonListContains('div.pokemonOfType details', ['Tornadus (Incarnate Forme)', 'Tornadus (Therian Forme)', 'Rookidee', 'Corvisquire']);
    cy.get('div.suggestions details summary')
      .should('be.visible')
      .click();
    cy.pokemonListContains('div.suggestions details', ['Raichu', 'Glaceon', 'Regirock', 'Arctozolt', 'Zekrom', 'Carbink', 'Coalossal']);
    cy.pokemonListDoesNotContain('div.suggestions details', ['Pikachu', 'Sandslash', 'Machamp', 'Stunfisk']);
    cy.get('div.pokemon-type.clickable.reset')
      .should('be.visible')
      .click();
    cy.get('div.groups').should('not.exist');
    cy.get('div.pokemonOfType').should('not.exist');
    cy.get('div.suggestions').should('not.exist');
  });

  it('selects two types', () => {
    cy.visitSearchByType();
    cy.clickPokemonType('ghost');
    cy.clickPokemonType('fairy');
    cy.get('div.app-container h3')
      .should('be.visible')
      .contains('Fairy, Ghost');
    cy.verifyTypesInGroup('Super Effective', ['ghost', 'steel']);
    cy.verifyTypesInGroup('Effective', ['dark', 'electric', 'fairy', 'fire', 'flying', 'grass', 'ground', 'ice', 'poison', 'psychic', 'rock', 'water']);
    cy.verifyTypesInGroup('Not Very Effective (0.25x)', ['bug']);
    cy.verifyTypesInGroup('No Effect', ['dragon', 'fighting', 'normal']);
    cy.get('div.pokemonOfType details summary')
      .should('be.visible')
      .click();
    cy.pokemonListContains('div.pokemonOfType details', ['Mimikyu']);
    cy.get('div.suggestions details summary')
      .should('be.visible')
      .click();
    cy.pokemonListContains('div.suggestions details', ['Polteageist', 'Copperajah', 'Aegislash (Blade Forme)', 'Gengar', 'Sableye', 'Chandelure']);
    cy.pokemonListDoesNotContain('div.suggestions details', ['Sinistea', 'Meltan', 'Ribombee', 'Goodra', 'Machamp', 'Snorlax']);
    cy.get('div.pokemon-type.clickable.reset')
      .should('be.visible')
      .click();
    cy.get('div.groups').should('not.exist');
    cy.get('div.pokemonOfType').should('not.exist');
    cy.get('div.suggestions').should('not.exist');
  });
});