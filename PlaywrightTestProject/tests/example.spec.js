const { test, expect } = require('@playwright/test');

test('verify title on Cypress Kitchen Sink page', async ({ page }) => {
    // Navigate to the Cypress Kitchen Sink page
    await page.goto('https://example.cypress.io/');

    // Retrieve the page title
    const title = await page.title();

    // Assert the title is as expected
    expect(title).toBe('Cypress.io: Kitchen Sink');
});

test('add a new todo item to Cypress Todo app', async ({ page }) => {
    // Navigate to the Cypress Todo app
    await page.goto('https://example.cypress.io/todo');

    // Define the new todo item
    const newTodo = 'Learn Playwright';

    // Add a new todo item
    await page.fill('.new-todo', newTodo); // Fill the input field
    await page.press('.new-todo', 'Enter'); // Press Enter to add the item

    // Verify the new item appears in the list
    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(3); // Expect 3 items (default 2 + 1 new)
    await expect(todoItems.last()).toContainText(newTodo); // Verify the last item matches the new todo
});

test('Navigates to the "Get" link and verifies the button with label "Button"', async ({ page }) => {
    // Visit the Cypress Kitchen Sink Test Page
    await page.goto('https://example.cypress.io/');

    // Click on the "Get" link in the navigation
    await page.click('a:has-text("get")');

    // Verify that a button with the label "Button" is present on the page
    const button = page.locator('button:has-text("Button")');
    await expect(button).toBeVisible();
});

