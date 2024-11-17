/* eslint-disable no-undef */
describe("Test if the page renders correctly:", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#email").type("hakamha8@gmail.com");
    cy.get("#password").type("Hakamaldeen17");
    cy.get('button[type="submit"]').click();
    cy.wait(5000).visit("/stripe-payment");
  });

  it("Check if the StripeCheckoutButton component is rendered with the correct text and button.", () => {
    cy.get(".stripe-button").should("exist");
  });
});

describe("Stripe Checkout Redirection", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#email").type("hakamha8@gmail.com");
    cy.get("#password").type("Hakamaldeen17");
    cy.get('button[type="submit"]').click();
    cy.wait(5000).visit("/stripe-payment");
  });

  it("should attempt to redirect to Stripe on successful checkout session creation", () => {
    cy.get(".stripe-button").click();
    cy.url().should("include", "stripe");
    cy.go("back");
  });
});
