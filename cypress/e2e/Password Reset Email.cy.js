/* eslint-disable no-undef */
describe('Check Page Elements:' , () => {
  beforeEach(() => {
    cy.visit('/forgot-password')
  })

  it('Verify that the “新しいパスワード” heading is visible.' , () => {
    cy.contains("新しいパスワード");
    cy.get("h2").should("be.visible");
  })
})