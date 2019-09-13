# Web Demo
A Simple Web Application Demonstrating the use of American Airlines' Flight-Engine API

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

---
**Table of Contents**

- [What does this App look like?](#user_interface)
- [How do I run this App?](#running_this_app)
- [How do I do run the Tests?](#tests_are_the_best)
- [How do I make Network calls?](#network_calls)

---

## What does this App look like? <a name="user_interface"></a>
![FlightFinderAppScreenShot](doc_assets/app_screenshot.png)

---
## How do I run this App? <a name="running_this_app"></a>
With ease of course! Before running this app, make sure you've set everything up with the [Flight-Engine](https://github.com/AmericanAirlines/Flight-Engine) and its running on your computer. Below are a few ways you can get started:

- Open the [index.html](index.html) in your favorite browser like Google Chrome, Mozilla Firefox, or if you're really desperate, Safari or Internet Explorer. Prepare to be amazed! Because that's all you have to do.

- Deploy your own version of this app to Heroku by pressing that cool purple button at the top of this document. All you need is to make some free login credentials and you can access the web demo anywhere! 
    
    - For more info, go see how deploying with [Heroku with git](https://devcenter.heroku.com/articles/git) can be a walk in the park

- If you need this deployed with [Node.JS](https://nodejs.org/en/docs/guides/getting-started-guide/) or similar, follow the below steps:

    - Go download the [Node.JS runtime](https://nodejs.org/en/download/) for your specific Operating System. Checkout this [getting started guide](https://nodejs.org/en/docs/guides/getting-started-guide/) if you aren't familiar with working with Node or the [Node Package Manager](https://docs.npmjs.com/about-npm/)
    
    - From your favorite terminal or command prompt, run the below commands one after another:
        ```sh
        $ cd CLONED_WORKSPACE/
        $ npm install
        $ node_modules/harp/bin/harp server --port 4000
        ```
        After running those commands you should see a message saying your server is listening at `http://localhost:4000`. Go ahead and try copy/pasting that into your favorite browser. You should now be able to see and interact with the demo!

---
## How do I run the Tests? <a name="tests_are_the_best"></a>
I'm so glad you asked! Before proceeding to the next steps, be sure to download the [Node.JS runtime](https://nodejs.org/en/download/) for your specific Operating System and checkout this [getting started guide](https://nodejs.org/en/docs/guides/getting-started-guide/) if you aren't familiar with working with Node or the [Node Package Manager](https://docs.npmjs.com/about-npm/)

```sh
    $ npm install # Install all the Node goodies/packages
    $ npm test # Runs all unit tests defined in the directory unit-tests/
    $ npm run uitest # Runs all of the User-Interface or Integration Tests defined in ui-tests/
```
---

## How do I make Network calls? <a name="network_calls"></a>
Join Linkedin today. Not that kind of network! [Checkout this HTTP overview though](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview), its like totally the bomb dot com! Below are just a few examples of how to make these requests so you can tap in to the thousands of different kinds of resources at your fingertips! Don't believe me? [Checkout this directory of available APIs online](https://www.programmableweb.com/apis/directory) or better yet, think of a subject and slap API at the end of it and see what your favorite search engine spits out.

### HTTP GET Request Examples

When you need to access or get some information from a service provider you can make a Network request over the HTTP protocol with the Method GET, some query parameters, and a url. Below are just a few ways you can make that happen.

- An easy way to make an HTTP GET request is with some simple javascript running in a browser. Keep in mind though that if you're using Node.js, the [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) is not defined by default but [here's an npm package workaround for that](https://www.npmjs.com/package/xmlhttprequest)
    ```javascript
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });

    xhr.open("GET", "http://localhost:3030/flights?origin=&date=2019-09-11");

    xhr.send(data);
    ```

- Using Node.js you can make the same HTTP GET request as the above given you first install the [Unirest npm package](http://unirest.io/nodejs.html) in your project.
    ```javascript
    var unirest = require("unirest");

    var req = unirest("GET", "http://localhost:3030/flights");

    req.query({
        "origin": "",
        "date": "2019-09-11"
    });

    req.end(function (res) {
    if (res.error) throw new Error(res.error);
        console.log(res.body);
    });
    ```

### HTTP POST Request Examples

But what happens when you don't need to search, query, or ask for information but instead need to send information to another service provider? Well you're in luck, you can make a Network request over the same HTTP protocol with a different Method known as POST, a url, and a [JSON](https://en.wikipedia.org/wiki/JSON) or [XML](https://en.wikipedia.org/wiki/XML) formatted body with the information you'd like to send. Below are just a few examples of how to go about doing just that with Javascript.

- Similar to the GET example, this relies on regular old Javascript in a browser.
    ```javascript
    var data = JSON.stringify({
        "flightNumber": "0123",
        "origin": "DFW",
        "destination": "DEN",
        "departureDate": "2019-09-11"
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://A_URL/flights");
    xhr.setRequestHeader("content-type", "application/json");

    xhr.send(data);
    ```

- Another similar example to it's GET counterpart, using the Node.js package [Unirest](http://unirest.io/nodejs.html)
    ```javascript
    var unirest = require("unirest");

    var req = unirest("POST", "http://A_URL/flights");

    req.query({
        "origin": "",
        "date": "2019-09-11"
    });

    req.headers({
        "content-type": "application/json"
    });

    req.type("json");
    req.send({
        "flightNumber": "0123",
        "origin": "DFW",
        "destination": "DEN",
        "departureDate": "2019-09-11"
    });

    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        console.log(res.body);
    });
    ```

#### For more information regarding HTTP and some standards on its use [checkout the REST Architecture for Web Services](https://en.wikipedia.org/wiki/Representational_state_transfer)

---