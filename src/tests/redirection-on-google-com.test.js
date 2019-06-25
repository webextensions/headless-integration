module.exports = {
    name: 'redirection on http://google.com/',
    steps: [
        { type: 'action', action: 'newBrowserContext' },
        { type: 'action', action: 'openNewTab' },
        { type: 'action', action: 'goToUrl', payload: 'http://google.com/' },
        {
            type: 'assert',
            assertion: 'assertEqual',
            expected: 'https://www.google.com/?gws_rd=ssl',
            get_actual: {
                type: 'getCurrentTabUrl'
            }
        }
    ]
};
