describe('Verify Maps Integration', () => {

    it('Verify Maps is visible', () => {

        cy.visit('http://localhost:3000/map');

        cy.get('#map').should('be.visible');

    })
    
});

export {}

