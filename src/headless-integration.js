const
    path = require('path'),
    fs = require('fs');

const
    deepExtend = require('deep-extend'),
    async = require('async'),
    glob = require('glob'),
    looksSame = require('looks-same');

const
    puppeteer = require('puppeteer');

const
    asyncBehaveAsRealBrowser = require('./utils/async-behave-as-real-browser.js');

const asyncLooksSame = async function (expectedImages, imageToCompare) {
    return new Promise(function (resolve, reject) {
        async.someSeries(
            expectedImages,
            function (expectedImage, done) {
                looksSame(expectedImage, imageToCompare, {strict: true}, function (err, {equal}) {
                    if (err) {
                        done(err);
                    } else {
                        let matchFound = false;
                        // equal will be true, if images looks the same
                        if (equal) {
                            matchFound = true;
                        }
                        done(null, matchFound);
                    }
                });
            },
            function (err, matchFound) {
                if (err) {
                    reject(err);
                } else {
                    resolve(matchFound);
                }
            }
        );
    });
};

const asyncRunTest = async function (test, directoryOfTestFile) {
    let testPassed = true;
    let browser = undefined;

    const browserSetupSteps = test.browserSetupSteps;
    for (let i = 0; i < browserSetupSteps.length; i++) {
        const browserSetupStep = browserSetupSteps[i];
        if (browserSetupStep.type === '_launch_if-required') {
            const defaultOptions = {
                // headless: false
            };
            const
                payload = browserSetupStep.payload || [],
                payloadOptions = payload[0] || {},
                options = deepExtend(defaultOptions, payloadOptions);
            browser = await puppeteer.launch(options);
        } else {
            console.log('Could not perform the following step (Reason: Not implemented yet):');
            console.log(browserSetupStep);
            throw new Error('Could not perform the given step.');
        }
    }

    // https://stackoverflow.com/questions/47744369/puppeteer-opens-an-empty-tab-in-non-headless-mode#comment94423244_47818964
    const pages = await browser.pages();
    const page = pages[0];

    const pageSetupSteps = test.pageSetupSteps;
    for (let i = 0; i < pageSetupSteps.length; i++) {
        const pageSetupStep = pageSetupSteps[i];
        if (pageSetupStep.type === '_behave-as-real-browser') {
            await asyncBehaveAsRealBrowser(page);
        } else {
            console.log('Could not perform the following step (Reason: Not implemented yet):');
            console.log(pageSetupStep);
            throw new Error('Could not perform the given step.');
        }
    }

    const pageSteps = test.pageSteps;
    for (let i = 0; i < pageSteps.length; i++) {
        const pageStep = pageSteps[i];
        if (
            typeof pageStep.type === 'string' &&
            typeof page[pageStep.type] === 'function'
        ) {
            await page[pageStep.type](...pageStep.payload);
        } else if (pageStep.type === '_compareInnerText') {
            const
                selector = pageStep.payload[0],
                expectedInnerText = pageStep.payload[1],
                innerText = await page.$eval(selector, e => e.innerText);
            if (innerText !== expectedInnerText) {
                testPassed = false;
            }
        } else if (pageStep.type === '_screenshot') {
            // let considerDirectoryFromCurrentPath = true;
            // if (pageStep.considerDirectoryFromCurrentPath === false) {
            //     considerDirectoryFromCurrentPath = false;
            // }

            const screenshotPath = path.join(directoryOfTestFile, pageStep.payload.path);
            let tempScreenshotPath = screenshotPath;

            const
                dirPath = path.dirname(screenshotPath),
                fileName = path.basename(screenshotPath),
                fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.'),
                fileNameWithDigitSuffixGlob = path.join(dirPath, fileNameWithoutExtension + '.[0-9]' + '.png'); // TODO: Ideally, the glob pattern should be able to contain any number of digits. But, practically, it is not required.
            tempScreenshotPath = path.join(dirPath, fileNameWithoutExtension + '.tmp' + '.png');

            const selector = pageStep.payload.selector;
            if (selector) {
                const elHandle = await page.$(selector);

                await elHandle.screenshot({path: tempScreenshotPath});
            } else {
                await page.screenshot({path: tempScreenshotPath});
            }

            const screenshotAlreadyExists = fs.existsSync(screenshotPath);
            if (screenshotAlreadyExists) {
                const expectedScreenshots = [screenshotPath].concat(glob.sync(fileNameWithDigitSuffixGlob, {cwd: '/'}));
                const imagesAreMatching = await asyncLooksSame(expectedScreenshots, tempScreenshotPath);
                if (imagesAreMatching) {
                    // console.log('Passed the test (images are same).');
                    fs.unlinkSync(tempScreenshotPath);
                } else {
                    const
                        cwd = process.cwd(),
                        tempScreenshotPathRelative = path.relative(cwd, tempScreenshotPath),
                        screenshotPathRelative = path.relative(cwd, screenshotPath);
                    console.log(`Contents of ${tempScreenshotPathRelative} and ${screenshotPathRelative} mismatch. Please check.`);
                    testPassed = false;
                }
            } else {
                fs.renameSync(tempScreenshotPath, screenshotPath);
                console.log(`A new screenshot has been generated at ${screenshotPath}. Please verify.`);
                testPassed = false;
            }
        } else {
            console.log('Could not perform the following step (Reason: Not implemented yet):');
            console.log(pageStep);
            throw new Error('Could not perform the given step.');
        }
    }

    const puppeteerCleanUpSteps = test.puppeteerCleanUpSteps;
    for (let i = 0; i < puppeteerCleanUpSteps.length; i++) {
        const puppeteerCleanUpStep = puppeteerCleanUpSteps[i];
        if (puppeteerCleanUpStep.type === '_close-browser-if-required') {
            await browser.close();
        } else {
            console.log('Could not perform the following step (Reason: Not implemented yet):');
            console.log(puppeteerCleanUpStep);
            throw new Error('Could not perform the given step.');
        }
    }

    return testPassed;
};

module.exports = {
    puppeteer,
    asyncRunTest,
    asyncBehaveAsRealBrowser
};
