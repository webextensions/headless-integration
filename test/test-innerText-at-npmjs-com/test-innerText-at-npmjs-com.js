module.exports = {
    browserSetupSteps: [
        { type: 'launch_if-required', _payload: [{ /* headless: false /* */ }] }
    ],
    pageSetupSteps: [
        { type: '_behave-as-real-browser' }
    ],
    pageSteps: [
        { type: 'goto', payload: ['https://www.npmjs.com/package/headless-integration', {waitUntil: 'networkidle2' }] },
        { type: '_compareInnerText', _payload: ['span[title="headless-integration"]', 'headless-integration' ] }
    ],
    puppeteerCleanUpSteps: [
        { type: 'close-browser-if-required' }
    ]
};
