describe('Basic Footer', () => {
    it('has American Airlines as company name', (browser) => {
        browser
            .url(`file:///${process.env.PWD}/index.html`)
            .waitForElementVisible('body')
            .assert.containsText('#footer-company-name', '©2019 American Airlines')
            .end();
    });

    it('forwards to https://github.com/AmericanAirlines Github page when American Airlines Gitub link clicked', async (browser) => {
        browser
            .url(`file:///${process.env.PWD}/index.html`)
            .waitForElementVisible('body')
            .click({
                selector: '#aa-official-github-link',
                timeout: 2000
            })
            .assert.urlEquals('https://github.com/AmericanAirlines')
            .end();
    });
});