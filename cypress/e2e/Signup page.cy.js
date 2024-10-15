/* eslint-disable no-undef */
const name = 'Hakam aldeen Alkhaddraa'
const category = "Frontend Developer"
const email = "hakamha8@gmail.com";
const password = 'Hakamaldeen17'

const typeInInput = (id,value) => {
  return cy.get(id).should('exist').type(value)
}

// describe('Check Page Elements:' , () => {
//   beforeEach(() => {
//     cy.visit('/register')
//   })

//   it('Verify that the “新規アカウント登録” (New Account Registration) heading is visible.' , () => {
//     cy.contains("新規アカウント登録");
//     cy.get('h2').should('be.visible');
//   })

//   it('Ensure the “名前” (Name) input field is present and accepts input.' , () => {
//     typeInInput('#name',name).should('have.value', name)
//   })

//   it('Ensure the “カテゴリー” (Category) input field is present and accepts input.' , () => {
//     typeInInput('#category',category).should('have.value', category)
//   })

//   it('Ensure the “メールアドレス” (Email Address) input field is present and accepts input.' , () => {
//     typeInInput('#email',email).should('have.value', email);
//   })

//   it('Verify that the two password fields (for password and re-enter password) are present and accept input.' , () => {
//     typeInInput(`#password`, password).should('have.value', password)
//     typeInInput('#confirmPassword', password).should('have.value', password)
//   })

//   it('Verify the “新規アカウント登録” (Register) button is present and disabled initially.' , () => {
//     cy.get('button[type="submit"]').should('be.visible').should('be.disabled')
//   })

//   it('Verify the “ログインはこちら” (Go to Login) link is present and clickable.' , () => {
//     cy.get('a[href="/login"]').should('be.visible').click();
//     cy.url().should("include", '/login')
//   })
// })

describe('Input Field Validation:' , () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  it('Leave the “名前” field empty, fill in other fields, and verify that the register button stays disabled.' , () => {
    typeInInput('#category' , category);
    typeInInput('#email' , email);
    typeInInput('#password' , password);
    typeInInput('#confirmPassword' , password)
    cy.get('button[type="submit"]').should('be.disabled')
  })

  it('Try entering more than 30 characters into the “名前” field and ensure the form either prevents it.', () => {
    typeInInput('#name', "A".repeat(40)).invoke('val').should('have.length.at.most', 30)
  })

  it('Leave the “カテゴリー” field empty, fill in other fields, and check if the register button stays disabled.', () => {
    typeInInput('#name' , name);
    typeInInput('#category' , category);
    typeInInput('#password' , password);
    typeInInput('#confirmPassword' , password)
    cy.get('button[type="submit"]').should('be.disabled')
  })
})