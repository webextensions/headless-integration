#!/usr/bin/env node

/* globals describe, it */

const { expect } = require('chai');

describe('Application', async function () {
    // https://stackoverflow.com/questions/16607039/in-mocha-testing-while-calling-asynchronous-function-how-to-avoid-the-timeout-er/16607408#16607408
    this.timeout(15000);

    it('should load the basic example properly', async function () {
        const test = require('./basic-test/basic-test.js');
        const testStatus = await test();
        expect(testStatus).to.equal(true);
    });

    it('should be able to read innerText for a given selector', async function () {
        const test = require('./test-innerText-at-npmjs-com/test-innerText-at-npmjs-com.js');
        const testStatus = await test();
        expect(testStatus).to.equal(true);
    });

    it('should be able to take screenshot for a given selector', async function () {
        const test = require('./test-readme-tab-at-npmjs-com/test-readme-tab-at-npmjs-com.js');
        const testStatus = await test();
        expect(testStatus).to.equal(true);
    });

    it('should be able to perform a simple click action', async function () {
        const test = require('./test-simple-click-action/test-simple-click-action.js');
        const testStatus = await test();
        expect(testStatus).to.equal(true);
    });
});
