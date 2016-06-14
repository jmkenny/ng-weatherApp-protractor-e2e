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