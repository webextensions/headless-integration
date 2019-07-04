#!/usr/bin/env node

/* globals describe, it */

const
    path = require('path'),
    fs = require('fs');

const
    { expect } = require('chai'),
    glob = require('glob'),
    RJSON = require('relaxed-json');

const
    { asyncRunTest } = require('../src/headless-integration.js');

const requireRelaxedJson = function (rjsonPath) {
    const contents = fs.readFileSync(path.join(__dirname, rjsonPath), 'utf8');
    return RJSON.parse(contents);
};

describe('Application', async function () {
    // https://stackoverflow.com/questions/16607039/in-mocha-testing-while-calling-asynchronous-function-how-to-avoid-the-timeout-er/16607408#16607408
    this.timeout(15000);

    const files = glob.sync('./**/*.rjson', {cwd: __dirname});

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const test = requireRelaxedJson(file);
        const testSummary = test.summary || file;

        let itFn = it;
        if (test.skip) {
            itFn = it.skip;
        } else if (test.only) {
            itFn = it.only;
        }
        itFn(testSummary, async function () {
            const test = requireRelaxedJson(file);
            const testStatus = await asyncRunTest(test, path.dirname(path.join(__dirname, file)));
            expect(testStatus).to.equal(true);
        });
    }
});
