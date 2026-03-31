const { Given, When, Then } = require('@wdio/cucumber-framework')
const ComposePage = require('../pageobjects/ComposePage.js')
const { expect } = require('@wdio/globals')
const TestDataUtil = require('../utils/TestDataUtil')
const MobileActions = require('../utils/MobileActions')

let currentSubject = ''

// Step 1: Compose email
Given(
    'I compose an email to {string} with subject {string} and body {string}',
    async (recipient, subject, body) => {


        if (subject === 'AUTO_GENERATE') {
            currentSubject = TestDataUtil.generateSubject('InboxTest')
        } else {
            currentSubject = subject
        }

        await ComposePage.composeEmail(recipient, currentSubject, body)
    }
)

// Step 2: Navigate to Sent folder
When('I navigate to Sent folder', async () => {
    await ComposePage.goToSent()
})

// Step 3: Verify email exists in Sent list
Then('I should see the sent email with subject {string}', async (subject) => {


    if (subject === 'AUTO_GENERATE') {
        subject = currentSubject
    }

    const isPresent = await ComposePage.verifyEmailInSent(subject)
    expect(isPresent).toBe(true)
}
)

// Step 4: Open email + verify recipient
Then('I should see the {string} in sent mail details',
    async (recipientUsername) => {

      //  await ComposePage.openSentEmailBySubject(currentSubject)

        const isPresent = await ComposePage.verifyRecipient(recipientUsername)
        expect(isPresent).toBe(true)
    }
)