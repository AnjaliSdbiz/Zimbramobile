
const WaitUtil = require('../utils/waitUtil')
const MobileActions = require('../utils/MobileActions')

class InboxPage {
    constructor() {
        this.platform = driver.capabilities.platformName.toLowerCase()
    }


    emailSubject(subject) {
        return $(`//android.widget.TextView[@text="${subject}"]`);
    }
    get hamburgerMenu() {
        return this.platform === 'android'
            ? $('//android.widget.Button[@text=""]')
            : $('~hamburger_menu');

    }

    get inboxMenuOption() {
        return this.platform === 'android'
            ? $('android=new UiSelector().text("Inbox")')
            : $('~inbox_menu');
    }
    async verifyEmailInSent(subject) {
        const email = await this.sentEmailBySubject(subject);
        await email.waitForDisplayed({ timeout: 20000 });
        return email.isDisplayed();
    }


    async refreshInbox() {
        await this.hamburgerMenu.waitForDisplayed({ timeout: 20000 });
        await WaitUtil.waitForAndClick(this.hamburgerMenu);
        const btn = await $('//android.view.View[contains(@text,"Inbox")]/android.widget.Button');
        await driver.execute('mobile: clickGesture', {
            elementId: btn.elementId,
            x: 678,
            y: 653
        });

    }
    async verifyEmailInSent(subject) {
        const email = await this.emailSubject(subject);
        await email.waitForDisplayed({ timeout: 20000 });
        return await email.isDisplayed();
    }

    async openEmail(subject) {
        const email = this.emailSubject(subject);
        await email.waitForDisplayed({ timeout: 15000 });
        await email.click();
    }
}

module.exports = new InboxPage();