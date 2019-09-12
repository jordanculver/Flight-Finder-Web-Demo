class FlightsFinder {
    constructor(flightEngineApiEndpoint) {
        this.flightEngineApiEndpoint = flightEngineApiEndpoint || 'http://localhost:3030';
    }

    searchFlights(originAirport, destinationAirport, departureDate) {
        this.fetchFlights(originAirport, destinationAirport, departureDate, (flights) => {
            if (flights.length > 0) {
                const flightResultsList = document.getElementById('search-results');
                this.removeFlightCards(flightResultsList);
                this.buildFlightCards(flights, departureDate).forEach(flightCard => {
                    flightResultsList.appendChild(flightCard);
                });
                return;
            }
            const flightResultsList = document.getElementById('search-results');
            this.removeFlightCards(flightResultsList);
        });
    }

    fetchFlights(originAirport, destinationAirport, departureDate, responseCallback) {
        var xhr = new XMLHttpRequest();
        // xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState !== this.DONE) {
                return;
            }

            if (this.status >= 300 || this.response === undefined || this.response === '') {
                responseCallback([]);
                return;
            }

            const flights = JSON.parse(this.response);
            responseCallback(flights ? flights.slice(0, 5) : []);
        });
        const originAirportParameter = originAirport ? `&origin=${originAirport}` : '';
        const destinationAirportParameter = destinationAirport ? `&destination=${destinationAirport}` : '';
        const departureDateParameter = departureDate ? `?date=${departureDate}` : `?date=${new Date().toISOString().slice(0, 10)}`;

        xhr.open("GET", `${this.flightEngineApiEndpoint}/flights${departureDateParameter}${originAirportParameter}${destinationAirportParameter}`);

        xhr.send(null);
    }

    buildFlightCards(flights, departureDate) {
        return flights.map(flight => {
            const flightCard = document.createElement('LI');
            flightCard.classList.add('flex', 'items-right', 'lh-copy', 'pa3', 'ph0-l', 'bb', 'b--black-10');
            flightCard.appendChild(this.buildArticle(flight, departureDate));
            return flightCard;
        });
    }

    buildArticle(flight, departureDate) {
        const article = document.createElement('ARTICLE');
        article.classList.add('center', 'mw5', 'mw6-ns', 'hidden', 'ba', 'mv4');
        article.appendChild(this.buildFlightNumberHeader(flight.flightNumber));
        article.appendChild(this.buildFlightContentSection(flight, departureDate));
        return article;
    }

    buildFlightNumberHeader(flightNumber) {
        const header = document.createElement('H1');
        header.classList.add('f4', 'bg-near-black', 'white', 'mv0', 'pv2', 'ph3');
        header.appendChild(document.createTextNode(`Flight #: ${flightNumber}`));
        return header;
    }

    buildFlightContentSection(flight, departureDate) {
        const flightContent = document.createElement('DIV');
        flightContent.classList.add('pa3', 'bt');
        flightContent.appendChild(this.buildDepartureDateParagraph(departureDate));
        flightContent.appendChild(this.buildOriginAndDestinationParagraph(flight));
        flightContent.appendChild(this.buildDurationParagraph(flight));
        return flightContent;
    }

    buildDepartureDateParagraph(departureDate) {
        const paragraph = document.createElement('P');
        paragraph.classList.add('f6', 'f5-ns', 'lh-copy', 'measure', 'mv0', 'departureDates');
        const text = document.createTextNode(`${new Date(departureDate).toDateString()}`);
        paragraph.appendChild(text);
        return paragraph;
    }
    
    buildOriginAndDestinationParagraph(flight) {
        const paragraph = document.createElement('P');
        paragraph.classList.add('f6', 'f5-ns', 'lh-copy', 'measure', 'mv0', 'originAndDestinations');
        const text = document.createTextNode(`Departs from ${flight.origin.city} (${flight.origin.code}) to ${flight.destination.city} (${flight.destination.code})`);
        paragraph.appendChild(text);
        return paragraph;
    }

    buildDurationParagraph(flight) {
        const paragraph = document.createElement('P');
        paragraph.classList.add('f6', 'f5-ns', 'lh-copy', 'measure', 'mv0');
        const text = document.createTextNode(`and takes about ${flight.duration.hours} hours and ${flight.duration.minutes} minutes to get there`);
        paragraph.appendChild(text);
        return paragraph;
    }

    removeFlightCards(flightResultsList) {
        if (flightResultsList.childElementCount > 0) {
            while (flightResultsList.firstChild) {
                flightResultsList.removeChild(flightResultsList.firstChild);
            }
        }
    }
}

if (window.test) {
    module.exports = FlightsFinder;
}