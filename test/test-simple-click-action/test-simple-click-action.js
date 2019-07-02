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
        { type: 'click', payload: ['.center-ns > div + ul.list li:last-child a'] },
        { type: '_compareInnerText', _payload: ['#versions div + h3', 'Current Tags' ] }
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
