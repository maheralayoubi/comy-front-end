/* eslint-disable no-undef */
const email = "hakamha8@gmail.com";
const password = 'Hakamaldeen17'

describe('Check Page Elements:' , () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  it('Verify that the “新規アカウント登録” (New Account Registration) heading is visible.' , () => {
    cy.contains("新規アカウント登録");
    cy.get('h2').should('be.visible');
  })

  it('Ensure the “名前” (Name) input field is present and accepts input.' , () => {
    cy.get('#name').should('exist').type('Hakam aldeen').should('have.value', 'Hakam aldeen')
  })

  it('Ensure the “カテゴリー” (Category) input field is present and accepts input.' , () => {
    cy.get('#category').should('exist').type('Frontend Developer').should('have.value', 'Frontend Developer')
  })
})