/// <reference types="cypress" />

describe('Login Page Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Display form with email and password', () => {
    cy.get('label').should('have.length', 2);
    cy.get('input[type="email"]').should('have.length', 2);
    cy.get('input[type="password"]').should('have.length', 2);
  });
});
