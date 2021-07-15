export {};

describe('Static Pages', () => {
  context('Home', () => {
    it('loads the home page', () => {
      cy.visitHome();
      cy.get('div.home h1')
        .should('be.visible')
        .contains('Pokémon Matchup');
    });
  });

  context('About', () => {
    it('loads the about page', () => {
      cy.visitAbout();
      cy.get('div.about h1')
        .should('be.visible')
        .contains('About Pokémon Matchup');
    });
  });

  context('Navigation', () => {
    it('loads the proper pages from the top navigation bar', () => {
      cy.visitHome();
      cy.get('a.navigate-by-type')
        .should('be.visible')
        .click();
      cy.get('div.app-container h1')
        .should('be.visible')
        .contains('Search By Type(s)');
      cy.get('a.navigate-by-pokemon')
        .should('be.visible')
        .click();
      cy.get('div.app-container h1')
        .should('be.visible')
        .contains('Search By Pokémon');
    });
  });
});