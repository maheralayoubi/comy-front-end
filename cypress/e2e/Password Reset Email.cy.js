/* eslint-disable no-undef */
const email = 'hakamha8@gmail.com';

// describe('Check Page Elements:' , () => {
//   beforeEach(() => {
//     cy.visit('/forgot-password')
//   })

//   it('Verify that the “新しいパスワード” heading is visible.' , () => {
//     cy.contains("新しいパスワード");
//     cy.get("h2").should("be.visible");
//   })

//   it('Ensure the “メールアドレス” input field is present and accepts input.' , () => {
//     cy.get('#email').should('exist').type(email).should('have.value', email)
//   })

//   it('Verify the “送信” button is visible and disabled initially.' , () => {
//     cy.get('button[type="submit"]').should('exist').should("be.disabled")
//   })
// })

describe('Email Input Validation:' , () => {
  beforeEach(() => {
    cy.visit('/forgot-password')
  })

  it('Leave the email field empty and verify that the “送信” button remains disabled.' , () => {
    cy.get('#email').clear()
    cy.get('button[type="submit"]').should('be.disabled')
  })

  it('Should show a validation message when an invalid email format is entered.' , () => {
    cy.get('#email').type('user@')
    cy.get('button[type="submit"]').click()
    cy.get("#email").then(($input) => {
      const message = $input[0].validationMessage;
      expect(message).to.include("@");
    });
  })
})