class TestDataUtil {

  generateRandomString(length = 8) {
    const chars = 'abcdefghijklmnopqrstuvwxyz'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  generateEmail() {
    return `qa_${this.generateRandomString(5)}@testmail.com`
  }

  generateSubject(prefix = 'Automation') {
    return `${prefix}-${Date.now()}`
  }

  generateUsername() {
    return `user_${this.generateRandomString(6)}`
  }
}

module.exports = new TestDataUtil()