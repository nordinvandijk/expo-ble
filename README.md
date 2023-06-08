# Expo application with BLE functionalities

by Nordin van Dijk

## Installation

First of all. Get the code by cloning or forking this repository.

Then install the dependencies by running

```bash
npm install
```

Finally, you have to make some adjustments to the app configuration (app.config.ts)


## Building development client

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

## Running

Start the expo server

```bash
npm run start
```

Wait until the server is up and running. Then open the app on your device and connect to the server.
