const expect = require('chai').expect;
const itParam = require('mocha-param').itParam;
const { FakeDocument, Window, XMLHttpRequest } = require('./utils/test_doubles.js');

describe('searchFlights()', () => {
    let fakeDocument = new FakeDocument();
    let flightsFinder;

    beforeEach(() => {
        global.window = new Window();
        global.document = fakeDocument;
        global.XMLHttpRequest = XMLHttpRequest;
        const FlightsFinder = new require('../index.js');
        flightsFinder = new FlightsFinder();
    });

    afterEach(() => {
        fakeDocument = new FakeDocument();
        global.XMLHttpRequest.clearInstances();
    });

    const getAllArticleFlightCards = () => {
        return fakeDocument.fakeElementsFromGetElementById[0]
            .childElements.reduce((flightCards, flightCardListItem) =>
                flightCards.concat(flightCardListItem.childElements.map(articleFlightCard => articleFlightCard)), []);
    }

    describe('with no arguments', () => {
        it('returns flights (li elements) with flight numbers', () => {
            flightsFinder.searchFlights();
            expect(fakeDocument.fakeElementsFromGetElementById.length).not.to.equal(0);
            fakeDocument.fakeElementsFromGetElementById.forEach(unorderedListOfFlightCards => {
                unorderedListOfFlightCards.childElements.forEach(flightCardListItem => {
                    expect(flightCardListItem.childElements.length, 'No child elements for LI (flight card)').not.to.equal(0);
                    flightCardListItem.childElements.forEach(articleFlightCard => {
                        expect(articleFlightCard.childElements.length, 'No child elements for Article in each flight card').not.to.equal(0);
                        const flightNumberHeader = articleFlightCard.childElements[0];
                        expect(flightNumberHeader.childElements[0].textContent).not.to.equal('');
                        expect(flightNumberHeader.childElements[0].textContent).not.to.be.null;
                        expect(flightNumberHeader.childElements[0].textContent).not.to.be.undefined;
                    });
                });
            });
        });

        it('returns flights (li elements) with origin airport codes', () => {
            flightsFinder.searchFlights();
            expect(fakeDocument.fakeElementsFromGetElementById.length).not.to.equal(0);
            getAllArticleFlightCards().forEach(articleFlightCard => {
                const originAndDestinationParagraphText = articleFlightCard.childElements[1].childElements[1].childElements[0];
                expect(originAndDestinationParagraphText.textContent).not.to.equal('');
                expect(originAndDestinationParagraphText.textContent).to.contain('to ');
            });
        });

        it('returns flights (li elements) with destination airport codes', () => {
            flightsFinder.searchFlights();
            expect(fakeDocument.fakeElementsFromGetElementById.length).not.to.equal(0);
            getAllArticleFlightCards().forEach(articleFlightCard => {
                const originAndDestinationParagraphText = articleFlightCard.childElements[1].childElements[1].childElements[0];
                expect(originAndDestinationParagraphText.textContent).not.to.equal('');
                expect(originAndDestinationParagraphText.textContent).to.contain('from ');
            });
        });

        it('returns flights (li elements) with estimated duration', () => {
            flightsFinder.searchFlights();
            expect(fakeDocument.fakeElementsFromGetElementById.length).not.to.equal(0);
            getAllArticleFlightCards().forEach(articleFlightCard => {
                const durationParagraphText = articleFlightCard.childElements[1].childElements[2].childElements[0];
                expect(durationParagraphText.textContent).not.to.equal('');
                expect(durationParagraphText.textContent).to.contain('and takes about ');
                expect(durationParagraphText.textContent).to.contain(' hours ');
                expect(durationParagraphText.textContent).to.contain(' and ');
                expect(durationParagraphText.textContent).to.contain(' minutes to get there');
            });
        });
    });

    describe('with origin', () => {
        const originScenarios = ['ORD', 'DFW', 'LLC', 'ABC'];

        itParam('returns flights with given origin', originScenarios, (originAirportCode) => {
            flightsFinder.searchFlights(originAirportCode);
            expect(fakeDocument.fakeElementsFromGetElementById.length).not.to.equal(0);
            expect(XMLHttpRequest.instances.length).to.be.greaterThan(0);
            expect(XMLHttpRequest.lastInstance().requests.length).to.equal(1);
            expect(XMLHttpRequest.lastInstance().requests[0]).to.contain(`&origin=${originAirportCode}`);
        });

        it('returns flights with random origins when given empty string literal', () => {
            flightsFinder.searchFlights('');
            expect(fakeDocument.fakeElementsFromGetElementById.length).not.to.equal(0);
            expect(XMLHttpRequest.instances.length).to.be.greaterThan(0);
            expect(XMLHttpRequest.lastInstance().requests.length).to.equal(1);
            expect(XMLHttpRequest.lastInstance().requests[0]).not.to.contain('&origin=');
        });

        it('returns flights with random origins when given null', () => {
            flightsFinder.searchFlights(null);
            expect(fakeDocument.fakeElementsFromGetElementById.length).not.to.equal(0);
            expect(XMLHttpRequest.instances.length).to.be.greaterThan(0);
            expect(XMLHttpRequest.lastInstance().requests.length).to.equal(1);
            expect(XMLHttpRequest.lastInstance().requests[0]).not.to.contain('&origin=');
        });

        it('returns flights with random origins when given undefined', () => {
            flightsFinder.searchFlights();
            expect(fakeDocument.fakeElementsFromGetElementById.length).not.to.equal(0);
            expect(XMLHttpRequest.instances.length).to.be.greaterThan(0);
            expect(XMLHttpRequest.lastInstance().requests.length).to.equal(1);
            expect(XMLHttpRequest.lastInstance().requests[0]).not.to.contain('&origin=');
        });
    });

    describe('with destination', () => {
        const destinationScenarios = ['ORD', 'DFW', 'LLC', 'ABC'];

        itParam('returns flights with given destination', destinationScenarios, (destinationAirportCode) => {
            flightsFinder.searchFlights('ORD', destinationAirportCode);
            expect(fakeDocument.fakeElementsFromGetElementById.length).not.to.equal(0);
            expect(XMLHttpRequest.instances.length).to.be.greaterThan(0);
            expect(XMLHttpRequest.lastInstance().requests.length).to.equal(1);
            expect(XMLHttpRequest.lastInstance().requests[0]).to.contain(`&destination=${destinationAirportCode}`);
        });

        it('returns flights with random origins when given empty string literal', () => {
            flightsFinder.searchFlights('ORD', '');
            expect(fakeDocument.fakeElementsFromGetElementById.length).not.to.equal(0);
            expect(XMLHttpRequest.instances.length).to.be.greaterThan(0);
            expect(XMLHttpRequest.lastInstance().requests.length).to.equal(1);
            expect(XMLHttpRequest.lastInstance().requests[0]).not.to.contain('&destination=');
        });

        it('returns flights with random origins when given null', () => {
            flightsFinder.searchFlights('ORD', null);
            expect(fakeDocument.fakeElementsFromGetElementById.length).not.to.equal(0);
            expect(XMLHttpRequest.instances.length).to.be.greaterThan(0);
            expect(XMLHttpRequest.lastInstance().requests.length).to.equal(1);
            expect(XMLHttpRequest.lastInstance().requests[0]).not.to.contain('&destination=');
        });

        it('returns flights with random origins when given undefined', () => {
            flightsFinder.searchFlights('ORD', undefined);
            expect(fakeDocument.fakeElementsFromGetElementById.length).not.to.equal(0);
            expect(XMLHttpRequest.instances.length).to.be.greaterThan(0);
            expect(XMLHttpRequest.lastInstance().requests.length).to.equal(1);
            expect(XMLHttpRequest.lastInstance().requests[0]).not.to.contain('&destination=');
        });
    });

    describe('with origin and destination', () => {
        const originAndDestinationScenarios = [
            { origin: 'ORD', destination: 'FRE' },
            { origin: 'DFW', destination: 'TMD' },
            { origin: 'LLC', destination: 'QWE' },
            { origin: 'ABC', destination: 'OIU' }
        ]

        itParam('returns flights with given origin/destination', originAndDestinationScenarios, (airportCodes) => {
            flightsFinder.searchFlights(airportCodes.origin, airportCodes.destination);
            expect(fakeDocument.fakeElementsFromGetElementById.length).not.to.equal(0);
            expect(XMLHttpRequest.instances.length).to.be.greaterThan(0);
            expect(XMLHttpRequest.lastInstance().requests.length).to.equal(1);
            expect(XMLHttpRequest.lastInstance().requests[0]).to.contain(`&origin=${airportCodes.origin}`);
            expect(XMLHttpRequest.lastInstance().requests[0]).to.contain(`&destination=${airportCodes.destination}`);
        });

        it('returns flights with random origins/destinations when given null', () => {
            flightsFinder.searchFlights(null, null);
            expect(fakeDocument.fakeElementsFromGetElementById.length).not.to.equal(0);
            expect(XMLHttpRequest.instances.length).to.be.greaterThan(0);
            expect(XMLHttpRequest.lastInstance().requests.length).to.equal(1);
            expect(XMLHttpRequest.lastInstance().requests[0]).not.to.contain('&origin=');
            expect(XMLHttpRequest.lastInstance().requests[0]).not.to.contain('&destination=');
        });

        it('returns flights with random origins/destinations when given undefined', () => {
            flightsFinder.searchFlights(undefined, undefined);
            expect(fakeDocument.fakeElementsFromGetElementById.length).not.to.equal(0);
            expect(XMLHttpRequest.instances.length).to.be.greaterThan(0);
            expect(XMLHttpRequest.lastInstance().requests.length).to.equal(1);
            expect(XMLHttpRequest.lastInstance().requests[0]).not.to.contain('&origin=');
            expect(XMLHttpRequest.lastInstance().requests[0]).not.to.contain('&destination=');
        });
    });

    describe('with date', () => {
        const dateScenarios = ['1980-09-12', '2902-12-30', '2019-02-03', '0001-01-01'];

        itParam('returns flights on given year/month/day', dateScenarios, (date) => {
            flightsFinder.searchFlights('DFW', 'ORD', date);
            expect(fakeDocument.fakeElementsFromGetElementById.length).not.to.equal(0);
            expect(XMLHttpRequest.instances.length).to.be.greaterThan(0);
            expect(XMLHttpRequest.lastInstance().requests.length).to.equal(1);
            expect(XMLHttpRequest.lastInstance().requests[0]).to.contain(`?date=${date}`);
        });

        it('returns flights with default date (today) when given null', () => {
            flightsFinder.searchFlights('DFW', 'ORD', null);
            expect(fakeDocument.fakeElementsFromGetElementById.length).not.to.equal(0);
            expect(XMLHttpRequest.instances.length).to.be.greaterThan(0);
            expect(XMLHttpRequest.lastInstance().requests.length).to.equal(1);
            const todaysDate = new Date().toISOString().slice(0, 10);
            expect(XMLHttpRequest.lastInstance().requests[0]).to.contain(`?date=${todaysDate}`);
        });

        it('returns flights with default date when given undefined', () => {
            flightsFinder.searchFlights('DFW', 'ORD', undefined);
            expect(fakeDocument.fakeElementsFromGetElementById.length).not.to.equal(0);
            expect(XMLHttpRequest.instances.length).to.be.greaterThan(0);
            expect(XMLHttpRequest.lastInstance().requests.length).to.equal(1);
            const todaysDate = new Date().toISOString().slice(0, 10);
            expect(XMLHttpRequest.lastInstance().requests[0]).to.contain(`?date=${todaysDate}`);
        });
    });

    describe('API dependencies', () => {
        describe('fails', () => {
            const apiResponseScenarios = [400, 404, 403, 405, 500, 503, 501];

            itParam('returns empty list of flights (li elements) when service fails', apiResponseScenarios, (statusCode) => {
                const request = new XMLHttpRequest();
                request.nextInstanceShouldReturn(statusCode, 'Stacktrace text');
                flightsFinder.searchFlights();
                expect(fakeDocument.fakeElementsFromGetElementById.length).to.equal(0);
            });

            it('returns empty list of flights (li elements) when null returned from API', () => {
                const request = new XMLHttpRequest();
                request.nextInstanceShouldReturn(200, null);
                flightsFinder.searchFlights();
                expect(fakeDocument.fakeElementsFromGetElementById.length).to.equal(0);
            });

            it('returns empty list of flights (li elements) when undefined returned from API', () => {
                const request = new XMLHttpRequest();
                request.nextInstanceShouldReturn(200, undefined);
                flightsFinder.searchFlights();
                expect(fakeDocument.fakeElementsFromGetElementById.length).to.equal(0);
            });

            it('returns empty list of flights (li elements) when empty string literal returned from API', () => {
                const request = new XMLHttpRequest();
                request.nextInstanceShouldReturn(200, '');
                flightsFinder.searchFlights();
                expect(fakeDocument.fakeElementsFromGetElementById.length).to.equal(0);
            });
        });

        describe('http state changes', () => {
            it('return only when state is done/finished', () => {
                const request = new XMLHttpRequest();
                request.nextInstanceShouldReturn(200, undefined, 'NOT_EVEN_CLOSE_TO_BEING_DONE');
                let invocationCount = 0;
                flightsFinder.fetchFlights(undefined, undefined, undefined, (flights) => {
                    invocationCount++;
                });
                expect(invocationCount).to.equal(0);
            });
        });
    });
});