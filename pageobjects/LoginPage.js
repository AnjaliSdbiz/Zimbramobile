const waitUtil = require('../utils/waitUtil')
class LoginPage {
    constructor() {
        this.platform = driver.capabilities.platformName.toLowerCase();
    }

    get serverInput() {
        // Server address field
        if (this.platform === 'android') {
            return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
        } else {
            return $('~username');
        }
    }

    get continueButton() {
        if (this.platform === 'android') {
            return $('android=new UiSelector().resourceId("continue")');
        } else {
            return $('~continue');
        }
    }

    get usernameInput() {
        if (this.platform === 'android') {
            return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
        } else {
            return $('~username');
        }
    }

    get passwordInput() {
        if (this.platform === 'android') {
            return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
        } else {
            return $('~password');
        }
    }

    get loginButton() {
        if (this.platform === 'android') {
            return $('//android.widget.Button[@text="Sign in"]');
        } else {
            return $('~login_button');
        }
    }

    get inbox() {
        if (this.platform === 'android') {
            return $('android=new UiSelector().text("Inbox1")');
        } else {
            return $('~message');
        }
    }

    accountLabel(username) {
        return $(`//*[contains(@text,'${username}')]`)
    }

    async openLoginPage() {
        await driver.launchApp();
    }


    async enterServerAddress(server) {
        await this.serverInput.waitForDisplayed();
        await this.serverInput.click();
        await this.serverInput.setValue(server);
        await this.continueButton.click();
    }

    async login(username, password) {
        await waitUtil.waitForDisplayed(this.usernameInput, 15000)
        await this.usernameInput.click();
        await this.usernameInput.clearValue();
        await this.usernameInput.addValue(username);
        await this.passwordInput.click();
        await this.passwordInput.addValue(password);
        await driver.hideKeyboard();
        await driver.pause(1000);
        await this.loginButton.scrollIntoView();
        await waitUtil.waitForClickable(this.loginButton, 10000)
        await this.loginButton.click();
        await driver.pressKeyCode(66);
    }


    async verifyInboxOfAccount(username) {
        await waitUtil.waitForDisplayed(this.inboxHeader, 20000)
        await browser.waitUntil(
            async () => await this.accountLabel(username).isDisplayed(),
            {
                timeout: 20000,
                timeoutMsg: `Inbox for account "${username}" is not visible`
            }
        )

    }
}

module.exports = new LoginPage();