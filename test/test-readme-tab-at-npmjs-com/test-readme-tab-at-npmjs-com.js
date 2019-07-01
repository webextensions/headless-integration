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
        { type: '_screenshot', _payload: { selector: 'main ul.flex > li:first-child', path: 'readme-tab.png', compare: true } }
    ],
    puppeteerCleanUpSteps: [
        { type: 'close-browser-if-required' }
    ]
};

const main = async function () {
    const testStatus = await asyncRunTest(test, __dirname);

    return testStatus;
};

module.exports = main;
