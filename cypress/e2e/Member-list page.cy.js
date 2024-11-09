/* eslint-disable no-undef */
describe('Page Load and Basic Structure Verification:', () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get("#email").type("hakamha8@gmail.com");
    cy.get("#password").type("Hakamaldeen17");
    cy.get('button[type="submit"]').click();
    cy.wait(10000);
    cy.visit("/member-list");
  })
  
  it('Verify that the member-list page loads successfully.' , () => {
    cy.visit("/member-list");
    cy.url().should("include", "member-list");
  })

  it('Confirm the page contains the heading “メンバー一覧”.', () => {
    cy.get('h2').should('be.visible').and('contain', 'メンバー一覧');
  });
})
