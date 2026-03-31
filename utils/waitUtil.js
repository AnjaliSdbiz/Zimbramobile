class WaitUtil {

  /* =========================
     BASIC ELEMENT WAITS
  ========================== */

  async waitForDisplayed(element, timeout = 20000) {
    await element.waitForDisplayed({ timeout })
  }
  
async waitForAndClick(element, timeout = 20000) {
    await element.waitForDisplayed({ timeout })
    await element.click()
  }


  async waitForExist(element, timeout = 20000) {
    await element.waitForExist({ timeout })
  }

  async waitForClickable(element, timeout = 20000) {
    await element.waitForClickable({ timeout })
  }

  async waitForHidden(element, timeout = 20000) {
    await element.waitForDisplayed({
      timeout,
      reverse: true
    })
  }

  /* =========================
     TEXT / CONTENT WAITS
  ========================== */

  async waitForText(element, expectedText, timeout = 20000) {
    await browser.waitUntil(
      async () => {
        const text = await element.getText()
        return text.includes(expectedText)
      },
      {
        timeout,
        timeoutMsg: `Expected text "${expectedText}" not found`
      }
    )
  }

  async waitForTextToDisappear(text, timeout = 20000) {
    await browser.waitUntil(
      async () => (await $(`//*[contains(@text,'${text}')]`).isExisting()) === false,
      {
        timeout,
        timeoutMsg: `Text "${text}" still visible after ${timeout}ms`
      }
    )
  }

  /* =========================
     SELECTOR BASED WAITS
  ========================== */

  async waitUntilSelectorVisible(selector, timeout = 30000) {
    await browser.waitUntil(
      async () => (await $$(selector)).length > 0,
      {
        timeout,
        timeoutMsg: `Element "${selector}" not visible after ${timeout}ms`
      }
    )
  }

  /* =========================
     PAGE / SCREEN WAITS
  ========================== */

  async waitForScreen(textIdentifier, timeout = 30000) {
    await browser.waitUntil(
      async () => await $(`//*[contains(@text,'${textIdentifier}')]`).isDisplayed(),
      {
        timeout,
        timeoutMsg: `Screen "${textIdentifier}" not loaded`
      }
    )
  }

  /* =========================
     LOADER / SYNC WAITS
  ========================== */

  async waitForLoaderToDisappear(loaderSelector, timeout = 30000) {
    await browser.waitUntil(
      async () => !(await $(loaderSelector).isDisplayed()),
      {
        timeout,
        timeoutMsg: `Loader still visible after ${timeout}ms`
      }
    )
  }

  /* =========================
     GENERIC WAIT
  ========================== */


  async waitUntil(conditionFn, timeout = 30000, timeoutMsg = 'Condition not met') {
    await browser.waitUntil(conditionFn, {
      timeout,
      timeoutMsg
    })
  }
}

module.exports = new WaitUtil()