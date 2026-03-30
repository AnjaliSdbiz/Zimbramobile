# Zimbra Mobile Test Suite

This project contains automated tests for the Zimbra mobile application using WebDriverIO, Appium, and Cucumber.

## Prerequisites

- Node.js (v14 or higher)
- Java JDK (for Android)
- Android SDK (for Android testing)
- Xcode (for iOS testing, macOS only)
- Appium Server running on port 4723

## Installation

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
   > **Note**: The `--legacy-peer-deps` flag is required due to version conflicts between Appium drivers for Android and iOS.

2. Install Appium drivers:
   ```bash
   appium driver install uiautomator2
   appium driver install xcuitest
   ```

## Running Tests

### Android
```bash
npm run wdio:android
```

### iOS
```bash
npm run wdio:ios
```

### General
```bash
npm run wdio
```
(Default runs Android)

## Configuration

The test platform is controlled by the `PLATFORM` environment variable:
- `PLATFORM=android` (default)
- `PLATFORM=ios`

## Project Structure

- `features/` - Cucumber feature files and step definitions
- `pageobjects/` - Page object models
- `wdio.conf.js` - WebDriverIO configuration

## Capabilities

### Android
- Platform: Android
- Browser: Chrome
- Device: Android GoogleAPI Emulator
- Platform Version: 12.0
- Automation: UiAutomator2

### iOS
- Platform: iOS
- Browser: Safari
- Device: iPhone Simulator
- Platform Version: 17.0
- Automation: XCUITest