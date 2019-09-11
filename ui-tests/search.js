const expect = require('chai').expect;

describe.only('Clicking Search Button', () => {
    it('displays flight cards', async (browser) => {
        browser
            .url(`file:///${process.env.PWD}/index.html`)
            .waitForElementVisible('body');
        browser.expect.element('#search-results').to.be.present;
        browser.expect.elements('li').count.to.equal(0);
        browser.click('#flight-search-button', () => {
            browser.expect.elements('li').count.to.not.equal(0);
        });
        browser.end();
    });
    
    it('displays a max of 5 flight cards', async (browser) => {
        browser
            .url(`file:///${process.env.PWD}/index.html`)
            .waitForElementVisible('body');
        browser.expect.element('#search-results').to.be.present;
        browser.expect.elements('li').count.to.equal(0);
        browser.click('#flight-search-button', () => {
            browser.expect.elements('li').count.to.equal(5);
        });
        browser.end();
    });

    it('displays flight cards with given origin', async (browser) => {
        browser
            .url(`file:///${process.env.PWD}/index.html`)
            .waitForElementVisible('body');
        browser.expect.element('#search-results').to.be.present;
        browser.expect.elements('li').count.to.equal(0);
        browser.setValue('#origin-input', 'JFK');
        browser.click('#flight-search-button', () => {
            browser.getText('.originAndDestinations', (text) => {
                expect(text.value).to.contain('JFK');
            });
        });
        browser.end();
    });
    
    // TODO: Fix No element found exception for verifying destination used correctly
    it.skip('displays flight cards with given destination', async (browser) => {
        browser
            .url(`file:///${process.env.PWD}/index.html`)
            .waitForElementVisible('body');
        browser.expect.element('#search-results').to.be.present;
        browser.expect.elements('li').count.to.equal(0);
        browser.setValue('#destination-input', 'DEN');
        browser.click('#flight-search-button', () => {
            browser.getText('.originAndDestinations', (text) => {
                expect(text.value).to.contain('DEN');
            });
        });
        browser.end();
    });
    
    // TODO: No way to verify this at the moment
    it.skip('displays flight cards with given departure date', async (browser) => {
        browser
            .url(`file:///${process.env.PWD}/index.html`)
            .waitForElementVisible('body');
        browser.expect.element('#search-results').to.be.present;
        browser.expect.elements('li').count.to.equal(0);
        browser.setValue('#departure-date-input', '2019-09-11');
        browser.click('#flight-search-button', () => {
            browser.getText('.originAndDestinations', (text) => {
                expect(text.value).to.contain('2019-09-11');
            });
        });
        browser.end();
    });
});