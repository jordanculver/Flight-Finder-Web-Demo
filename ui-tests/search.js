const expect = require('chai').expect;
const { EventEmitter } = require('events');

describe('Clicking Search Button', () => {
    beforeEach(async (browser, done) => {
        EventEmitter.defaultMaxListeners = 100;
        done();
    });

    afterEach(async (browser, done) => {
        EventEmitter.defaultMaxListeners = 10;
        done();
    });

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

    it('displays flight cards with given destination', async (browser) => {
        browser
            .url(`file:///${process.env.PWD}/index.html`)
            .waitForElementVisible('body');
        browser.expect.element('#search-results').to.be.present;
        browser.expect.elements('li').count.to.equal(0);
        browser.setValue('#destination-input', 'JFK');
        browser.click('#flight-search-button', () => {
            browser.getText('.originAndDestinations', (text) => {
                expect(text.value).to.contain('JFK');
            });
        });
        browser.end();
    });

    // TODO: Add requirement for date timezone issue
    it('displays flight cards with given departure date', async (browser) => {
        browser
            .url(`file:///${process.env.PWD}/index.html`)
            .waitForElementVisible('body');
        browser.expect.element('#search-results').to.be.present;
        browser.expect.elements('li').count.to.equal(0);
        browser.click('#flight-search-button', () => {
            browser.getText('.departureDates', (text) => {
                expect(text.value).to.contain('Thu Sep 11 1980');
            });
        });
        browser.end();
    });

    it('replaces previous flight cards when searching multiple times', async (browser) => {
        browser
            .url(`file:///${process.env.PWD}/index.html`)
            .waitForElementVisible('body');
        browser.expect.element('#search-results').to.be.present;
        browser.expect.elements('li').count.to.equal(0);
        browser.click('#flight-search-button', () => {
            browser.expect.elements('li').count.to.not.equal(0);
            browser.setValue('#origin-input', 'DFW');
            browser.setValue('#destination-input', 'DEN');
            browser.click('#flight-search-button', () => {
                browser.expect.elements('li').count.to.equal(0);
            });
        });
        browser.end();
    });
});