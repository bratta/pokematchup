export {};

describe('Search By Pokemon', () => {
  it('loads the list of pokemon', () => {
    cy.visitSearchByPokemon();
    cy.get('div.app-container h1')
      .should('be.visible')
      .contains('Search By Pokémon');
    cy.get('ul.pokemon-list')
      .should('be.visible');
    cy.pokemonListContains('div.app-container', ['Bulbasaur', 'Slowpoke', 'Calyrex']);
  });

  it('filters as the user searches', () => {
    cy.get('input.pokemon-search-field')
      .should('be.visible')
      .type('lucario');
    // It's a fuzzy search so additional matches will appear
    // And findAllByText does not like it when text is split between tags
    cy.get('div.app-container').within(() => {
      for (const poke of ['Lucario', 'Lucario (Mega)', 'Volcarona', 'Volcanion']) {
        cy.get('.pokemon-list')
          .should('be.visible')
          .contains(poke);
      }
    });
    cy.pokemonListDoesNotContain('div.app-container', ['Bulbasaur', 'Slowpoke', 'Calyrex']);
    cy.get('button.closeIcon')
      .should('be.visible')
      .click();
    cy.get('input.pokemon-search-field')
      .should('be.empty');
    cy.pokemonListContains('div.app-container', ['Bulbasaur', 'Slowpoke', 'Calyrex']);
  });

  it('allows the user to click the result', () => {
    cy.get('input.pokemon-search-field')
      .should('be.visible')
      .type('^excadrill');
    cy.get('ul.pokemon-list li')
      .should('be.visible')
      .click();
    cy.get('div.app-container h3')
      .should('be.visible')
      .contains('Excadrill (Ground, Steel)');
    cy.get('div.reset')
      .should('be.visible')
      .click();
    cy.get('div.app-container h1')
      .should('be.visible')
      .contains('Search By Pokémon');
    cy.get('ul.pokemon-list')
      .should('be.visible');
    cy.pokemonListContains('div.app-container', ['Bulbasaur', 'Slowpoke', 'Calyrex']);
  });
});