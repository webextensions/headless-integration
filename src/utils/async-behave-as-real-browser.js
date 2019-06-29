/* global navigator */

module.exports = async function asyncBehaveAsRealBrowser(page) {
    // https://medium.com/@addnab/puppeteer-quick-fix-for-differences-between-headless-and-headful-versions-of-a-webpage-5b168bd5fe4a
    const headlessUserAgent = await page.evaluate(() => navigator.userAgent);
    const chromeUserAgent = headlessUserAgent.replace('HeadlessChrome', 'Chrome');
    await page.setUserAgent(chromeUserAgent);
    await page.setExtraHTTPHeaders({
        'accept-language': 'en-US,en;q=0.8'
    });
};
