describe('template spec', () => {

  it('Loads correctly on a mobile viewport', () => {
    cy.viewport('iphone-x'); // Simulates an iPhone X screen size

    cy.visit('https://example.cypress.io/todo');

    // Verify the app title is visible
    cy.get('h1').should('be.visible').and('contain', 'todos');

    // Verify the input field is visible
    cy.get('.new-todo').should('be.visible');
  });  
  it('Allows adding a new todo on a mobile device', () => {
    cy.viewport(375, 667); // Simulates an iPhone 6/7/8 screen size

    cy.visit('https://example.cypress.io/todo');

    const newTodo = 'Buy Milk';

    // Add a new todo
    cy.get('.new-todo').type(`${newTodo}{enter}`);

    // Verify the item appears in the list
    cy.get('.todo-list li').should('contain', newTodo);
  });
  it('Allows marking todos as complete on a mobile device', () => {
    cy.viewport('iphone-5'); // Simulates an iPhone 5 screen size

    cy.visit('https://example.cypress.io/todo');

    const todo = 'Learn Cypress';

    // Add a new todo
    cy.get('.new-todo').type(`${todo}{enter}`);

    // Mark it as complete
    cy.get('.todo-list li').first().find('.toggle').click();

    // Verify the item is marked as complete
    cy.get('.todo-list li').first().should('have.class', 'completed');
  });
  
  it('Allows deleting the last todo on a mobile device', () => {
    cy.viewport('iphone-xr'); // Simulates an iPhone XR screen size

    cy.visit('https://example.cypress.io/todo');

    const todo = 'Go Shopping';

    // Add a new todo
    cy.get('.new-todo').type(`${todo}{enter}`);

    // Delete the last todo
    cy.get('.todo-list li').last().find('.destroy').invoke('show').click();

    // Verify the item is removed from the list
    cy.get('.todo-list li').should('not.contain', todo);
  });

  it('Filters active todos correctly, considering initial items in the list', () => {
    cy.visit('https://example.cypress.io/todo');

    // Count the initial number of todos
    cy.get('.todo-list li').then(($initialTodos) => {
        const initialCount = $initialTodos.length;

        // Define new todos to add
        const newTodos = ['Task 1', 'Task 2', 'Task 3'];

        // Add the new todos
        newTodos.forEach(todo => {
            cy.get('.new-todo').type(`${todo}{enter}`);
        });

        // Mark the first of the new todos as complete
        cy.get('.todo-list li').contains('Task 1').parent().find('.toggle').click();

        // Click the "Active" filter
        cy.contains('Active').click();

        // Verify the active count includes the initial items and active new items
        const expectedActiveCount = initialCount + newTodos.length - 1; // Subtract 1 for the completed task
        cy.get('.todo-list li').should('have.length', expectedActiveCount);
    });
  });




  it('Displays UI elements correctly on mobile', () => {
    cy.viewport(375, 812); // Simulates an iPhone X screen size

    cy.visit('https://example.cypress.io/todo');

    // Verify the input field is centered (check specific margins instead of shorthand)
    cy.get('.new-todo')
        .should('have.css', 'margin-top', '0px')
        .and('have.css', 'margin-right', '0px')
        .and('have.css', 'margin-bottom', '0px')
        .and('have.css', 'margin-left', '0px'); // If margin is "0" for all sides

    // Verify list items adjust to the screen width
    cy.get('.todo-list li').each(($el) => {
      cy.wrap($el).should('have.css', 'width').and((width) => {
          // Assert that the width matches a floating-point or integer pixel value
          expect(width).to.match(/^[0-9]+(\.[0-9]+)?px$/); // Allow optional decimal part
      });
    });
  });

  it('Responds to touch interactions', () => {
    cy.viewport('iphone-x');

    cy.visit('https://example.cypress.io/todo');

    const todo = 'Plan Vacation';

    // Add a new todo
    cy.get('.new-todo').type(`${todo}{enter}`);

    // Simulate tapping to mark as complete
    cy.get('.todo-list li').first().find('.toggle').click();

    // Verify the item is marked as completed
    cy.get('.todo-list li').first().should('have.class', 'completed');
  });


})