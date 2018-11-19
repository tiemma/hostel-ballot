const puppeteer = require('puppeteer');
const fields = require('./fields');
const options = require('./puppeteer_options');

require('dotenv').config();

console.log(fields);
console.log(options);

let delay = 0;

// for(let i = 0; i < 4; i++)
// {
//     setTimeout(
(async () => {
        const browser = await puppeteer.launch({
            timeout: options.timeout, headless: options.headless, userDataDir: `${options.userDataDir}`, args: [
                '--load-extension=./chrome_extension/',
                '--disable-extensions-except=./chrome_extension/'
            ]
        });

        let page = await browser.newPage();

        // await page.setRequestInterception(true);
        //
        // page.on('request', (req) => {
        //     console.log("url for this request" + req.url());
        //
        //     if (options.disabledResources.indexOf(req.resourceType()) !== -1) {
        //         req.abort();
        //     } else if (req.url().includes("HomePage")) {
        //         window.open(req.url(), '_blank');
        //         console.log("Home page found~");
        //     } else {
        //         req.continue();
        //     }
        // });

        await page.setJavaScriptEnabled(options.javascriptEnabled);

        await page.setCacheEnabled(options.cacheEnabled);

        await page.goto('http://studentportal.unilag.edu.ng/', {timeout: options.timeout});

        await page.click(fields.LOGIN_USERNAME_ID);
        await page.keyboard.type(process.env.MATRIC_NO);

        await page.click(fields.LOGIN_PASSWORD_ID);
        await page.keyboard.type(process.env.PASSWORD);

        await page.click(fields.BUTTON_SELECTOR);

        await page.waitForNavigation({waitUntil: options.waitUntil, timeout: options.timeout});
        await page.waitForSelector(`#Contents_${fields.BALLOT_DIV_ENTRY}`);
        await page.waitFor(1000);
        await page.click(`#Contents_${fields.BALLOT_DIV_ENTRY}`);

        await page.waitForNavigation({waitUntil: options.waitUntil, timeout: options.timeout});
        await page.waitForSelector(fields.BALLOT_REQUEST_TAG);
        await page.waitFor(1000);
        await page.click(fields.BALLOT_REQUEST_TAG);

        // browser.close();
    })();
    // , delay += 6000 * i);



