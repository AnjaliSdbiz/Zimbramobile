const { Given, When, Then } = require('@wdio/cucumber-framework');
const zimbraAPI = require('../utils/apiHelper');
const InboxPage = require('../pageobjects/InboxPage.js');

let testData = {};

Given('I send an email using API with {string} and {string}', async function (username, password) {
    await zimbraAPI.login(username, password);

    testData.subject = `Test Mail ${Date.now()}`;
    testData.body = 'This is API generated mail';

    await zimbraAPI.sendMail(username, testData.subject, testData.body);
});

When('I check the email in mobile app', async function () {
    await InboxPage.refreshInbox();
    await browser.waitUntil(async () => {
        return await InboxPage.verifyEmailInSent(testData.subject);
    }, {
        timeout: 20000,
        interval: 3000,
        timeoutMsg: 'Email not found in inbox'
    });

    await InboxPage.openEmail(testData.subject);
});

Then('I should see the email content', async function () {
    const bodyElement = await $(`//android.widget.TextView[contains(@text,"${testData.body}")]`);
    await expect(bodyElement).toBeDisplayed();
});