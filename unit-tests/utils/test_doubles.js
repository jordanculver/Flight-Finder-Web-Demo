class FakeElement {
    constructor(type, textContent) {
        this.childElements = [];
        this.childElementCount = 0;
        this.firstChild;
        this.type = type || '';
        this.textContent = textContent || '';
        this.classList = new FakeDOMTokenList();
    }

    appendChild(element) {
        this.childElements.push(element);
        this.childElementCount++;
    }

    removeChild(firstChildElement) {
        this.childElements.pop();
        this.childElementCount = this.childElements.length;
        this.firstChild = this.childElements[0];
    }
}

class FakeDocument {
    constructor() {
        this.fakeElementsFromGetElementById = [];
        this.fakeElementsFromCreateElement = [];
        this.fakeElementsFromCreateTextNode = [];
    }

    getElementById() {
        const fakeElement = new FakeElement('LI');
        this.fakeElementsFromGetElementById.push(fakeElement);
        return fakeElement;
    }

    createElement(type) {
        const fakeElement = new FakeElement(type);
        this.fakeElementsFromCreateElement.push(fakeElement);
        return fakeElement;
    }

    createTextNode(data) {
        const fakeElement = new FakeElement('', data);
        this.fakeElementsFromCreateElement.push(fakeElement);
        return fakeElement;
    }
}

class FakeDOMTokenList {
    constructor() {
        this.classes = [];
    }

    add(...classes) {
        classes.forEach(clazz => this.classes.push(clazz));
    }
}

class XMLHttpRequest {
    constructor() {
        this.requests = [];
        this.withCredentials = false;
        this.readyState = ''
        this.DONE = 'DONE'
        if (XMLHttpRequest.instances) {
            XMLHttpRequest.instances.push(this);
        } else {
            XMLHttpRequest.instances = [];
            XMLHttpRequest.instances.push(this);
        }

        XMLHttpRequest.lastInstance = () => {
            return this;
        }

        XMLHttpRequest.clearInstances = () => {
            XMLHttpRequest.instances = [];
        }
    }

    nextInstanceShouldReturn(statusCode, response, readyState) {
        XMLHttpRequest.nextInstanceSteps = {
            statusCode: statusCode,
            response: response,
            readyState: readyState
        };
    }

    open(requestMethod, requestUrl) {
        this.requests.push(requestUrl);
    }

    addEventListener(state, callback) {
        this.callback = callback;
    }

    buildFakeResponse(response) {
        if (response) {
            return JSON.stringify(response);
        }
        return JSON.stringify([
            {
                flightNumber: '7656',
                origin: {
                    code: 'DFW',
                    city: 'Dallas-Fort Worth',
                    location: {
                        latitude: 32.8998,
                        longitude: 97.0403
                    }
                },
                destination: {
                    code: 'ORD',
                    city: 'Chicago',
                    location: {
                        latitude: 41.9742,
                        longitude: 87.9073
                    }
                },
                duration: {
                    hours: 2,
                    minutes: 17
                }
            }
        ]);
    }

    buildFakeStatus(status) {
        if (status) {
            return status;
        }
        return 200;
    }

    buildFakeReadyState(state) {
        if (state) {
            return state;
        }
        return this.DONE;
    }

    send() {
        if (XMLHttpRequest.nextInstanceSteps) {
            this.readyState = XMLHttpRequest.nextInstanceSteps.readyState;
            this.status = XMLHttpRequest.nextInstanceSteps.statusCode;
            this.response = XMLHttpRequest.nextInstanceSteps.response;
            this.callback();
            XMLHttpRequest.nextInstanceSteps = undefined;
            return;
        }

        this.readyState = this.buildFakeReadyState();
        this.status = this.buildFakeStatus();
        this.response = this.buildFakeResponse();
        this.callback();
    }
}

class Window {
    constructor() {
        this.test = true;
    }
}

module.exports = { FakeElement, FakeDOMTokenList, FakeDocument, XMLHttpRequest, Window };