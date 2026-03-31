class MobileAction {

  /* =======================
     BASIC ACTIONS
  ======================== */

  async waitForElement(element, timeout = 20000) {
    await element.waitForDisplayed({ timeout })
  }

  async click(element) {
    await this.waitForElement(element)
    await element.click()
  }

  async clearAndType(element, value) {
    await this.waitForElement(element)
    await element.clearValue()
    await element.setValue(value)
  }

  async getText(element) {
    await this.waitForElement(element)
    return await element.getText()
  }

  async isDisplayed(element, timeout = 10000) {
    try {
      await element.waitForDisplayed({ timeout })
      return true
    } catch (e) {
      return false
    }
  }

  /* =======================
     KEYBOARD ACTIONS
  ======================== */

  async hideKeyboard() {
    try {
      await driver.hideKeyboard()
    } catch (e) {
      console.log('Keyboard not visible')
    }
  }

  /* =======================
     SCROLL ACTIONS (ANDROID)
  ======================== */

  async scrollToText(text) {
    await $(
      `android=new UiScrollable(new UiSelector().scrollable(true))` +
      `.scrollIntoView(new UiSelector().textContains("${text}"))`
    )
  }
  

async scrollAndClickByExactText(text) {
  await $(
    `android=new UiScrollable(new UiSelector().scrollable(true))` +
    `.scrollIntoView(new UiSelector().text("${text}"))`
  )

  await $(`//*[@text="${text}"]`).click()
}
async tapByCoordinates(x, y) {
        await driver.action('pointer', {
            parameters: { pointerType: 'touch' }
        })
        .move({ x, y })
        .down()
        .up()
        .perform();
    }



 

  /* =======================
     SWIPE ACTIONS
  ======================== */

  async swipe(direction = 'down') {
    await driver.execute('mobile: swipe', { direction })
  }

  async swipeDown(times = 1) {
    for (let i = 0; i < times; i++) {
      await this.swipe('down')
      await browser.pause(1000)
    }
  }

  /* =======================
     WAIT UTILITIES
  ======================== */

  async waitUntilVisible(selector, timeout = 30000) {
    await browser.waitUntil(
      async () => (await $$(selector)).length > 0,
      {
        timeout,
        timeoutMsg: `Element ${selector} not visible after ${timeout}ms`
      }
    )
  }

  /* =======================
     DEVICE ACTIONS
  ======================== */

  async goBack() {
    await driver.back()
  }

  async pause(ms = 1000) {
    await browser.pause(ms)
  }
}

module.exports = new MobileAction()