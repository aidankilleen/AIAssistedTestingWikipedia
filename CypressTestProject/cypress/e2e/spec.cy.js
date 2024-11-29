describe('Cypress Kitchen Sink - Get Link Test', () => {

  beforeEach(() => {
    cy.log("beforeEach() called - Clearing local storage");
    
    // Clear local storage to ensure no leftover items from previous tests
    cy.visit('https://example.cypress.io/todo', {
        onBeforeLoad: (win) => {
            win.localStorage.clear(); // Clear local storage before loading the app
        }
    });
  });


  it('Navigates to the "Get" link and verifies the button with label "Button"', () => {
      // Visit the Cypress Kitchen Sink Test Page
      cy.visit('https://example.cypress.io/');

      // Click on the "Get" link in the navigation
      cy.contains('get').click();

      // Verify that a button with the label "Button" is present on the page
      cy.contains('button', 'Button').should('be.visible');
  });
  it('Verifies any unordered list on the page contains the specified elements', () => {
    // Visit the Cypress Kitchen Sink Test Page
    cy.visit('https://example.cypress.io/');

    // Click on the "contains" link in the navigation
    cy.contains('contains').click();

    // Check if any <ul> on the page contains the required items
    cy.get('ul').each(($ul) => {
        const items = ['apples', 'oranges', 'bananas', 'more apples'];

        // Verify that all required items are in the current unordered list
        const matches = items.every(item => 
            Cypress.$($ul).find(`li:contains(${item})`).length > 0
        );

        if (matches) {
            cy.wrap($ul).should('exist'); // Confirm the list exists
            return false; // Exit the loop early if all items are found
        }
    }).then((listFound) => {
        if (!listFound) {
            throw new Error('No unordered list found containing all specified items.');
        }
    });
  });

  it('Selects "Actions" from the Commands dropdown and types an email in the input field', () => {
    // Visit the Cypress Kitchen Sink Test Page
    cy.visit('https://example.cypress.io/');

    // Open the "Commands" dropdown and select "Actions"
    cy.contains('Commands').click();
    cy.contains('Actions').click();

    // Find the email input field and type an email address
    cy.get('input[type="email"]').type('test@gmail.com');
  });

  it('Adds a new todo to the list', () => {
    // Visit the ToDo application
    cy.visit('https://example.cypress.io/todo');

    // Define the new todo item text
    const newTodo = 'Learn Cypress';

    // Find the input field and type the new todo item, then press Enter
    cy.get('.new-todo').type(`${newTodo}{enter}`);

    // Verify the new todo item has been added to the list
    cy.get('.todo-list').should('contain', newTodo);
  });

  it('Gets the h1 element on the ToDo page', () => {
    // Visit the ToDo application
    cy.visit('https://example.cypress.io/todo');

    // Get the h1 element and verify its content
    cy.get('h1').should('be.visible').and('contain', 'todos');
  });

  it('Adds 3 items, marks them complete, and verifies no active items', () => {
    // Define the todo items to add
    const todos = ['Get Milk', 'Buy Newspaper', 'Collect Kids'];

    // Add each todo item to the list
    todos.forEach((todo) => {
        cy.get('.new-todo').type(`${todo}{enter}`);
    });

    // Mark all items as complete
    cy.get('.todo-list li').each(($el) => {
        cy.wrap($el).find('.toggle').click(); // Click the checkbox to mark as complete
    });

    // Click the "Active" filter
    cy.contains('Active').click();

    // Verify that no items are shown in the active list
    cy.get('.todo-list li').should('have.length', 0);
  });

});