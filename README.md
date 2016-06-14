# ng-weatherApp-protractor-e2e
Simple Angular application to demo a end-to-end test with Protractor.


## End-to-end testing
An end-to-end test runs against the front-end of a fully functional application. This means interacting with a browser that loads pages, runs Javascript, interacts with the DOM, fills and submits forms, and so forth. The web application is served from a machine with a fully functional backend and suitably populated database. The setup is intended to mimic as closely as possible the live application, environment, and use cases. Automated UI tests are usually at the top of the automated testing pyramid and thus you should only write a few significant ones.

Two of the most popular end-to-end test frameworks are Nightwatch.js and Protractor. Nightwatch.js is an easy to use Node.js based solution for browser based apps and websites.
It uses the Selenium WebDriver API to perform commands and assertions on DOM elements.

If you are working on an AngularJS project the recommended choice is Protractor:
*	it was made specifically for angular apps (though it can be used for non-angular apps also)
*	supports angular-specific locator strategies (like by.model, by.repeater etc)
*	waits for angular to start up during the page load (sync)
*	it is being actively maintained and improved mostly by Google developers with a close cooperation with the Angular team.

## Getting started
If you want to write some end-to-end tests, the first step that you need to do is to actually install the browsers that you want to test against. So, if you want to test your website in Chrome, then you’ll need to have Chrome installed. If you want to test in Firefox, you need to install Firefox on that machine. If you want to test IE, you’ll need to have IE installed. Next you will need to get Selenium running on your local machine. Once you’ve got Selenium running, then you’ll need to set up your test framework.

##	Webdriver
[Selenium](http://www.seleniumhq.org) is a web application testing framework that allows you to write tests in many programming languages like Java, C#, PHP etc. Selenium is an open-source project that deploys to Windows, Linux and Mac OS. In simple terms Selenium has the power to open a browser you specify, navigate to a page and browser around.

Selenium-Webdriver aka Webdriver or Selenium 2 is a successor of Selenium RC (Remote Control) which allows a user to interact with Web pages like a user does using test scripts. Instead of injecting Javascript code into the browser to simulate user actions, it uses the browser’s native support for automation (different for each browser). Webdriver exposes a simple API that wraps browser interactions in simple methods.

### webdriver-manager
The [webdriver-manager](https://www.npmjs.com/package/webdriver-manager) is a helper tool to easily get an instance of Selenium Server running. 

Use it to download the necessary binaries with:

**$ webdriver-manager update**

Start up a server with:

**$ webdriver-manager start**  

This will start up a Selenium Server and will output a bunch of info logs. Your Protractor test will send requests to this server to control a local browser.


### Protractor
[Protractor](http://www.protractortest.org/#/) is an end-to-end test framework for AngularJS applications built on top of Webdriver. Protractor runs tests against your application running in a real browser, interacting with it as a user would.

####	Protractor Tests
Protractor needs two files to run, a spec file and a configuration file. Protractor has a simple config file that consists of the Selenium config, browser details, our spec file paths and some Jasmine options. A sample config file looks like:

    exports.config = {  
        capabilities: {
            'browserName': 'chrome',
            'chromeOptions': {                
                args: ['--disable-web-security']
            } 
        },
        seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
        baseUrl: 'http://localhost:63342/weatherApp/',
        specs: [
            '*.js'
        ],
        framework: 'jasmine2',
        jasmineNodeOpts: {
            isVerbose: true,
            includeStackTrace: true
        }
    };

This configuration tells Protractor where your test files (specs) are, and where to talk to your Selenium Server (seleniumAddress).


### Using Locators
The goal of end-to-end tests for webpages is finding and interacting with DOM elements, and confirming the state of your application. 

### Overview
Protractor exports a global function **element**, which takes a **Locator** (tells Protractor how to find certain elements) and will return an **ElementFinder**. This function finds a single element - if you need to manipulate multiple elements, use the *element.all* function.

**ElementFinder** has methods, such as click(), getText(), and sendKeys. These are the core way to interact with an element and get information back from it.


### Locators
A locator tells Protractor how to find a DOM element. Protractor exports these on the global object. The most common locators are:

    // find an element using a css selector
    by.css('.myclass') 

    // find an element with the given id
    by.id('myid')

    // find an element with a certain ng-model
    by.model('name')

    // find an element bound to the given variable
    by.binding('bindingname')

Locators are passed to the **element** function like so:

    element(by.css('some-css'));
    element(by.model('item.name'));
    element(by.binding('item.name'));

### Actions
The **element()** function returns an **ElementFinder** object. This object knows how to locate the DOM element using the locator you passed in as a parameter, but it will not contact the browser until an action method has been called.

The most common action methods are:

    var el = element(locator);

    // Click on the element
    el.click();

    // Send keys to the element (usually an input)
    el.sendKeys('my text');

    // Clear the text in an element (usually an input)
    el.clear();

    // Get the value of an attribute, for example, get the value of an input
    el.getAttribute('value');


### Finding Multiple Elements
To deal with multiple DOM elements, use the **element.all** function. This also takes a locator as its only parameter.

    element.all(by.css('.selector')).then(function(elements) {
      // elements is an array of ElementFinders.
    });
    
    
To find sub-elements, simply chain element and element.all functions together as shown below.

    element(by.css('some-css')).element(by.tagName('tag-within-css'));

to find a list of sub-elements:

    element(by.css('some-css')).all(by.tagName('tag-within-css'));

You can chain with get/first/last as well like so:

    element.all(by.css('some-css')).first().element(by.tagName('tag-within-css'));
    element.all(by.css('some-css')).get(index).element(by.tagName('tag-within-css'));
    element.all(by.css('some-css')).first().all(by.tagName('tag-within-css'));



The weather app allows a user to specify a city and request the weather forecast for 2, 5, 7 days. The test simulates a user selecting a city and requesting a two day forecast. The **describe** and **it** syntax is from the [Jasmine](http://jasmine.github.io) framework. 

To run the tests first start up the Selenium server:

**$ webdriver-manager start** 

Next run the tests with the following command:

**$ protractor ./tests/e2e-tests/e2e-tests.conf.js**

You should see a Chrome browser window open up and navigate to the WeatherApp index page, it should then enter 'Dublin' as the city and select a two day forecast, then it should close itself (this should be very fast!). The test output should be:

    protractor ./tests/e2e-tests/e2e-tests.conf.js 
    Using the selenium server at http://127.0.0.1:4444/wd/hub
    [launcher] Running 1 instances of WebDriver
    Started
    .
    
    
    1 spec, 0 failures
    Finished in 1.769 seconds
    [launcher] 0 instance(s) of WebDriver still running
    [launcher] chrome #1 passed

