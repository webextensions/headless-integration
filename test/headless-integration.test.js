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
    const contents = fs.readFileSync(path.resolve(__dirname, rjsonPath), 'utf8');
    return RJSON.parse(contents);
};

describe('Application', async function () {
    // https://stackoverflow.com/questions/16607039/in-mocha-testing-while-calling-asynchronous-function-how-to-avoid-the-timeout-er/16607408#16607408
    this.timeout(15000);

    const files = glob.sync('./**/*.test.rjson', {cwd: __dirname});

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let test = requireRelaxedJson(file);
        const testSummary = test.summary || file;

        let itFn = it;
        if (test.skip) {
            itFn = it.skip;
        } else if (test.only) {
            itFn = it.only;
        }
        itFn(testSummary, async function () {
            // ! IMPORTANT: This variable is used by the "eval" statement
            let _variables; // eslint-disable-line no-unused-vars

            if (typeof test._variables === 'undefined') {
                // do nothing
            } else if (test._variables) {
                if (typeof test._variables === 'string') {
                    _variables = requireRelaxedJson(path.resolve(__dirname, path.dirname(file), test._variables));
                } else if (Array.isArray(test._variables)) {
                    console.log('Invalid value for _variables for test in file: ' + file);
                    console.log('Exiting with error.');
                    process.exit(1);
                } else if (typeof test._variables === 'object') {
                    _variables = test._variables;
                }

                const stringifiedTest = JSON.stringify(test);

                // ! IMPORTANT: "Double" stringifying to handle escaping properly
                let doubleStringifiedTest = JSON.stringify(stringifiedTest);
                doubleStringifiedTest = doubleStringifiedTest.substring(1, doubleStringifiedTest.length - 1);

                const
                    stringifiedTestWrappedInTemplateLiteral = '`' + doubleStringifiedTest + '`',
                    stringifiedTestWithVariablesFilledUp = eval(stringifiedTestWrappedInTemplateLiteral);

                test = (JSON.parse(stringifiedTestWithVariablesFilledUp));
            } else {
                console.log('Invalid value for _variables for test in file: ' + file);
                console.log('Exiting with error.');
                process.exit(1);
            }

            const testStatus = await asyncRunTest(test, path.dirname(path.join(__dirname, file)));
            expect(testStatus).to.equal(true);
        });
    }
});
