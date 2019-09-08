describe('Navigation Header', () => {
    it('has Flight Finder title', (browser) => {
        browser
            .url(`file:///${process.env.PWD}/index.html`)
            .waitForElementVisible('body')
            .assert.title('Flight Finder: A Flight-Engine Demo')
            .end();
    });

    it('has Header tag', (browser) => {
        browser
            .url(`file:///${process.env.PWD}/index.html`)
            .waitForElementVisible('body');
        browser.expect.element('header').to.be.a('header');
        browser.end();
    });

    it('has Navigation header tag', (browser) => {
        browser
            .url(`file:///${process.env.PWD}/index.html`)
            .waitForElementVisible('body');
        browser.expect.element('header nav').to.be.a('nav');
        browser.end();
    });

    it('Home link forwards to /index.html page when clicked', async (browser) => {
        browser
            .url(`file:///${process.env.PWD}/index.html`)
            .waitForElementVisible('body')
            .click({
                selector: '#home-link',
                timeout: 2000
            })
            .assert.urlContains('/index.html')
            .end();
    });

    it('API Usage Docs link forwards to /api_usage.html page when clicked', async (browser) => {
        browser
            .url(`file:///${process.env.PWD}/index.html`)
            .waitForElementVisible('body')
            .click({
                selector: '#api-usage-link',
                timeout: 2000
            })
            .assert.urlContains('/api_usage.html')
            .end();
    });
    
    it('Flight Engine Repo link forwards to https://github.com/AmericanAirlines/Flight-Engine page when clicked', async (browser) => {
        browser
            .url(`file:///${process.env.PWD}/index.html`)
            .waitForElementVisible('body')
            .click({
                selector: '#flight-engine-repo-link',
                timeout: 2000
            })
            .assert.urlEquals('https://github.com/AmericanAirlines/Flight-Engine')
            .end();
    });
});