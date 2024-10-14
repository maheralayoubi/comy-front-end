/* eslint-disable no-undef */
const email = "hakamha8@gmail.com";
const password = "Hakamaldeen17";

// describe("Check Page Elements:", () => {
//   beforeEach(() => {
//     cy.visit("/login");
//   });

//   it("Verify that the 'ログイン' heading is visible", () => {
//     cy.contains("ログイン");
//   });

//   it("Ensure the 'メールアドレス' input field is present and accepts input.", () => {
//     cy.get("#email")
//       .should("exist")
//       .type("example@mail.com")
//       .should("have.value", "example@mail.com");
//   });

//   it("Ensure the 'パスワード' input field is present and accepts input.", () => {
//     cy.get("#password")
//       .should("exist")
//       .type("password123")
//       .should("have.value", "password123");
//   });

//   it("Verify that the password toggle (icon) exists and works to show/hide the password.", () => {
//     cy.get("#password").type(password);
//     cy.get("#password").should("have.attr", "type", "password");
//     cy.get(".password-toggle").click();
//     cy.get("#password").should("have.attr", "type", "text");
//     cy.get("#password").invoke("val").should("equal", password);
//     cy.get(".password-toggle").click();
//     cy.get("#password").should("have.attr", "type", "password");
//   });

//   it("Ensure the 'パスワードを忘れた方はこちら' (Forgot Password) link is present and clickable.", () => {
//     cy.get('a[href="/forgot-password"]').should("exist").click();
//     cy.url().should("include", "/forgot-password");
//   });

//   it("Verify that the 'ログイン' (Login) button is present and disabled when fields are empty.", () => {
//     cy.get("#email").clear();
//     cy.get("#password").clear();
//     cy.get('button[type="submit"]').should("be.disabled");

//     // Fill in the email field and leave password empty
//     cy.get("#email").type("hakam@gmail.com");
//     cy.get("#password").clear();
//     cy.get('button[type="submit"]').should("be.disabled");

//     // Fill in the password field and leave email empty
//     cy.get("#email").clear();
//     cy.get("#password").type("somepassword");
//     cy.get('button[type="submit"]').should("be.disabled");

//     // Fill in both fields to enable the button
//     cy.get("#email").type("hakam@gmail.com");
//     cy.get("#password").type("somepassword");
//     cy.get('button[type="submit"]').should("not.be.disabled");
//   });

//   it("Ensure the '新規登録はこちら' (Register Here) link is present and clickable.", () => {
//     cy.get('a[href="/register"]').should("exist").click();
//     cy.url().should("include", "/register");
//   });
// });

// describe("Input Validation:", () => {
//   beforeEach(() => {
//     cy.visit("/login");
//   });

//   it("Ensure the login button remains disabled if both fields are empty.", () => {
//     cy.get("#email").clear();
//     cy.get("#password").clear();
//     cy.get('button[type="submit"]').should("be.disabled");
//   });

//   it("Should show a validation message when an invalid email format is entered.", () => {
//     cy.get("#email").type("user@");
//     cy.get("#password").type("somepassword");
//     cy.get('button[type="submit"]').click();
//     cy.get("#email").then(($input) => {
//       const message = $input[0].validationMessage;
//       expect(message).to.include("@");
//     });
//   });

//   it("Enter a valid email and leave the password empty. The login button should remain disabled.", () => {
//     cy.get("#email").type(email);
//     cy.get('button[type="submit"]').should("be.disabled");
//   });

//   it("Should show error messages for an invalid email format and password.", () => {
//     cy.get("#email").type("user@");
//     cy.get("#password").type("password123");
//     cy.get('button[type="submit"]').click();
//     cy.get("#email").then(($input) => {
//       const message = $input[0].validationMessage;
//       expect(message).to.include("@");
//     });
//   });

//   it("Enter a valid email and leave the password field empty. Ensure the login button stays disabled.", () => {
//     cy.get("#password").type("password123");
//     cy.get('button[type="submit"]').should("be.disabled");
//   });

//   it("Enter a valid email and incorrect password. Submit the form and check that an appropriate error message is displayed.", () => {
//     cy.get("#email").type(email);
//     cy.get("#password").type("password123");
//     cy.get('button[type="submit"]').click();
//     cy.contains("認証情報が無効です。");
//   });
// });

// describe("Password Toggle Functionality:", () => {
//   beforeEach(() => {
//     cy.visit("/login");
//   });

//   it("Verify that the password is hidden (masked) when first entered.", () => {
//     cy.get("#password").type(password);
//     cy.get("#password").should("have.attr", "type", "password");
//   });

//   it("Click the toggle icon and ensure the password is visible (not masked).", () => {
//     cy.get("#password").type(password);
//     cy.get(".password-toggle").click();
//     cy.get("#password").should("have.attr", "type", "text");
//   });

//   it("Click again to ensure the password is masked.", () => {
//     cy.get("#password").type(password);
//     cy.get(".password-toggle").click();
//     cy.get("#password").should("have.attr", "type", "text");
//     cy.get(".password-toggle").click();
//     cy.get("#password").should("have.attr", "type", "password");
//   });
// });

// describe("Login Functionality:", () => {
//   beforeEach(() => {
//     cy.visit("/login");
//   });

//   it("Input a valid email and correct password, click 'ログイン', and verify successful redirection to the Profile.", () => {
//     cy.get("#email").type(email);
//     cy.get("#password").type(password);
//     cy.get("button[type=submit]").click();
//     cy.url().should("include", "profile");
//   });

//   it("Enter a valid email and incorrect password, click 'ログイン', and check that an error message (e.g., 'Invalid credentials') appears.", () => {
//     cy.get("#email").type(email);
//     cy.get("#password").type("password123");
//     cy.get("button[type=submit]").click();
//     cy.contains("認証情報が無効です。");
//   });

//   it("Leave either the email or password empty and try to log in. Ensure the login button remains disabled.", () => {
//     cy.get("#email").type(email);
//     cy.get("#password").clear();
//     cy.get("button[type=submit]").should("be.disabled");
//   });
// });

// describe('Forgot Password Link:', () => {
//   beforeEach(() => {
//     cy.visit('/login');
//   });

//   it('Click on the “パスワードを忘れた方はこちら” (Forgot Password) link and verify redirection.', () => {
//     cy.get('a[href="/forgot-password"]').should("exist").click();
//     cy.url().should("include", "/forgot-password");
//   });

//   it('Ensure the password recovery page elements (e.g., email input, submit button) are functional.', () => {
//     cy.get('a[href="/forgot-password"]').click();
//     cy.url().should("include", "/forgot-password");

//     cy.get('#email')
//       .should('exist')
//       .type(email)
//       .should('have.value', email);

//     cy.get('button[type="submit"]').should('exist').should('not.be.disabled');
//   });
// });

// describe('Register Here Link:', () => {
//   beforeEach(() => {
//     cy.visit('/login');
//   });

//   it('Click on the “新規登録はこちら” (Register Here) link and verify redirection to the registration page.', () => {
//     cy.get('a[href="/register"]').click();
//     cy.url().should("include", "/register");
//   });
// });

describe('API Responses:', () => {
  beforeEach(() => {
    cy.visit('/login');
  })
  it('Mock a successful login response and verify user redirection and token handling.', () => {
    cy.intercept('POST', 'http://localhost:5000/auth/login', {
      statusCode: 200,
      body: { token: 'mocked-jwt-token' }
    }).as('loginRequest');
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button[type=submit]').click();
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/profile');
  });
} )