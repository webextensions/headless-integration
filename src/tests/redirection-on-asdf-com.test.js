module.exports = {
    name: 'redirection on http://forums.asdf.com/',
    steps: [
        { type: 'action', action: 'newBrowserContext' },
        { type: 'action', action: 'openNewTab' },
        { type: 'action', action: 'goToUrl', payload: 'http://forums.asdf.com/' },
        {
            type: 'assert',
            assertion: 'assertEqual',
            expected: 'https://asdfforums.com/',
            get_actual: {
                type: 'getCurrentTabUrl'
            }
        }
    ]
};
