#!/usr/bin/env node

const chalk = require('chalk');
const headlessIntegration = require('./index.js');

const testFiles = [
    './tests/redirection-on-asdf-com.test.js',
    './tests/redirection-on-google-com.test.js'
];

const tests = [];
testFiles.forEach(function (testFile) {
    tests.push({
        file: testFile,
        data: require(testFile)
    });
});

(async function () {
    console.log('Started testing.\n');
    const browser = await headlessIntegration.getBrowserAsync({
        // headless: false
    });

    for (let i = 0; i < tests.length; i++) {
        const
            test = tests[i],
            { file } = test,
            { steps } = test.data;
        await headlessIntegration.performSteps(browser, steps);
        console.log(chalk.green(' ✓ ') + chalk.gray(test.data.name || file));
    }

    await browser.close();

    console.log('\n' + chalk.bold(chalk.green(' ✓ ') + 'The tests completed successfully.'));
})();
