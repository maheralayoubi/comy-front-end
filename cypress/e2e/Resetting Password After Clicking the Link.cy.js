/* eslint-disable no-undef */
const newPassword = 'TestPassword123'
const typeInInput = (id, value) => {
  return cy.get(id).should('exist').type(value);
}

describe('Check Page Elements:' , () => {
  beforeEach(() => {
    cy.visit('/reset-password')
  })

  it('Verify that the “パスワードの再設定” (Password Reset) heading is visible.' , () => {
    cy.contains('パスワードの再設定')
    cy.get('h2').should('be.visible')
  })

  it('Ensure that both “新しいパスワード” (New Password) and “新しいパスワードを再入力” (Re-enter New Password) input fields are present and accept input.' , () => {
    typeInInput('#newPassword' , newPassword).should('have.value', newPassword)
    typeInInput("#confirmNewPassword" , newPassword).should('have.value', newPassword)
  })

  it('Verify that both password fields have the visibility toggle icon to show/hide the password.', () => {
    cy.get('.password-toggle').should("be.visible").should('exist')
  })
})