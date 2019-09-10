describe('Flight Finder Form', () => {
    it('has origin input', (browser) => {
        browser
            .url(`file:///${process.env.PWD}/index.html`)
            .waitForElementVisible('body')
            .assert.visible('#origin-input')
            .end();
    });

    it('has destination input', (browser) => {
        browser
            .url(`file:///${process.env.PWD}/index.html`)
            .waitForElementVisible('body')
            .assert.visible('#destination-input')
            .end();
    });

    it('has departure date input', (browser) => {
        browser
            .url(`file:///${process.env.PWD}/index.html`)
            .waitForElementVisible('body')
            .assert.visible('#departure-date-input')
            .assert.attributeEquals('#departure-date-input', 'type', 'date')
            .end();
    });

    it('has a search button', (browser) => {
        browser
            .url(`file:///${process.env.PWD}/index.html`)
            .waitForElementVisible('body')
            .assert.visible('#flight-search-button')
            .end();
    });
});