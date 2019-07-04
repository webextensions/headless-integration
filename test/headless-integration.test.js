#!/usr/bin/env node

/* globals describe, it */

const path = require('path');

const { expect } = require('chai');

describe('Application', async function () {
    // https://stackoverflow.com/questions/16607039/in-mocha-testing-while-calling-asynchronous-function-how-to-avoid-the-timeout-er/16607408#16607408
    this.timeout(15000);

    const { asyncRunTest } = require('../src/headless-integration.js');
    const main = async function (test, dirPath) {
        const testStatus = await asyncRunTest(test, dirPath);
        return testStatus;
    };

    it('should load the basic example properly', async function () {
        const test = require('./basic-test/basic-test.js');
        const testStatus = await main(test, path.join(__dirname, 'basic-test'));
        expect(testStatus).to.equal(true);
    });

    it('should be able to read innerText for a given selector', async function () {
        const test = require('./test-innerText-at-npmjs-com/test-innerText-at-npmjs-com.js');
        const testStatus = await main(test, path.join(__dirname, 'test-innerText-at-npmjs-com'));
        expect(testStatus).to.equal(true);
    });

    it('should be able to take screenshot for a given selector', async function () {
        const test = require('./test-readme-tab-at-npmjs-com/test-readme-tab-at-npmjs-com.js');
        const testStatus = await main(test, path.join(__dirname, 'test-readme-tab-at-npmjs-com'));
        expect(testStatus).to.equal(true);
    });

    it('should be able to perform a simple click action', async function () {
        const test = require('./test-simple-click-action/test-simple-click-action.js');
        const testStatus = await main(test, path.join(__dirname, 'test-simple-click-action'));
        expect(testStatus).to.equal(true);
    });

    it('should be able to type in an input field', async function () {
        const test = require('./test-typing/test-typing.js');
        const testStatus = await main(test, path.join(__dirname, 'test-typing'));
        expect(testStatus).to.equal(true);
    });
});
