/* eslint-disable no-undef */
const newPassword = "TestPassword123";
const typeInInput = (id, value) => {
  return cy.get(id).should("exist").type(value);
};

describe("Check Page Elements:", () => {
  beforeEach(() => {
    cy.visit("/reset-password");
  });

  it("Verify that the “パスワードの再設定” (Password Reset) heading is visible.", () => {
    cy.contains("パスワードの再設定");
    cy.get("h2").should("be.visible");
  });

  it("Ensure that both “新しいパスワード” (New Password) and “新しいパスワードを再入力” (Re-enter New Password) input fields are present and accept input.", () => {
    typeInInput("#newPassword", newPassword).should("have.value", newPassword);
    typeInInput("#confirmNewPassword", newPassword).should(
      "have.value",
      newPassword,
    );
  });

  it("Verify that both password fields have the visibility toggle icon to show/hide the password.", () => {
    cy.get(".password-toggle").should("be.visible").should("exist");
  });

  it("Verify that the “パスワードを更新” (Update Password) button is visible and disabled initially.", () => {
    cy.get('button[type="submit"]')
      .should("be.visible")
      .should("exist")
      .should("be.disabled");
  });
});

describe("Password Field Validation:", () => {
  beforeEach(() => {
    cy.visit("/reset-password");
  });

  it("Leave both password fields empty and check that the “パスワードを更新” button is disabled.", () => {
    cy.get("#newPassword").clear();
    cy.get("#confirmNewPassword").clear();
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("Enter a password shorter than the minimum required length (e.g., less than 8 characters) and verify that an error message is shown.", () => {
    typeInInput("#newPassword", "fdfd");
    typeInInput("#confirmNewPassword", "fdfd");
    cy.get('button[type="submit"]').click();
    cy.contains("パスワードは8文字以上で、数字と大文字を含む必要があります。");
  });

  it("Enter different values in the “新しいパスワード” and “新しいパスワードを再入力” fields and verify that an error message is displayed.", () => {
    typeInInput("#newPassword", newPassword);
    typeInInput("#confirmNewPassword", "password123");
    cy.get('button[type="submit"]').click();
    cy.contains("パスワードが一致しません。");
  });
});

describe("Password Visibility Toggle:", () => {
  beforeEach(() => {
    cy.visit("/reset-password");
  });

  it("Verify that both password fields are masked by default.", () => {
    typeInInput("#newPassword", newPassword).should(
      "have.attr",
      "type",
      "text",
    );
    typeInInput("#confirmNewPassword", newPassword).should(
      "have.attr",
      "type",
      "text",
    );
  });

  it("Click the visibility toggle icon and ensure that the password becomes visible (not masked) & Click the icon again to ensure the password is masked again.", () => {
    typeInInput("#newPassword", newPassword).should(
      "have.attr",
      "type",
      "text",
    );
    typeInInput("#confirmNewPassword", newPassword).should(
      "have.attr",
      "type",
      "text",
    );
    cy.get(".password-toggle").first().click();
    cy.get("#newPassword").should("have.attr", "type", "password");
    cy.get("#confirmNewPassword").should("have.attr", "type", "password");
    cy.get(".password-toggle").first().click();
    cy.get("#newPassword").should("have.attr", "type", "text");
    cy.get("#confirmNewPassword").should("have.attr", "type", "text");
  });
});

describe("Enter email and open new password page", () => {
  const inboxId = "a82c05e5-6e94-466a-9da9-10d67413c9cd";
  const emailAddress = `${inboxId}@mailslurp.net`;
  const apiKey =
    "21a71670144030ef179cbc828166939a293da983cc6326d16bc863c8d8303f59";
  beforeEach(() => {
    cy.visit("/register");
    typeInInput("#name", "John");
    typeInInput("#category", "backend developer");
    typeInInput("#email", emailAddress);
    typeInInput("#password", "Password123");
    typeInInput("#confirmPassword", "Password123");
    cy.get('button[type="submit"]').click();
    cy.wait(15000);
  });
  it("should click to forgot password, enter a new password, and log in", () => {
    let lastCheckedAt = new Date().toISOString();
    const typeInInput = (selector, value) => {
      cy.get(selector).clear().type(value);
    };
    const checkInboxForEmail = () => {
      cy.request({
        method: "GET",
        url: `https://api.mailslurp.com/inboxes/${inboxId}/emails`,
        headers: { "x-api-key": apiKey },
      }).then((response) => {
        const newEmails = response.body.filter(
          (email) => new Date(email.createdAt) > new Date(lastCheckedAt),
        );
        if (newEmails.length > 0) {
          const latestEmail = newEmails[0];
          const emailId = latestEmail.id;
          cy.request({
            method: "GET",
            url: `https://api.mailslurp.com/emails/${emailId}`,
            headers: { "x-api-key": apiKey },
          }).then((emailResponse) => {
            const emailBody = emailResponse.body.body;
            const parser = new DOMParser();
            const doc = parser.parseFromString(emailBody, "text/html");
            const confirmationLink = doc.querySelector('a[href*="token"]').href;
            cy.visit(confirmationLink);
            cy.url().then((currentUrl) => {
              if (currentUrl === confirmationLink) {
                typeInInput("#newPassword", "helloWord12");
                typeInInput("#confirmNewPassword", "helloWord12");
                cy.get('button[type="submit"]').click();
                cy.url().should("include", "login");
                typeInInput("#email", emailAddress);
                typeInInput("#password", "helloWord12");
                cy.get('button[type="submit"]').click();
              }
            });
          });
        } else {
          cy.wait(5000);
          checkInboxForEmail();
        }
      });
    };
    cy.visit("/login");
    cy.visit("/forgot-password");
    cy.get("input#email").type(emailAddress);
    cy.get('button[type="submit"]').click();
    checkInboxForEmail();
  });
});
