const { chromium } = require('playwright');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const loginURL = 'https://tankonyvrendeles.kello.hu/User/Login';

// List of user credentials
const users = [
    { username: '1.jozsef.cserko.pp@abesse.hu', password: 'Pass.word1' },
    // { username: '2.jozsef.cserko.pp@abesse.hu', password: 'Pass.word1' },
    // { username: '3.jozsef.cserko.pp@abesse.hu', password: 'Pass.word1' },
    // { username: '4.jozsef.cserko.pp@abesse.hu', password: 'Pass.word1' },
    // { username: '5.jozsef.cserko.pp@abesse.hu', password: 'Pass.word1' },
    // // Generate user to the 15th
    // { username: '6.jozsef.cserko.pp@abesse.hu', password: 'Pass.word1' },
    // { username: '7.jozsef.cserko.pp@abesse.hu', password: 'Pass.word1' },
    // { username: '8.jozsef.cserko.pp@abesse.hu', password: 'Pass.word1' },
    // { username: '9.jozsef.cserko.pp@abesse.hu', password: 'Pass.word1' },
    // { username: '10.jozsef.cserko.pp@abesse.hu', password: 'Pass.word1' },
    // { username: '11.jozsef.cserko.pp@abesse.hu', password: 'Pass.word1' },
    // { username: '12.jozsef.cserko.pp@abesse.hu', password: 'Pass.word1' },
    // { username: '13.jozsef.cserko.pp@abesse.hu', password: 'Pass.word1' },
    // { username: '14.jozsef.cserko.pp@abesse.hu', password: 'Pass.word1' },
    // { username: '15.jozsef.cserko.pp@abesse.hu', password: 'Pass.word1' },


    

];

// Wait for a random time
const waitForRandomTime = async (page, baseTime = 5000) => {
    if (page) {
        return await page.waitForTimeout(Math.round(Math.random() * baseTime));
    }
    return false;
};

// Function to perform login
const login = async (context, username, password) => {
    try {
        const page = await context.newPage();
        await page.goto(loginURL);
        await waitForRandomTime(page, 2000);
        await page.click('button.btn.btn-sm.dx-btn.btn-primary.px-3.py-2');
        await waitForRandomTime(page, 1000);
        await page.fill('input[name="UserName"]', username);
        await page.fill('input[name="Password"]', password);
        await waitForRandomTime(page, 3000);
        await page.click('button[type="submit"]');
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
    
    await waitForRandomTime(page, 3000);

    await page.getByText('Új évfolyam hozzáadása').click();
    
    await waitForRandomTime(page, 3000);
    
    await page.getByLabel('Évfolyam száma').fill('2');
    
    await page.keyboard.press('Enter');
    await waitForRandomTime(page, 3000);
    
    
    await page.getByText('Létrehozás').click();
    
    // Add more students
    await waitForRandomTime(page, 3000);
    await page.click('button.btn.btn-sm.dx-btn.btn-outline-primary.dx-btn-text.material-icons.position-relative').click();
    await page.waitForTimeout(1000);

    page.getByText('Új osztály hozzáadása').click();

    // Perform other interactions on the page
    // await page.click('a[href="/courses/"]');
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
