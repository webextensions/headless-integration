module.exports = {
    browserSetupSteps: [
        { type: 'launch_if-required', _payload: [{ /* headless: false /* */ }] }
    ],
    pageSetupSteps: [
        { type: '_behave-as-real-browser' }
    ],
    pageSteps: [
        { type: 'goto', payload: ['http://example.com/', {waitUntil: 'networkidle2' }] },
        { type: '_screenshot', _payload: { path: 'example-com-load.png', compare: true } }
    ],
    puppeteerCleanUpSteps: [
        { type: 'close-browser-if-required' }
    ]
};
