describe('Form_Submit Testing', () => {
    it('Inputs - Enter', () => {
      cy.visit('/');
      cy.get('#name').type('Mesud');
      cy.get('#surname').type('AYDIN');
      cy.get('#email').type('eem.mesud.28@gmail.com');
      cy.get('#password').type('1030216350');
      cy.get('#terms').click();
      cy.get('[data-cy = "cy-submit"]').click();
      cy.get('.right-side > .users-table > table').should('be.visible');
    })
  })