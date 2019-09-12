const { FakeDocument, Window, XMLHttpRequest } = require('./utils/test_doubles.js');
const expect = require('chai').expect;

describe('buildFlightCards()', () => {
    let fakeDocument = new FakeDocument();
    let flightsFinder;
    const testData = [
        {
            flightNumber: '1234',
            origin: {
                code: 'DFW',
                city: 'Dallas-Fort Worth'
            },
            destination: {
                code: 'ORD',
                city: 'Chicago'
            },
            duration: {
                hours: 2,
                minutes: 3
            }
        },
        {
            flightNumber: '543',
            origin: {
                code: 'FRE',
                city: 'Free as in Freedom'
            },
            destination: {
                code: 'DEN',
                city: 'Denver'
            },
            duration: {
                hours: 4,
                minutes: 13
            }
        },
        {
            flightNumber: '32',
            origin: {
                code: 'LAS',
                city: 'Las Vegas'
            },
            destination: {
                code: 'TUL',
                city: 'TuSomething'
            },
            duration: {
                hours: 1,
                minutes: 45
            }
        }
    ]

    beforeEach(() => {
        global.window = new Window();
        global.document = fakeDocument;
        global.XMLHttpRequest = XMLHttpRequest;
        const FlightsFinder = new require('../index.js');
        flightsFinder = new FlightsFinder();
    });

    afterEach(() => {
        fakeDocument = new FakeDocument();
    });

    it('returns flight cards (li elements)', () => {
        const flightCards = flightsFinder.buildFlightCards(testData);
        expect(flightCards.length).to.equal(testData.length);
        flightCards.forEach((flightCard) => {
            expect(flightCard.type).to.equal('LI');
            expect(flightCard.classList.classes.join(' ')).to.equal('flex items-right lh-copy pa3 ph0-l bb b--black-10');
        });
    });

    it('returns article elements inside flight cards (li elements)', () => {
        const flightCards = flightsFinder.buildFlightCards(testData);
        expect(flightCards.length).to.equal(testData.length);
        const articles = flightCards.map(flightCard => flightCard.childElements[0]);
        expect(articles.length).to.equal(testData.length);
        articles.forEach((article) => {
            expect(article.type).to.equal('ARTICLE');
            expect(article.classList.classes.join(' ')).to.equal('center mw5 mw6-ns hidden ba mv4');
        });
    });

    it('returns flight number in header for each article element', () => {
        const flightCards = flightsFinder.buildFlightCards(testData);
        expect(flightCards.length).to.equal(testData.length);
        const flightNumberHeaders = flightCards.map(flightCard => flightCard.childElements[0].childElements[0]);
        expect(flightNumberHeaders.length).to.equal(testData.length);
        flightNumberHeaders.forEach((header, index) => {
            expect(header.type).to.equal('H1');
            expect(header.classList.classes.join(' ')).to.equal('f4 bg-near-black white mv0 pv2 ph3');
            expect(header.childElements[0].textContent).to.equal(`Flight #: ${testData[index].flightNumber}`)
        });
    });

    it('returns division elements for each article element', () => {
        const flightCards = flightsFinder.buildFlightCards(testData);
        expect(flightCards.length).to.equal(testData.length);
        const divions = flightCards.map(flightCard => flightCard.childElements[0].childElements[1]);
        expect(divions.length).to.equal(testData.length);
        divions.forEach((division) => {
            expect(division.type).to.equal('DIV');
            expect(division.classList.classes.join(' ')).to.equal('pa3 bt');
        });
    });

    it('returns departure date paragraph elements for each division section', () => {
        const todaysDate = new Date();
        const flightCards = flightsFinder.buildFlightCards(testData, todaysDate.toISOString().slice(0, 10));
        expect(flightCards.length).to.equal(testData.length);
        const departureDateParagraphs = flightCards.map(flightCard => flightCard.childElements[0].childElements[1].childElements[0]);
        expect(departureDateParagraphs.length).to.equal(testData.length);
        departureDateParagraphs.forEach((departureDateParagraph) => {
            expect(departureDateParagraph.type).to.equal('P');
            expect(departureDateParagraph.classList.classes.join(' ')).to.equal('f6 f5-ns lh-copy measure mv0 departureDates');
            // TODO: Fix timezone error
            const expectedDate = new Date((new Date()).valueOf() - 24*60*60*1000)
            expect(departureDateParagraph.childElements[0].textContent).to.equal(`${expectedDate.toDateString()}`);
        });
    });

    it('returns origin and destination paragraph elements for each division section', () => {
        const flightCards = flightsFinder.buildFlightCards(testData);
        expect(flightCards.length).to.equal(testData.length);
        const originAndDepartureParagraphs = flightCards.map(flightCard => flightCard.childElements[0].childElements[1].childElements[1]);
        expect(originAndDepartureParagraphs.length).to.equal(testData.length);
        originAndDepartureParagraphs.forEach((originAndDestinationParagraph, index) => {
            expect(originAndDestinationParagraph.type).to.equal('P');
            expect(originAndDestinationParagraph.classList.classes.join(' ')).to.equal('f6 f5-ns lh-copy measure mv0 originAndDestinations');
            expect(originAndDestinationParagraph.childElements[0].textContent)
                .to.equal(`Departs from ${testData[index].origin.city} (${testData[index].origin.code}) to ${testData[index].destination.city} (${testData[index].destination.code})`);
        });
    });

    it('returns duration paragraph elements for each division section', () => {
        const flightCards = flightsFinder.buildFlightCards(testData);
        expect(flightCards.length).to.equal(testData.length);
        const durationParagraphs = flightCards.map(flightCard => flightCard.childElements[0].childElements[1].childElements[2]);
        expect(durationParagraphs.length).to.equal(testData.length);
        durationParagraphs.forEach((durationParagraph, index) => {
            expect(durationParagraph.type).to.equal('P');
            expect(durationParagraph.classList.classes.join(' ')).to.equal('f6 f5-ns lh-copy measure mv0');
            expect(durationParagraph.childElements[0].textContent)
                .to.equal(`and takes about ${testData[index].duration.hours} hours and ${testData[index].duration.minutes} minutes to get there`);
        });
    });
});