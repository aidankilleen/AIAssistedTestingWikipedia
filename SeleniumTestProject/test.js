const { Builder, By, until } = require('selenium-webdriver');

async function runTest() {
    // Create a new WebDriver instance
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to a website
        await driver.get('https://example.com');

        // Find an element by its tag name and retrieve its text
        const heading = await driver.findElement(By.tagName('h1')).getText();
        console.log('Page heading:', heading);

        // Wait until a condition is met (example: element is located)
        await driver.wait(until.elementLocated(By.tagName('p')), 5000);

        // Take a screenshot
        const screenshot = await driver.takeScreenshot();
        require('fs').writeFileSync('screenshot.png', screenshot, 'base64');
        console.log('Screenshot saved as screenshot.png');
    } catch (err) {
        console.error('Test failed:', err);
    } finally {
        // Quit the driver
        await driver.quit();
    }
}

runTest();
