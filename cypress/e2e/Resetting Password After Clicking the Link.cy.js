/* eslint-disable no-undef */

describe('Check Page Elements:' , () => {
  it('Verify that the “パスワードの再設定” (Password Reset) heading is visible.' , () => {
    cy.contains('パスワードの再設定')
    cy.get('h2').should('be.visible')
  })
})