#!/usr/bin/env node

const puppeteer = require('puppeteer');

var steps = [
    { type: 'action', action: 'newBrowserContext' },
    { type: 'action', action: 'openNewTab' },
    { type: 'action', action: 'goToUrl', payload: 'http://forums.asdf.com/' },
    {
        type: 'assert',
        assertion: 'assertEqual',
        expected: 'https://asdfforums.com/',
        get_actual: {
            type: 'getCurrentTabUrl'
        }
    }
];

const fnGetActual = async function (browser, page, get_actual) {
    if (get_actual === 'getCurrentTabUrl') {
        return page._target._targetInfo.url;
    } else {
        // TODO: Handle unexpected situation gracefully or provide detailed information to the user
        throw new Error(`The given "get_actual" (${get_actual}) is not handled yet`);
    }
};

const performStep = async function (browser, page, step) {
    if (!step.type) {
        step.type = 'action';
    }

    if (step.type === 'action') {
        const
            action = step.action,
            payload = step.payload;
        if (action === 'newBrowserContext') {
            // TODO: Pending
        } else if (action === 'openNewTab') {
            const newPage = await browser.newPage();
            return newPage;
        } else if (action === 'goToUrl') {
            const url = payload;
            await page.goto(url);
        } else {
            // TODO: Handle unexpected situation gracefully or provide detailed information to the user
            throw new Error('The given "step" (of type "action") is not handled yet');
        }
    } else if (step.type === 'assert') {
        // TODO: Pending
        const assertion = step.assertion;
        const expected = step.expected;
        
        let actual = undefined;
        if (step.get_actual) {
            actual = await fnGetActual(browser, page, step.get_actual.type);
        }
        if (assertion === 'assertEqual') {
            if (expected === actual) {
                // do nothing
            } else {
                throw new Error('Assertion failed');    
            }
        } else {
            // TODO: Handle unexpected situation gracefully or provide detailed information to the user
            throw new Error('The given "step" (of type "assertion") is not handled yet');
        }
    }
    return page;
};

(async function () {
    console.log('Started testing.');
    const browser = await puppeteer.launch({
        // headless: false
    });

    let page = undefined;

    for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        page = await performStep(browser, page, step);
    };

    await browser.close();

    console.log('The tests completed successfully.');
})();
