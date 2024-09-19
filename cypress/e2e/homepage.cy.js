// describe('Homepage', () => {
//     beforeEach(() => {
//       cy.visit('/');
//     });
  
//     it('should display the main heading', () => {
//       cy.get('h1').should('contain', 'Welcome to My React App');
//     });
  
//     it('should navigate to About page', () => {
//       cy.get('nav').contains('About').click();
//       cy.url().should('include', '/about');
//     });
//   });



// describe('Home Page', () => {
//   it('should load successfully', () => {
//     cy.visit('/');
//     cy.contains('This is the Top Page').should('be.visible');
//   });
// });


// describe('Login', () => {
//   it('allows a user to log in', () => {
//     cy.visit('/login');
//     cy.fixture('user').then((user) => {
//       cy.get('#email').type(user.email);
//       cy.get('#password').type(user.password);
//       cy.get('form').submit();
//     });
//     cy.url().should('include', '/dashboard');
//   });
// });


describe('Registration Form', () => {
  beforeEach(() => {
    cy.visit('/register'); // Assuming the form is located at the "/register" route
  });

  it('should render the registration form correctly', () => {
    // Check the presence of all input fields and submit button
    cy.get('input#name').should('exist').and('have.attr', 'placeholder', '名前を入力');
    cy.get('input#category').should('exist').and('have.attr', 'placeholder', 'カテゴリーを入力');
    cy.get('input#email').should('exist').and('have.attr', 'placeholder', 'メールアドレスを入力');
    cy.get('input#password').should('exist').and('have.attr', 'placeholder', 'パスワードを入力');
    cy.get('input#confirmPassword').should('exist').and('have.attr', 'placeholder', 'パスワードを再入力');
    cy.get('button[type="submit"]').should('be.disabled'); // Submit button should be disabled initially
  });

  it('should enable the submit button when all fields are filled', () => {
    cy.get('input#name').type('Test User');
    cy.get('input#category').type('Tester');
    cy.get('input#email').type('ghaithalzein055@gmail.com');
    cy.get('input#password').type('password123');
    cy.get('input#confirmPassword').type('password123');

    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('should show an error message when passwords do not match', () => {
    cy.get('input#name').type('Test User');
    cy.get('input#category').type('Tester');
    cy.get('input#email').type('ghaithalzein055@gmail.com');
    cy.get('input#password').type('password123');
    cy.get('input#confirmPassword').type('differentPassword');

    cy.get('button[type="submit"]').click();

    // Check for the password mismatch error
    cy.get('p').contains('Passwords do not match.').should('be.visible');
  });

  it('should toggle password visibility', () => {
    cy.get('input#password').type('Password123');
    cy.get('input#password').should('have.attr', 'type', 'password');

    // Click to toggle visibility
    cy.get('.password-toggle').first().click();

    cy.get('input#password').should('have.attr', 'type', 'text');

    // Click again to hide the password
    cy.get('.password-toggle').first().click();

    cy.get('input#password').should('have.attr', 'type', 'password');
  });

  it('should show an error message on server error (500)', () => {
    cy.intercept('POST', '/auth/register', {
      statusCode: 500,
      body: { message: 'Something went wrong. Please try again.' },
    }).as('registerUserError');

    cy.get('input#name').type('Test User');
    cy.get('input#category').type('Tester');
    cy.get('input#email').type('ghaithalzein055@gmail.com');
    cy.get('input#password').type('Password123');
    cy.get('input#confirmPassword').type('Password123');

    cy.get('button[type="submit"]').click();

    // Wait for the API call
    cy.wait('@registerUserError');

    // Check for the error message
    cy.get('p').contains('Something went wrong. Please try again.').should('be.visible');
  });

  it('should disable the submit button if required fields are empty', () => {
    cy.get('input#name').type('Test User');
    cy.get('input#category').type('Tester');
    cy.get('input#email').clear(); // Clear email to test the button disabled state
    cy.get('input#password').type('Password123');
    cy.get('input#confirmPassword').type('Password123');

    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should navigate to mail confirmation page on successful registration', () => {
    // cy.intercept('POST', '/auth/register', { statusCode: 201 }).as('registerUser');

    cy.get('input#name').type('Test User');
    cy.get('input#category').type('Tester');
    cy.get('input#email').type('ghaithalzein055@gmail.com');
    cy.get('input#password').type('Password123');
    cy.get('input#confirmPassword').type('Password123');

    cy.get('button[type="submit"]').click();

    // Wait for the API call
    // cy.wait('@registerUser');

    // Confirm that the user is navigated to mail confirmation page
    cy.url().should('include', '/mail-confirmation');
  });
  
});
