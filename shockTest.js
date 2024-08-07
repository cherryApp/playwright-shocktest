const { chromium } = require('playwright');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const loginURL = 'http://content-creator.abobot.loc:3000/login/';

// List of user credentials
const users = [
    { username: 'content_creator@technokert.ru', password: '1234' },
    { username: 'content_creator@technokert.ru', password: '1234' },
    { username: 'content_creator@technokert.ru', password: '1234' },
    { username: 'content_creator@technokert.ru', password: '1234' },
    { username: 'content_creator@technokert.ru', password: '1234' },
    // Add more users as needed
];

// Wait for a random time
const waitForRandomTime = async (page, baseTime = 5000) => {
    return await page.waitForTimeout(Math.round(Math.random() * baseTime));
};

// Function to perform login
const login = async (context, username, password) => {
    const page = await context.newPage();
    await page.goto(loginURL);
    await waitForRandomTime(page, 10000);
    await page.fill('div > div > form input[type="text"]', username);
    await page.fill('#auth-login-v2-password', password);
    await waitForRandomTime(page, 20000);
    await page.click('div > div > form button[type="submit"]');

    try {
        await page.waitForNavigation();
        return page;
    } catch (error) {
        console.error('Login failed with user:', username, password);
    }
};

// Function to simulate user interactions
const simulateUserInteraction = async (browser, user) => {
    const context = await browser.newContext();
    const page = await login(context, user.username, user.password);
    
    await waitForRandomTime(page, 10000);

    // Perform other interactions on the page
    await page.click('a[href="/courses/"]');
    // await page.click('a[href="/quiz-results/"]');
    // await page.fill('#someInput', 'Some value');
    // await page.click('#submitButton');

    // Logout if needed
    // await page.click('#logoutButton');
    // await page.waitForNavigation();

    // Close the context
    // await context.close();
};

(async () => {
    // Launch in a headless browser
    // const browser = await chromium.launch();

    // Launch in a real browser
    const browser = await chromium.launch({
        executablePath: chromePath, // Use Chrome instead of Chromium
        headless: false // Set to true if you don't need to see the browser UI
    });

    // Run the test for each user concurrently
    await Promise.all(users.map(user => simulateUserInteraction(browser, user)));

    // Close the browser
    // await browser.close();
})();
