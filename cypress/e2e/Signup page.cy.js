/* eslint-disable no-undef */

describe('Check Page Elements:' , () => {
  beforeEach(() => {
    cy.visit('/register')
  })
  it('Verify that the “新規アカウント登録” (New Account Registration) heading is visible.' , () => {
    cy.contains("新規アカウント登録");
    cy.get('h2').should('be.visible');
  })
})