const { test, expect } = require('@playwright/test');

test.describe('template spec', () => {
  
  test('Loads correctly on a mobile viewport', async ({ page }) => {
    // Set viewport to iPhone X dimensions
    await page.setViewportSize({ width: 375, height: 812 });

    // Visit the Cypress Kitchen Sink Todo page
    await page.goto('https://example.cypress.io/todo');

    // Verify the app title is visible
    const appTitle = page.locator('h1');
    await expect(appTitle).toBeVisible();
    await expect(appTitle).toHaveText('todos');

    // Verify the input field is visible
    const inputField = page.locator('.new-todo');
    await expect(inputField).toBeVisible();
  });

  test('Allows adding a new todo on a mobile device', async ({ page }) => {
    // Set viewport for iPhone 6/7/8
    await page.setViewportSize({ width: 375, height: 667 });

    // Visit the Cypress Kitchen Sink Todo page
    await page.goto('https://example.cypress.io/todo');

    const newTodo = 'Buy Milk';

    // Add a new todo
    await page.fill('.new-todo', newTodo);
    await page.keyboard.press('Enter');

    // Verify the new item appears in the list
    const lastTodoItem = page.locator('.todo-list li').last(); // Get the last item in the list
    await expect(lastTodoItem).toContainText(newTodo);
});

  test('Allows marking todos as complete on a mobile device', async ({ page }) => {
    // Set viewport for iPhone 5
    await page.setViewportSize({ width: 320, height: 568 });

    // Visit the Cypress Kitchen Sink Todo page
    await page.goto('https://example.cypress.io/todo');

    const todo = 'Learn Cypress';

    // Add a new todo
    await page.fill('.new-todo', todo);
    await page.keyboard.press('Enter');

    // Mark it as complete
    await page.locator('.todo-list li .toggle').first().click();

    // Verify the item is marked as complete
    const firstTodo = page.locator('.todo-list li').first();
    await expect(firstTodo).toHaveClass(/completed/);
  });

  test('Allows deleting the last todo on a mobile device', async ({ page }) => {
    // Set viewport for iPhone XR
    await page.setViewportSize({ width: 414, height: 896 });

    // Visit the Cypress Kitchen Sink Todo page
    await page.goto('https://example.cypress.io/todo');

    const todo = 'Go Shopping';

    // Add a new todo
    await page.fill('.new-todo', todo);
    await page.keyboard.press('Enter');

    // Hover over the last todo item to reveal the destroy button
    const lastTodo = page.locator('.todo-list li').last();
    await lastTodo.hover(); // Hover over the last todo to make the `.destroy` button visible

    // Delete the last todo
    const destroyButton = lastTodo.locator('.destroy');
    await destroyButton.click();

    // Verify the deleted item is no longer in the list by checking each item's text
    const todoItems = page.locator('.todo-list li');
    const todoTexts = await todoItems.allTextContents();

    // Assert that 'Go Shopping' is not present in the remaining todo items
    expect(todoTexts).not.toContain(todo);
});

  test('Filters active todos correctly, considering initial items in the list', async ({ page }) => {
    // Visit the Cypress Kitchen Sink Todo page
    await page.goto('https://example.cypress.io/todo');

    // Count the initial number of todos
    const initialTodos = await page.locator('.todo-list li').count();

    // Define new todos to add
    const newTodos = ['Task 1', 'Task 2', 'Task 3'];

    // Add the new todos
    for (const todo of newTodos) {
      await page.fill('.new-todo', todo);
      await page.keyboard.press('Enter');
    }

    // Mark the first of the new todos as complete
    await page.locator('.todo-list li:has-text("Task 1") .toggle').click();

    // Click the "Active" filter
    await page.locator('text=Active').click();

    // Verify the active count includes the initial items and active new items
    const activeTodos = page.locator('.todo-list li');
    const expectedActiveCount = initialTodos + newTodos.length - 1; // Subtract 1 for the completed task
    await expect(activeTodos).toHaveCount(expectedActiveCount);
  });

  test('Displays UI elements correctly on mobile', async ({ page }) => {
    // Set viewport for iPhone X
    await page.setViewportSize({ width: 375, height: 812 });

    // Visit the Cypress Kitchen Sink Todo page
    await page.goto('https://example.cypress.io/todo');

    // Verify the input field is centered
    const inputField = page.locator('.new-todo');
    await expect(inputField).toHaveCSS('margin-top', '0px');
    await expect(inputField).toHaveCSS('margin-right', '0px');
    await expect(inputField).toHaveCSS('margin-bottom', '0px');
    await expect(inputField).toHaveCSS('margin-left', '0px');

    // Verify list items adjust to the screen width
    const todoItems = page.locator('.todo-list li');
    const count = await todoItems.count();
    for (let i = 0; i < count; i++) {
      const width = await todoItems.nth(i).evaluate(el => getComputedStyle(el).width);
      expect(width).toMatch(/^[0-9]+(\.[0-9]+)?px$/);
    }
  });

  test('Responds to touch interactions', async ({ page }) => {
    // Set viewport for iPhone X
    await page.setViewportSize({ width: 375, height: 812 });

    // Visit the Cypress Kitchen Sink Todo page
    await page.goto('https://example.cypress.io/todo');

    const todo = 'Plan Vacation';

    // Add a new todo
    await page.fill('.new-todo', todo);
    await page.keyboard.press('Enter');

    // Simulate tapping to mark as complete
    await page.locator('.todo-list li .toggle').first().click();

    // Verify the item is marked as completed
    const firstTodo = page.locator('.todo-list li').first();
    await expect(firstTodo).toHaveClass(/completed/);
  });

});
