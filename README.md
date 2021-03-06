# Web Demo
A Simple Web Application Demonstrating the use of American Airlines' Flight-Engine API

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

---
**Table of Contents**

- [What does this App look like?](#user_interface)
- [How do I run this App?](#running_this_app)
    - [How do I Change the endpoint used for the Flight-Engine API?](#changing_endpoint)
- [How do I do run the Tests?](#running_tests)
    - [Why are Tests so important?](#tests_are_the_best)
- [How do I make Network calls?](#network_calls)
    - [HTTP GET Request Examples](#http_get_examples)
    - [HTTP POST Request Examples](#http_post_examples)
- [How do I make buttons do things?](#dont_press_my_buttons)
- [I need my App to go to another page, How?!](#page_transitions)

---

## What does this App look like? <a name="user_interface"></a>
![FlightFinderAppScreenShot](doc_assets/app_screenshot.png)

---
## How do I run this App? <a name="running_this_app"></a>
With ease of course! Before running this app, make sure you've set everything up with the [Flight-Engine](https://github.com/AmericanAirlines/Flight-Engine) and it's running on your computer on port 3030. Below are a few ways you can get started:

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

### How do I Change the endpoint used for the Flight-Engine API? <a name="changing_endpoint"></a>

Clone this repository and open the [index.html](index.html) in a file editor of your choosing. Add your custom endpoint as the argument to the FlightFinder() class object in the script tag above. Save the file and [Deploy](#running_this_app) the application with whichever method of your choosing. Refer to the example below.

```html
<script>
    const flightsFinder = new FlightsFinder('https://YOUR_CUSTOM_URL_HERE.com');
</script>
```

---
## How do I run the Tests? <a name="running_tests"></a>
I'm so glad you asked! Before proceeding to the next steps, be sure to download the [Node.JS runtime](https://nodejs.org/en/download/) for your specific Operating System and checkout this [getting started guide](https://nodejs.org/en/docs/guides/getting-started-guide/) if you aren't familiar with working with Node or the [Node Package Manager](https://docs.npmjs.com/about-npm/)

```sh
    $ npm install # Install all the Node goodies/packages
    $ npm test # Runs all unit tests defined in the directory unit-tests/
    $ npm run uitest # Runs all of the User-Interface or Integration Tests defined in ui-tests/
```
### Why are Tests so important? <a name="tests_are_the_best"></a>

Another great question! If you've ever been in a design-thinking session coming up with the next big product customers can't live without, you probably noticed we came out of it with a list of things we wanted our product to solve. That list of things our product should do is called our product's requirements. What if we built this awesome product and it doesn't do anything? Does it meet our list of requirements? That's rhetorical, the answer is obviously no, it doesn't meet anyone's requirements. 

Now let me ask you another question, let's say a team of developers builds this amazing application with no Tests to speak of but it works and meets all the requirements they wanted. Now let's say that original team leaves or moves on to their next project and another team is tasked with making some changes or meeting some new requirements. How does the new team guarantee the original requirements of the product are still met? How do they know the greatest application in the world still works? Sort answer is they won't until they see something bad happen.

They have to manually make sure everything is in tip-top shape. This problem isn't that troublesome when the project is small but things always change and software will inevitably get bigger, more complicated, and thus increasingly more difficult to manually verify the product works and meets the ever expanding list of requirements.

Thats where Tests come in. Think of them as Executable Requirements! The backbone of quality code. Let's take a similar example with a team that builds an awesome product with tests representing everything their product should do. Do you think the next team to support and add new features needs to spend anytime at all wondering if their changes affect previous ones? Of course not, the only time needed is spent learning how to run a project's tests, writing new tests representing new technical and business requirements, and of course coding the features that accomplish those new requirements.

It's easy to see that as software grows and team members come and go, tests become more and more important to the speed of delivery and overall quality of software. Readers tend to read books that are written well and customers tend to use software that is too. In conclusion, tests are the best.

---

## How do I make Network calls? <a name="network_calls"></a>
Join Linkedin today. Not that kind of network! [Checkout this HTTP overview though](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview), it's like totally the bomb dot com! Below are just a few examples of how to make these requests so you can tap in to the thousands of different kinds of resources at your fingertips! Don't believe me? [Checkout this directory of available APIs online](https://www.programmableweb.com/apis/directory) or better yet, think of a subject and slap API at the end of it and see what your favorite search engine spits out.

### HTTP GET Request Examples <a name="http_get_examples"></a>

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

### HTTP POST Request Examples <a name="http_post_examples"></a>

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

## How do I make buttons do things? <a name="dont_press_my_buttons"></a>

There are quite a few ways of making buttons do things but the basic way is to first make a [button tag](https://www.w3schools.com/tags/tag_button.asp) in your [HTML](https://www.w3schools.com/html/default.asp) file and add an [onclick](https://www.w3schools.com/jsref/event_onclick.asp) attribute to it. 

```html
<button onclick="">Wake me up!</button>
```

You'll need to define a [Javascript](https://www.w3schools.com/js/) file and declare or import it into your HTML file in a [script tag](https://www.w3schools.com/tags/tag_script.asp). 

```html
<script src="YOUR_JAVASCRIPT_FILE.js"></script>
```

In that Javascript file, define a [function](https://www.w3schools.com/js/js_functions.asp) and write some really cool code inside!

```javascript
function wakeMeUp() {
    alert("Before you go-go! 'Cause I'm not planning on going solo");
}
```

Finally invoke the function in your button's onclick attribute in your HTML file and Voilà! You're cooking with gas! Careful though, fire burns.

```html
<button onclick="wakeMeUp()">Wake me up!</button>
```

Open the HTML file in your browser and click the button. It should do whatever is inside the function you wrote!

---


## I need my App to go to another page, How?! <a name="page_transitions"></a>

Seems like you need an [a tag](https://www.w3schools.com/tags/tag_a.asp) but first make sure you have at least one [HTML]() file to use.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Title in Browser Tab</title>
</head>
<body>

    <h1>Your Page Heading</h1>
    <p>The many paragraphs you wanna write about stuff</p>

</body>
</html>
```

If you want to go to an another website altogether add an HTML [a tag](https://www.w3schools.com/tags/tag_a.asp) and an [href](https://www.w3schools.com/tags/att_a_href.asp) attribute with the website you wanna go to inside your HTML file (usually between the [body tags](https://www.w3schools.com/tags/tag_body.asp)).

```html
<a href="https://www.w3schools.com/tags/tag_a.asp">Whoa! A link about Links! How Meta</a>
```

Now open your HTML file in your browser and click the blue colored text, you should now be somewhere else! Check the address bar if you don't believe me!

If you instead have 2 or more HTML files and want 1 to go to the other, add an HTML a tag again but put the path and file name for the href attribute instead of a full URL.

##### First page (first_page.html)
```html
<a href="second_page.html">This page is boring, let's Bail!</a>
```

##### Second page (second_page.html)
```html
<a href="first_page.html">Wait nothing happened?! Let's try again</a>
```

It's a loop! Now you're thinking with portals!

---