const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPage = require('../pageobjects/LoginPage');


Given('I am on the login page', async () => {
    await LoginPage.openLoginPage();  
});

Given('I enter the server address {string}', async (server) => {
    await LoginPage.enterServerAddress(server);
});


When(
    'I login with {string} and {string} And tap on the login button',
    async (username, password) => {
        await LoginPage.login(username, password);
    }
);



Then('I should see inbox of the {string} account', async (username) => {
    await InboxPage.verifyInboxOfAccount(username)
  }
);

