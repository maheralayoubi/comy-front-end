/* eslint-disable no-undef */
const name = "Hakam aldeen Alkhaddraa";
const category = "Frontend Developer";
const email = "hakamha8@gmail.com";
const password = "Hakamaldeen17";

const typeInInput = (id, value) => {
  return cy.get(id).should("exist").type(value);
};

describe("Check Page Elements:", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("Verify that the “新規アカウント登録” (New Account Registration) heading is visible.", () => {
    cy.contains("新規アカウント登録");
    cy.get("h2").should("be.visible");
  });

  it("Ensure the “名前” (Name) input field is present and accepts input.", () => {
    typeInInput("#name", name).should("have.value", name);
  });

  it("Ensure the “カテゴリー” (Category) input field is present and accepts input.", () => {
    typeInInput("#category", category).should("have.value", category);
  });

  it("Ensure the “メールアドレス” (Email Address) input field is present and accepts input.", () => {
    typeInInput("#email", email).should("have.value", email);
  });

  it("Verify that the two password fields (for password and re-enter password) are present and accept input.", () => {
    typeInInput(`#password`, password).should("have.value", password);
    typeInInput("#confirmPassword", password).should("have.value", password);
  });

  it("Verify the “新規アカウント登録” (Register) button is present and disabled initially.", () => {
    cy.get('button[type="submit"]').should("be.visible").should("be.disabled");
  });

  it("Verify the “ログインはこちら” (Go to Login) link is present and clickable.", () => {
    cy.get('a[href="/login"]').should("be.visible").click();
    cy.url().should("include", "/login");
  });
});

describe("Input Field Validation:", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("Leave the “名前” field empty, fill in other fields, and verify that the register button stays disabled.", () => {
    typeInInput("#category", category);
    typeInInput("#email", email);
    typeInInput("#password", password);
    typeInInput("#confirmPassword", password);
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("Try entering more than 30 characters into the “名前” field and ensure the form either prevents it.", () => {
    typeInInput("#name", "A".repeat(40))
      .invoke("val")
      .should("have.length.at.most", 30);
  });

  it("Leave the “カテゴリー” field empty, fill in other fields, and check if the register button stays disabled.", () => {
    typeInInput("#name", name);
    typeInInput("#category", category);
    typeInInput("#password", password);
    typeInInput("#confirmPassword", password);
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("Try entering more than 30 characters into the “カテゴリー” field and ensure the form prevents it.", () => {
    typeInInput("#category", "A".repeat(40))
      .invoke("val")
      .should("have.length.at.most", 30);
  });

  it("Should show a validation message when an invalid email format is entered.", () => {
    typeInInput("#name", name);
    typeInInput("#category", category);
    typeInInput("#email", "user@");
    typeInInput("#password", password);
    typeInInput("#confirmPassword", password);
    cy.get('button[type="submit"]').click();
    cy.get("#email").then(($input) => {
      const message = $input[0].validationMessage;
      expect(message).to.include("@");
    });
  });

  it("Enter different values into the password and re-enter password fields. The form should show an error message and prevent submission.", () => {
    typeInInput("#name", name);
    typeInInput("#category", category);
    typeInInput("#email", email);
    typeInInput("#password", password);
    typeInInput("#confirmPassword", "password123");
    cy.get('button[type="submit"]').click();
    cy.contains("パスワードが一致しません。").should("be.visible");
  });

  it("If the system enforces password strength, enter a weak password (e.g., less than 8 characters or no special characters) and verify that the appropriate error is displayed.", () => {
    typeInInput("#name", name);
    typeInInput("#category", category);
    typeInInput("#email", email);
    typeInInput("#password", "pass");
    typeInInput("#confirmPassword", "pass");
    cy.get('button[type="submit"]').click();
    cy.contains(
      "パスワードは8文字以上で、数字と大文字を含む必要があります。",
    ).should("be.visible");
  });
});

describe(" Password Visibility Toggle Functionality:", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("Verify that both the password fields (“パスワード” and “パスワードを再入力”) are masked by default.", () => {
    typeInInput("#password", password).should("have.attr", "type", "password");
    typeInInput("#confirmPassword", password).should(
      "have.attr",
      "type",
      "password",
    );
  });

  it("Click the visibility toggle icon and ensure that the password becomes visible (not masked) & Click the icon again to ensure the password is masked again.", () => {
    typeInInput("#password", password).should("have.attr", "type", "password");
    typeInInput("#confirmPassword", password).should(
      "have.attr",
      "type",
      "password",
    );
    cy.get(".password-toggle").first().click();
    cy.get("#password").should("have.attr", "type", "text");
    cy.get("#confirmPassword").should("have.attr", "type", "text");
    cy.get(".password-toggle").first().click();
    cy.get("#password").should("have.attr", "type", "password");
    cy.get("#confirmPassword").should("have.attr", "type", "password");
  });
});

describe("Form Validation and Submission:", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("Enter valid data in all fields and click the “新規アカウント登録” button. Ensure the form submits successfully and redirects to the appropriate page (e.g., a confirmation page or dashboard).", () => {
    cy.intercept("POST", "**/auth/register").as("registerRequest");
    typeInInput("#name", "John");
    typeInInput("#category", "Test");
    typeInInput("#email", "example15@example.com");
    typeInInput("#password", "Password123");
    typeInInput("#confirmPassword", "Password123");
    cy.get('button[type="submit"]').click();
    cy.wait("@registerRequest");
    cy.url().should("include", "mail-confirmation");
  });
});

describe("Register Button Loading/Success Feedback:", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("After clicking “新規アカウント登録”, ensure the button shows a loading state (optional) or some visual feedback.", () => {
    typeInInput("#name", name);
    typeInInput("#category", category);
    typeInInput("#email", email);
    typeInInput("#password", password);
    typeInInput("#confirmPassword", password);
    cy.get('button[type="submit"]').click();
    cy.get(".loader").should("be.visible");
  });
});

describe("Redirect to Login:", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("Click on “ログインはこちら” (Go to Login) and ensure it redirects the user to the login page.", () => {
    cy.get('a[href="/login"]').should("be.visible").click();
    cy.url().should("include", "login");
  });
});
