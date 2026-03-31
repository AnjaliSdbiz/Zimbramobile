const MobileActions = require('../utils/MobileActions')
const WaitUtil = require('../utils/waitUtil')
class ComposePage {

    constructor() {
        this.platform = driver.capabilities.platformName.toLowerCase();
    }

    get composeButton() {
        return this.platform === 'android'
            ? $('//android.widget.Button[@text=""]')
            : $('~compose_button');
    }
    get toField() {
        return this.platform === 'android'
            ? $('//android.widget.Button[@text="To"]')
            : $('~to_field');
    }
    get inputField() {
        return this.platform === 'android'
            ? $('//android.widget.EditText')
            : $('~to_field');
    }
    get subjectField() {
        return this.platform === 'android'
            ? $('android=new UiSelector().resourceId("com.google.android.gm:id/subject")')
            : $('~subject_field');
    }
    get bodyField() {
        return this.platform === 'android'
            ? $('android=new UiSelector().className("android.widget.EditText").resourceIdMatches(".*zimbra-composer-.*")')
            : $('~body_field');
    }
    get sendButton() {
        return this.platform === 'android'
            ? $('//android.widget.Button[@text="Send"]')
            : $('~send_button');
    }
    get subjectField() {
        return this.platform === 'android'
            ? $('//android.widget.EditText[@hint="Subject"]')
            : $('~send_button');
    }
    get inboxTitle() {
        return this.platform === 'android'
            ? $('id=com.zimbra.modernapp:id/inbox_title')
            : $('~inbox_title');
    }
    get toastMessage() {
        return this.platform === 'android'
            ? $('//android.widget.TextView[@text="Message sent."]')
            : $('~inbox_title');

    }
    get hamburgerMenu() {
        return this.platform === 'android'
            ? $('//android.widget.Button[@text=""]')
            : $('~hamburger_menu');
    }
    get sentFolderOption() {
        return this.platform === 'android'
            ? $("//*[@resource-id='sidebar_portal']//android.widget.TextView[contains(@text,'Sent')]")
            : $('~sent_folder');
    }
    get sentFolderOpened() {
        return this.platform === 'android'
            ? $("//android.widget.TextView[@text='Sent']")
            : $('~sent_folder');
    }
    sentEmailBySubject(subject) {
        return this.platform === 'android'
            ? $(`//android.widget.TextView[contains(@text, "${subject}")]`)
            : $(`~${subject}`);
    }

    async composeEmail(recipient, subject, body) {
        await this.composeButton.click();
        await this.toField.click();
        await WaitUtil.waitForDisplayed(this.inputField)
        await this.inputField.click();
        await driver.keys(recipient);

        // Step 2: Select autosuggestion
        const suggestion = await $(`android=new UiSelector().textContains("${recipient}")`);
        await WaitUtil.waitForDisplayed(suggestion)
        await suggestion.click();

        // Step 3: Dismiss any leftover overlay/chip container
        await driver.pressKeyCode(4);

        // Step 4: Click and fill Subject

        await WaitUtil.waitForDisplayed(this.subjectField);
        await this.subjectField.click();
        await this.subjectField.setValue(subject);

        // Step 5: Click and fill Body

        await WaitUtil.waitForDisplayed(this.bodyField);
        await this.bodyField.click();
        await this.bodyField.setValue(body);

        await WaitUtil.waitForAndClick(this.sendButton)
    }


    async goToSent() {
        await WaitUtil.waitForAndClick(this.hamburgerMenu);
        await MobileActions.tapByCoordinates(426, 861)

    }

    async verifyEmailInSent(subject) {
        const email = await this.sentEmailBySubject(subject);
        await email.waitForDisplayed({ timeout: 20000 });
        return email.isDisplayed();
    }

    async verifyRecipient(recipientUsername) {
        const recipient = await $(`//*[contains(@text,"${recipientUsername}")]`);
        await recipient.waitForDisplayed({ timeout: 10000 });
        const isDisplayed = await recipient.isDisplayed();
        return isDisplayed;
    }

}

module.exports = new ComposePage();

