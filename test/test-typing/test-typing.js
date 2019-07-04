module.exports = {
    browserSetupSteps: [
        { type: 'launch_if-required', _payload: [{ /* headless: false /* */ }] }
    ],
    pageSetupSteps: [
        { type: '_behave-as-real-browser' }
    ],
    pageSteps: [
        { type: 'goto', payload: ['https://github.com/webextensions/headless-integration', {waitUntil: 'networkidle2' }] },
        { type: 'click', payload: ['.header-search-input'] },
        { type: 'type', payload: ['.header-search-input', 'dummy', {delay: 50}] },
        { type: 'waitFor', payload: [100] },
        { type: '_screenshot', _payload: { selector: '#jump-to-results', path: 'search-where-suggestions.png', compare: true } }
    ],
    puppeteerCleanUpSteps: [
        { type: 'close-browser-if-required' }
    ]
};
