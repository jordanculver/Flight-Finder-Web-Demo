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
            return XMLHttpRequest.instances[XMLHttpRequest.instances.length - 1];
        }
    }

    nextInstanceShouldReturn(statusCode, response) {
        XMLHttpRequest.nextInstanceSteps = {
            statusCode: statusCode,
            response: response
        };
    }

    open(requestMethod, requestUrl) {
        this.requests.push(requestUrl);
    }

    addEventListener(state, callback) {
        this.callback = callback;
    }

    send() {
        this.readyState = this.DONE;
        this.status = XMLHttpRequest.nextInstanceSteps ? XMLHttpRequest.nextInstanceSteps.statusCode : 200;
        this.response = XMLHttpRequest.nextInstanceSteps ? JSON.stringify(XMLHttpRequest.nextInstanceSteps.response) : JSON.stringify([
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
        this.callback();
        XMLHttpRequest.nextInstanceSteps = undefined;
    }
}

class Window {
    constructor() {
        this.test = true;
    }
}

module.exports = { FakeElement, FakeDOMTokenList, FakeDocument, XMLHttpRequest, Window };