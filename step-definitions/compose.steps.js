
const { Given, When, Then } = require('@wdio/cucumber-framework');
const ComposePage = require('../pageobjects/ComposePage.js');
const { expect } = require('@wdio/globals');


let currentSubject = '';

// Step 1: Compose email
Given('I compose an email to {string} with subject {string} and body {string}', async (recipient, subject, body) => {
    await ComposePage.composeEmail(recipient, subject, body);
});

// Step 2: Navigate to Sent folder
When('I navigate to Sent folder', async () => {
    await ComposePage.goToSent();
});

// Step 3: Verify email exists in Sent list
Then('I should see the sent email with subject {string}', async (subject) => {
    currentSubject = subject;
    const isPresent = await ComposePage.verifyEmailInSent(subject);
    expect(isPresent).toBe(true);
});

// Step 4: Open email + verify recipient
Then('I should see the {string} in sent mail details', async (recipientUsername) => {
    await ComposePage.openSentEmailBySubject(currentSubject); 
    const isPresent = await ComposePage.verifyRecipient(recipientUsername);
    expect(isPresent).toBe(true);
});