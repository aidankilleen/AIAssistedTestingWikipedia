const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function testFilterActiveTodos() {
    // Set Chrome options for headless mode
    const options = new chrome.Options();
    options.addArguments('--headless'); // Run Chrome in headless mode
    options.addArguments('--disable-gpu'); // Disable GPU for headless mode
    options.addArguments('--window-size=1920,1080'); // Set the window size

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options) // Apply headless options
        .build();

    try {
        await driver.get('https://example.cypress.io/todo');

        // Get the initial count of todos
        const initialTodos = await driver.findElements(By.css('.todo-list li'));
        const initialCount = initialTodos.length;

        // Add new todos
        const newTodos = ['Task 1', 'Task 2', 'Task 3'];
        const inputField = await driver.findElement(By.css('.new-todo'));
        for (const todo of newTodos) {
            await inputField.sendKeys(todo, '\n');
        }

        // Mark "Task 1" as complete
        const task1Toggle = await driver.findElement(By.xpath('//li[contains(., "Task 1")]//input[@class="toggle"]'));
        await task1Toggle.click();

        // Click the "Active" filter
        const activeFilter = await driver.findElement(By.linkText('Active'));
        await activeFilter.click();

        // Verify the count of active todos
        const activeTodos = await driver.findElements(By.css('.todo-list li'));
        const expectedCount = initialCount + newTodos.length - 1; // Subtract 1 for completed task
        if (activeTodos.length !== expectedCount) {
            throw new Error(
                `Active todos count is incorrect. Expected: ${expectedCount}, Found: ${activeTodos.length}`
            );
        }
    } finally {
        await driver.quit();
    }
}

testFilterActiveTodos();
