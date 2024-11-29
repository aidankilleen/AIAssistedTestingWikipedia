describe('Wikipedia Search Feature', () => {
  const wikipediaUrl = 'https://www.wikipedia.org/';

  beforeEach(() => {
    cy.visit(wikipediaUrl); // Navigate to Wikipedia homepage before each test
  });

  it('should perform a basic search and navigate to the correct page', () => {
    cy.get('input#searchInput').type('JavaScript');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/wiki/JavaScript');
    cy.get('#firstHeading').should('contain', 'JavaScript');
  });

  it('should show auto-suggestions when typing a search query', () => {
    cy.get('input#searchInput').type('Java');
    cy.get('.suggestions-dropdown').should('be.visible');
    cy.get('.suggestions-dropdown').should('contain', 'JavaScript');
    cy.get('.suggestions-dropdown').should('contain', 'Java (programming language)');
  });

  it('should navigate to an article from the search results', () => {
    cy.get('input#searchInput').type('Python');
    cy.get('button[type="submit"]').click();
    cy.get('#mw-content-text').find('li').first().find('a').first().click(); // Refined to target the first <a>
    cy.url().should('include', '/wiki/Python');
    cy.get('#firstHeading').should('contain', 'Python');
});




  it('should return relevant results for multi-word search queries', () => {
    cy.get('input#searchInput').type('history of programming');
    cy.get('button[type="submit"]').click();
    cy.get('#mw-content-text').find('li').its('length').should('be.greaterThan', 0);
    cy.get('#mw-content-text').should('contain', 'history');
    cy.get('#mw-content-text').should('contain', 'programming');
  });


  it('should handle responsiveness on mobile', () => {
    cy.viewport('iphone-6'); // Simulate a mobile device
    cy.get('input#searchInput').type('JavaScript');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/wiki/JavaScript');
    cy.get('#firstHeading').should('contain', 'JavaScript');
  });

});
