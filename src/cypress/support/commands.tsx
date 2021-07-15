// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands';

declare global {
  namespace Cypress {
    interface Chainable {
      visitHome(): Chainable<Element>,
      visitSearchByType(): Chainable<Element>,
      visitSearchByPokemon(): Chainable<Element>,
      visitAbout(): Chainable<Element>,
      hasPokemonType(pokemonType: string): Chainable<Element>,
      clickPokemonType(pokemonType: string): Chainable<Element>,
      verifyTypesInGroup(group: string, types: string[]): Chainable<Element>,
      pokemonListContains(selector: string, pokemon: string[]): Chainable<Element>,
      pokemonListDoesNotContain(selector: string, pokemon: string[]): Chainable<Element>,
    }
  }
}

Cypress.Commands.add('visitHome', () => {
  cy.viewport('macbook-15');
  cy.visit(Cypress.env('BASE_URL') + '/');
});

Cypress.Commands.add('visitSearchByType', () => {
  cy.viewport('macbook-15');
  cy.visit(Cypress.env('BASE_URL') + '/by-type');
});

Cypress.Commands.add('visitSearchByPokemon', () => {
  cy.viewport('macbook-15');
  cy.visit(Cypress.env('BASE_URL') + '/by-pokemon');
});

Cypress.Commands.add('visitAbout', () => {
  cy.viewport('macbook-15');
  cy.visit(Cypress.env('BASE_URL') + '/about');
});

Cypress.Commands.add('hasPokemonType', (pokemonType: string) => {
  cy.get('div.pokemon-type[data-pokemon-type="' + pokemonType.toLowerCase() + '"]')
    .should('be.visible')
    .contains(pokemonType.toLowerCase());
});

Cypress.Commands.add('clickPokemonType', (pokemonType: string) => {
  cy.get('div.clickable.pokemon-type[data-pokemon-type="' + pokemonType.toLowerCase() + '"]')
    .should('be.visible')
    .click();
});

Cypress.Commands.add('verifyTypesInGroup', (group: string, types: string[]) => {
    cy.get('div.groups div[data-testid="' + group + '"]').within(() => {
      for (const pokemonType of types) {
        cy.hasPokemonType(pokemonType);
      }
    });
});

Cypress.Commands.add('pokemonListContains', (selector: string, pokemon: string[]) => {
    cy.get(selector).should('be.visible');
    cy.get(selector).within(() => {
      for (const poke of pokemon) {
        cy.get('.pokemon-list')
          .findByText(poke)
          .should('be.visible');
      }
    });
});

Cypress.Commands.add('pokemonListDoesNotContain', (selector: string, pokemon: string[]) => {
    cy.get(selector).should('be.visible');
    cy.get(selector).within(() => {
      for (const poke of pokemon) {
        cy.get('.pokemon-list')
          .findByText(poke)
          .should('not.exist');
      }
    });
});