describe('Form_Validation Testing', () => {
    it('NameInput - Testing', () => {
      cy.visit('/');
      cy.get('#name').type('Me');
      cy.get('[data-cy = "cy-name"]').should('have.text','en az 3 karakter olmalı !');
    })
    it('surNameInput - Testing', () => {
        cy.visit('/');
        cy.get('#surname').type('A');
        cy.get('[data-cy = "cy-surname"]').should('have.text','en az 2 karakter olmalı !');
      })
    it('emailInput - Testing', () => {
        cy.visit('/');
        cy.get('#email').type('mesud.28gmail.com');
        cy.get('[data-cy = "cy-email"]').should('have.text','@admin.com formatında olmalı !');
      })
    it('emailInput - Testing', () => {
        cy.visit('/');
        cy.get('#password').type('103021');
        cy.get('[data-cy = "cy-password"]').should('have.text','en az 10 karakter !');
      })
    it('termsCheck - Testing', () => {
        cy.visit('/');
        cy.get('#terms').click().click();
        cy.get('[data-cy = "cy-terms"]').should('have.text','Kabul ediniz !');
      })
  })