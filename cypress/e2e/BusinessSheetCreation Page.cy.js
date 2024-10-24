/* eslint-disable no-undef */
const email = "hakamha8@gmail.com";
const password = "Hakamaldeen17";
const typeInInput = (id, value) => {
  return cy.get(id).should("exist").type(value);
};
describe('Initial Load:', () => {
  beforeEach(() => {
    cy.visit('/login')
    typeInInput('#email', email)
    typeInInput('#password', password)
    cy.get('button[type=submit]').click()
    cy.wait(10000).visit('business-sheet-creation')
  })

  it('Verify that the BusinessSheetCreation page loads without any errors.' , () => {
    cy.url().should('include', 'business-sheet-creation')
  })
})
