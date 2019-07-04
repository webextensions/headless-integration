#!/usr/bin/env node

/* globals describe, it */

const
    path = require('path'),
    fs = require('fs');

const { expect } = require('chai');

const
    RJSON = require('relaxed-json');

const requireRelaxedJson = function (rjsonPath) {
    const contents = fs.readFileSync(path.join(__dirname, rjsonPath), 'utf8');
    return RJSON.parse(contents);
};

describe('Application', async function () {
    // https://stackoverflow.com/questions/16607039/in-mocha-testing-while-calling-asynchronous-function-how-to-avoid-the-timeout-er/16607408#16607408
    this.timeout(15000);

    const { asyncRunTest } = require('../src/headless-integration.js');
    const main = async function (test, dirPath) {
        const testStatus = await asyncRunTest(test, dirPath);
        return testStatus;
    };

    it('should load the basic example properly', async function () {
        const test = requireRelaxedJson('./basic-test/basic-test.rjson');
        const testStatus = await main(test, path.join(__dirname, 'basic-test'));
        expect(testStatus).to.equal(true);
    });

    it('should be able to read innerText for a given selector', async function () {
        const test = requireRelaxedJson('./test-innerText-at-npmjs-com/test-innerText-at-npmjs-com.rjson');
        const testStatus = await main(test, path.join(__dirname, 'test-innerText-at-npmjs-com'));
        expect(testStatus).to.equal(true);
    });

    it('should be able to take screenshot for a given selector', async function () {
        const test = requireRelaxedJson('./test-readme-tab-at-npmjs-com/test-readme-tab-at-npmjs-com.rjson');
        const testStatus = await main(test, path.join(__dirname, 'test-readme-tab-at-npmjs-com'));
        expect(testStatus).to.equal(true);
    });

    it('should be able to perform a simple click action', async function () {
        const test = requireRelaxedJson('./test-simple-click-action/test-simple-click-action.rjson');
        const testStatus = await main(test, path.join(__dirname, 'test-simple-click-action'));
        expect(testStatus).to.equal(true);
    });

    it('should be able to type in an input field', async function () {
        const test = requireRelaxedJson('./test-typing/test-typing.rjson');
        const testStatus = await main(test, path.join(__dirname, 'test-typing'));
        expect(testStatus).to.equal(true);
    });
});
