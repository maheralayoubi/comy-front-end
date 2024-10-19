/* eslint-disable no-undef */
const newPassword = 'TestPassword123'
const typeInInput = (id, value) => {
  return cy.get(id).should('exist').type(value);
}

// describe('Check Page Elements:' , () => {
//   beforeEach(() => {
//     cy.visit('/reset-password')
//   })

//   it('Verify that the “パスワードの再設定” (Password Reset) heading is visible.' , () => {
//     cy.contains('パスワードの再設定')
//     cy.get('h2').should('be.visible')
//   })

//   it('Ensure that both “新しいパスワード” (New Password) and “新しいパスワードを再入力” (Re-enter New Password) input fields are present and accept input.' , () => {
//     typeInInput('#newPassword' , newPassword).should('have.value', newPassword)
//     typeInInput("#confirmNewPassword" , newPassword).should('have.value', newPassword)
//   })

//   it('Verify that both password fields have the visibility toggle icon to show/hide the password.', () => {
//     cy.get('.password-toggle').should("be.visible").should('exist')
//   })

//   it('Verify that the “パスワードを更新” (Update Password) button is visible and disabled initially.' , () => {
//     cy.get('button[type="submit"]').should("be.visible").should('exist').should('be.disabled')
//   })
// })

// describe('Password Field Validation:' ,() =>{
//   beforeEach(() => {
//     cy.visit('/reset-password')
//   })

//   it('Leave both password fields empty and check that the “パスワードを更新” button is disabled.' , () => {
//     cy.get('#newPassword').clear()
//     cy.get('#confirmNewPassword').clear()
//     cy.get('button[type="submit"]').should('be.disabled')
//   })

//   it('Enter a password shorter than the minimum required length (e.g., less than 8 characters) and verify that an error message is shown.' , () => {
//     typeInInput('#newPassword', 'fdfd')
//     typeInInput('#confirmNewPassword', 'fdfd')
//     cy.get('button[type="submit"]').click()
//     cy.contains('パスワードは8文字以上で、数字と大文字を含む必要があります。')
//   })

//   it('Enter different values in the “新しいパスワード” and “新しいパスワードを再入力” fields and verify that an error message is displayed.' , () => {
//     typeInInput('#newPassword', newPassword)
//     typeInInput('#confirmNewPassword', "password123")
//     cy.get('button[type="submit"]').click()
//     cy.contains("パスワードが一致しません。")
// })
// })

describe('Password Visibility Toggle:' , () => {
  beforeEach(() => {
    cy.visit('/reset-password')
  })

  it('Verify that both password fields are masked by default.' , () => {
    typeInInput('#newPassword', newPassword).should("have.attr", "type", "password");
    typeInInput('#confirmNewPassword', newPassword).should("have.attr", "type", "password");
  })

  it("Click the visibility toggle icon and ensure that the password becomes visible (not masked) & Click the icon again to ensure the password is masked again.", () => {
    typeInInput('#newPassword', newPassword).should("have.attr", "type", "password");
    typeInInput('#confirmNewPassword', newPassword).should("have.attr", "type", "password");
    cy.get(".password-toggle").first().click();
    cy.get("#newPassword").should("have.attr", "type", "text");
    cy.get("#confirmNewPassword").should("have.attr", "type", "text");
    cy.get(".password-toggle").first().click();
    cy.get("#newPassword").should("have.attr", "type", "password");
    cy.get("#confirmNewPassword").should("have.attr", "type", "password");
  });
})