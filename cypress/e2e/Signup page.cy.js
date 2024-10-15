/* eslint-disable no-undef */
const name = 'Hakam aldeen Alkhaddraa'
const category = "Frontend Developer"
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
    cy.get('#name').should('exist').type(name).should('have.value', name)
  })

  it('Ensure the “カテゴリー” (Category) input field is present and accepts input.' , () => {
    cy.get('#category').should('exist').type(category).should('have.value', category)
  })

  it('Ensure the “メールアドレス” (Email Address) input field is present and accepts input.' , () => {
    cy.get('#email').should('exist').type(email).should('have.value', email);
  })

  it('Verify that the two password fields (for password and re-enter password) are present and accept input.' , () => {
    cy.get("#password").should('exist').type(password).should('have.value', password)
    cy.get('#confirmPassword').should('exist').type(password).should('have.value', password)
  })
})