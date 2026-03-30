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
        await this.inputField.waitForDisplayed({ timeout: 15000 });
        await this.inputField.click();
        await driver.keys(recipient);

        // Step 2: Select autosuggestion
        const suggestion = await $(`android=new UiSelector().textContains("${recipient}")`);
        await suggestion.waitForDisplayed({ timeout: 5000 });
        await suggestion.click();

        // Step 3: Dismiss any leftover overlay/chip container
        await driver.pressKeyCode(4);

        // Step 4: Click and fill Subject

        await this.subjectField.waitForDisplayed({ timeout: 15000 });
        await this.subjectField.click();
        await this.subjectField.setValue(subject);

        // Step 5: Click and fill Body
        await this.bodyField.waitForDisplayed({ timeout: 15000 });
        await this.bodyField.click();
        await this.bodyField.setValue(body);
        await browser.pause(500); 
        await this.sendButton.click();
    }

    async isEmailReceived(subject) {
                return sentEmailBySubject.isDisplayed();
    }
    async goToSent() {
        await this.hamburgerMenu.waitForDisplayed({ timeout: 10000 });
        await this.hamburgerMenu.click();
        await driver.pause(1500);

        await driver.executeScript('mobile: clickGesture', [{
            x: 426,
            y: 861
        }]);


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
    async openSentEmailBySubject(subject) {
        const email = await this.sentEmailBySubject(subject);
        await email.waitForDisplayed({ timeout: 20000 });
        await email.click();
    }
}

module.exports = new ComposePage();

