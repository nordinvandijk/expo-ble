# Expo application with BLE functionalities

by Nordin van Dijk

## Installation

Clone this repository and just simply install

```bash
npm install
```

## Running

We use a device as devlopment client because BLE is not available on simulators.

### iOS

> **Warning**
> Apple Developer membership is required to create and install a development build on an iOS device.

First register your device

```bash
npx eas device:create
```

Lets now create a development build and upload it to your registered device by running:

```bash
npm run ios
```

### Android

Create a development build and upload it to your device by running:

```bash
npm run android
```


