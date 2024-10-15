/* eslint-disable no-undef */
const email = "hakamha8@gmail.com";
const password = "Hakamaldeen17";

describe("Check Page Elements:", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Verify that the 'ログイン' heading is visible", () => {
    cy.contains("ログイン");
  });

  it("Ensure the 'メールアドレス' input field is present and accepts input.", () => {
    cy.get("#email")
      .should("exist")
      .type("example@mail.com")
      .should("have.value", "example@mail.com");
  });

  it("Ensure the 'パスワード' input field is present and accepts input.", () => {
    cy.get("#password")
      .should("exist")
      .type("password123")
      .should("have.value", "password123");
  });

  it("Verify that the password toggle (icon) exists and works to show/hide the password.", () => {
    cy.get("#password").type(password);
    cy.get("#password").should("have.attr", "type", "password");
    cy.get(".password-toggle").click();
    cy.get("#password").should("have.attr", "type", "text");
    cy.get("#password").invoke("val").should("equal", password);
    cy.get(".password-toggle").click();
    cy.get("#password").should("have.attr", "type", "password");
  });

  it("Ensure the 'パスワードを忘れた方はこちら' (Forgot Password) link is present and clickable.", () => {
    cy.get('a[href="/forgot-password"]').should("exist").click();
    cy.url().should("include", "/forgot-password");
  });

  it("Verify that the 'ログイン' (Login) button is present and disabled when fields are empty.", () => {
    cy.get("#email").clear();
    cy.get("#password").clear();
    cy.get('button[type="submit"]').should("be.disabled");

    // Fill in the email field and leave password empty
    cy.get("#email").type("hakam@gmail.com");
    cy.get("#password").clear();
    cy.get('button[type="submit"]').should("be.disabled");

    // Fill in the password field and leave email empty
    cy.get("#email").clear();
    cy.get("#password").type("somepassword");
    cy.get('button[type="submit"]').should("be.disabled");

    // Fill in both fields to enable the button
    cy.get("#email").type("hakam@gmail.com");
    cy.get("#password").type("somepassword");
    cy.get('button[type="submit"]').should("not.be.disabled");
  });

  it("Ensure the '新規登録はこちら' (Register Here) link is present and clickable.", () => {
    cy.get('a[href="/register"]').should("exist").click();
    cy.url().should("include", "/register");
  });
});

describe("Input Validation:", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Should show a validation message when an invalid email format is entered.", () => {
    cy.get("#email").type("user@");
    cy.get("#password").type("somepassword");
    cy.get('button[type="submit"]').click();
    cy.get("#email").then(($input) => {
      const message = $input[0].validationMessage;
      expect(message).to.include("@");
    });
  });

  it("Should show error messages for an invalid email format and password.", () => {
    cy.get("#email").type("user@");
    cy.get("#password").type("password123");
    cy.get('button[type="submit"]').click();
    cy.get("#email").then(($input) => {
      const message = $input[0].validationMessage;
      expect(message).to.include("@");
    });
  });

  it("Enter a valid email and incorrect password. Submit the form and check that an appropriate error message is displayed.", () => {
    cy.get("#email").type(email);
    cy.get("#password").type("password123");
    cy.get('button[type="submit"]').click();
    cy.contains("認証情報が無効です。");
  });
});

describe("Password Toggle Functionality:", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Verify that the password is hidden (masked) when first entered.", () => {
    cy.get("#password").type(password);
    cy.get("#password").should("have.attr", "type", "password");
  });

  it("Click the toggle icon and ensure the password is visible (not masked).", () => {
    cy.get("#password").type(password);
    cy.get(".password-toggle").click();
    cy.get("#password").should("have.attr", "type", "text");
  });

  it("Click again to ensure the password is masked.", () => {
    cy.get("#password").type(password);
    cy.get(".password-toggle").click();
    cy.get("#password").should("have.attr", "type", "text");
    cy.get(".password-toggle").click();
    cy.get("#password").should("have.attr", "type", "password");
  });
});

describe("Forgot Password Link:", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Click on the “パスワードを忘れた方はこちら” (Forgot Password) link and verify redirection.", () => {
    cy.get('a[href="/forgot-password"]').should("exist").click();
    cy.url().should("include", "/forgot-password");
  });

  it("Ensure the password recovery page elements (e.g., email input, submit button) are functional.", () => {
    cy.get('a[href="/forgot-password"]').click();
    cy.url().should("include", "/forgot-password");

    cy.get("#email").should("exist").type(email).should("have.value", email);

    cy.get('button[type="submit"]').should("exist").should("not.be.disabled");
  });
});

describe("Register Here Link:", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Click on the “新規登録はこちら” (Register Here) link and verify redirection to the registration page.", () => {
    cy.get('a[href="/register"]').click();
    cy.url().should("include", "/register");
  });
});

describe("API Responses:", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("Mock a successful login response and verify user redirection and token handling.", () => {
    cy.intercept("POST", "http://localhost:5000/auth/login", {
      statusCode: 200,
      body: { token: "mocked-jwt-token" },
    }).as("loginRequest");
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("button[type=submit]").click();
    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);
    cy.url().should("include", "/profile");
  });
  it("Mock an API response for a failed login (e.g., invalid email/password) and ensure the correct error message is displayed to the user.", () => {
    // Intercept the API request and mock a failed response with a 400 status code
    cy.intercept("POST", "http://localhost:5000/auth/login", {
      statusCode: 400,
      body: {
        message: "認証情報が無効です。",
      },
    }).as("loginRequest");
    cy.visit("/login");
    cy.get("#email").type(email);
    cy.get("#password").type("password123");
    cy.get("button[type=submit]").click();
    cy.wait("@loginRequest").its("response.statusCode").should("eq", 400);
    cy.contains("認証情報が無効です。").should("be.visible");
  });
});

describe("Responsive Design Testing:", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  const viewports = [
    { device: "mobile", width: 375, height: 667 },
    { device: "tablet", width: 768, height: 1024 },
    { device: "desktop", width: 1280, height: 800 },
  ];
  viewports.forEach(({ device, width, height }) => {
    it(`should display and align login form elements correctly on ${device} (${width}x${height})`, () => {
      cy.viewport(width, height);

      // Verify that the login form elements are visible
      cy.get("#email").should("be.visible");
      cy.get("#password").should("be.visible");
      cy.get('button[type="submit"]').should("be.visible");

      // Check for proper alignment (e.g., centered)
      cy.get('button[type="submit"]').should(
        "have.css",
        "text-align",
        "center",
      );

      // Optionally, check the layout of elements
      cy.get("#email").invoke("outerWidth").should("be.gte", 150);
      cy.get("#password").invoke("outerWidth").should("be.gte", 150);
      cy.get('button[type="submit"]')
        .invoke("outerWidth")
        .should("be.gte", 100);

      // Verify functionality - fill form and ensure the button enables
      cy.get("#email").type(email);
      cy.get("#password").type(password);
      cy.get('button[type="submit"]').should("not.be.disabled");
      // Verify functionality - empty email or password and ensure the button is disabled
      cy.get("#email").type(email);
      cy.get("#password").clear();
      cy.get('button[type="submit"]').should("be.disabled");
    });
  });
});
