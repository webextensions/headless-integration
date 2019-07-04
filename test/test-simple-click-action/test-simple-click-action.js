module.exports = {
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
