/**
 * Created by jkenny on 02/03/2016.
 */
'use strict';

describe('Fetching a 2 day forecast for Dublin', function() {
    beforeEach(function() {
       browser.get('index.htm');

    });

    it('Should automatically redirect to forecast and display 2 rows of data', function() {

        var city = element(by.model('city'));
        city.clear();
        city.sendKeys('Dublin, Ireland');

        element(by.css('.btn')).click().then(function() {
            expect(browser.getLocationAbsUrl()).toMatch("/forecast");

            element.all(by.repeater('w in weatherResult.list')).then(function(weatherResults) {
                 expect(weatherResults.length).toEqual(2);
                 var dateString = weatherResults[0].element(by.className('panel-title')).getText();
                 expect(dateString).toEqual(formattedDate());
             });
        });
    });
});

function formattedDate() {
    var d = new Date(Date.now()),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day,month, year].join('/');
}