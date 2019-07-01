#!/usr/bin/env node

const { asyncRunTest } = require('../../src/headless-integration.js');

const test = {
    browserSetupSteps: [
        { type: 'launch_if-required', _payload: [{ /* headless: false /* */ }] }
    ],
    pageSetupSteps: [
        { type: '_behave-as-real-browser' }
    ],
    pageSteps: [
        { type: 'goto', payload: ['https://www.npmjs.com/package/headless-integration', {waitUntil: 'networkidle2' }] },
        { type: '_compareInnerText', _payload: ['span[title="headless-integration"]', 'headless-integration' ] }
    ],
    puppeteerCleanUpSteps: [
        { type: 'close-browser-if-required' }
    ]
};

const main = async function () {
    const testStatus = await asyncRunTest(test, __dirname);

    return testStatus;
};

main();

module.exports = main;
