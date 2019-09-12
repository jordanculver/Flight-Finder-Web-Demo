const expect = require('chai').expect;
const itParam = require('mocha-param').itParam;
const { FakeDocument, Window, XMLHttpRequest } = require('./utils/test_doubles.js');

describe('FlightsFinder', () => {
    let fakeDocument = new FakeDocument();
    let FlightsFinder;

    beforeEach(() => {
        global.window = new Window();
        global.document = fakeDocument;
        global.XMLHttpRequest = XMLHttpRequest;
        FlightsFinder = require('../index.js');
    });

    afterEach(() => {
        fakeDocument = new FakeDocument();
        global.XMLHttpRequest.clearInstances();
    });

    describe('constructor', () => {
        it('uses localhost:3030 for accessing the Flight-Engine API', () => {
            const flightsFinder = new FlightsFinder();
            flightsFinder.searchFlights();
            expect(fakeDocument.fakeElementsFromGetElementById.length).not.to.equal(0);
            expect(XMLHttpRequest.instances.length).to.be.greaterThan(0);
            expect(XMLHttpRequest.lastInstance().requests.length).to.equal(1);
            expect(XMLHttpRequest.lastInstance().requests[0]).to.contain('http://localhost:3030');
        });

        it('uses argument as endpoint for accessing the Flight-Engine API', () => {
            const flightsFinder = new FlightsFinder('https://this_is_a_real_url_nah_just_joking.jk.com');
            flightsFinder.searchFlights();
            expect(fakeDocument.fakeElementsFromGetElementById.length).not.to.equal(0);
            expect(XMLHttpRequest.instances.length).to.be.greaterThan(0);
            expect(XMLHttpRequest.lastInstance().requests.length).to.equal(1);
            expect(XMLHttpRequest.lastInstance().requests[0])
                .to.contain('https://this_is_a_real_url_nah_just_joking.jk.com');
        });
    });
});