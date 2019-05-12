#!/usr/bin/env node

const headlessIntegration = require('./index.js');

const steps = [
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

(async function () {
    console.log('Started testing.');
    const browser = await headlessIntegration.getBrowserAsync({
        // headless: false
    });

    await headlessIntegration.performSteps(browser, steps);

    await browser.close();

    console.log('The tests completed successfully.');
})();
