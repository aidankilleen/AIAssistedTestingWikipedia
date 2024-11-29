const { Builder, By, until } = require('selenium-webdriver');

async function testLoadCorrectlyOnMobile() {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        // Set viewport size (mobile dimensions)
        await driver.manage().window().setRect({ width: 375, height: 812 });

        // Navigate to the website
        await driver.get('https://example.cypress.io/todo');

        // Verify the app title is visible
        const appTitle = await driver.findElement(By.css('h1'));
        const titleText = await appTitle.getText();
        console.log('App Title:', titleText);
        if (titleText !== 'todos') throw new Error('App title is incorrect');

        // Verify input field is visible
        const inputField = await driver.findElement(By.css('.new-todo'));
        if (!(await inputField.isDisplayed())) throw new Error('Input field is not visible');
    } finally {
        await driver.quit();
    }
}

async function testAddNewTodo() {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.manage().window().setRect({ width: 375, height: 667 });
        await driver.get('https://example.cypress.io/todo');

        const newTodo = 'Buy Milk';

        // Add a new todo
        const inputField = await driver.findElement(By.css('.new-todo'));
        await inputField.sendKeys(newTodo, '\n');

        // Verify the new todo appears in the list
        const todoItems = await driver.findElements(By.css('.todo-list li'));
        const lastTodoText = await todoItems[todoItems.length - 1].getText();
        if (lastTodoText !== newTodo) throw new Error('New todo was not added');
    } finally {
        await driver.quit();
    }
}
async function testMarkTodoComplete() {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.manage().window().setRect({ width: 320, height: 568 });
        await driver.get('https://example.cypress.io/todo');

        const todo = 'Learn Cypress';

        // Add a new todo
        const inputField = await driver.findElement(By.css('.new-todo'));
        await inputField.sendKeys(todo, '\n');

        // Mark it as complete
        const toggleButton = await driver.findElement(By.css('.todo-list li .toggle'));
        await toggleButton.click();

        // Verify the item is marked as complete
        const firstTodo = await driver.findElement(By.css('.todo-list li'));
        const todoClass = await firstTodo.getAttribute('class');
        if (!todoClass.includes('completed')) throw new Error('Todo was not marked as complete');
    } finally {
        await driver.quit();
    }
}

async function testDeleteLastTodo() {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.manage().window().setRect({ width: 414, height: 896 });
        await driver.get('https://example.cypress.io/todo');

        const todo = 'Go Shopping';

        // Add a new todo
        const inputField = await driver.findElement(By.css('.new-todo'));
        await inputField.sendKeys(todo, '\n');

        // Delete the last todo
        const todoItems = await driver.findElements(By.css('.todo-list li'));
        const lastTodo = todoItems[todoItems.length - 1];
        const destroyButton = await lastTodo.findElement(By.css('.destroy'));
        await driver.executeScript('arguments[0].click();', destroyButton);

        // Verify the todo is deleted
        const remainingTodos = await driver.findElements(By.css('.todo-list li'));
        for (const todoItem of remainingTodos) {
            const text = await todoItem.getText();
            if (text === todo) throw new Error('Todo was not deleted');
        }
    } finally {
        await driver.quit();
    }
}

async function testFilterActiveTodos() {
    const driver = await new Builder().forBrowser('chrome').build();
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
        const expectedCount = initialCount + newTodos.length - 1; // Subtract 1 for the completed task
        if (activeTodos.length !== expectedCount) {
            throw new Error(
                `Active todos count is incorrect. Expected: ${expectedCount}, Found: ${activeTodos.length}`
            );
        }
    } finally {
        await driver.quit();
    }
}

// call the tests
testLoadCorrectlyOnMobile();
testAddNewTodo();
testMarkTodoComplete();
testDeleteLastTodo();
testFilterActiveTodos();
