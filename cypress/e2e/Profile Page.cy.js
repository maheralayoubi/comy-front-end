/* eslint-disable no-undef */
describe('Form Initialization:', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('#email').type('hakamha8@gmail.com')
    cy.get('#password').type('Hakamaldeen17')
    cy.get('button[type="submit"]').click()
    cy.wait(10000)
    cy.url().should('include', 'profile')
  })

  it('Verify that the page displays default text ("データがありません" or "No data available") in sections where no data has been added.', () => {
    // Function to check for <span> text
    const checkForDefaultText = (selector) => {
      cy.get(selector, { multiple: true }).each(($content) => {
        cy.wrap($content).then(($el) => {
          if ($el.find('span').length > 0) {
            // Assert that <span> contains default text
            cy.wrap($el).find('span').should('contain.text', 'データがありません')
          }
        })
      })
    }

    // Check each section for default or backend text
    checkForDefaultText('.cardContent')
    checkForDefaultText('.section2Container p')
  })
})
