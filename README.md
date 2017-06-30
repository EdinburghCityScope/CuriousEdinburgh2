# Curious Edinburgh

![Travis status](https://travis-ci.org/edina/CuriousEdinburgh2.svg?branch=master)

## Prerequisites
* See [React Native Dependencies](https://facebook.github.io/react-native/docs/getting-started.html)

## Install
```
npm install 
```

## Run

To run app on connected device or simulator:

### Run React Native Packager
```
npm start
```

### Android
```
npm run react-native run-android
```

### IOS
```
npm run react-native run-ios
```

#### IOS Troubleshooting

When building the app, you might experience the following error: 'Code signing fails with error 'resource fork, Finder information, or similar detritus not allowed' if you add or modify any asset (e.g. images). This is a security hardening change introduced with iOS 10. Please, follow the steps provided at [https://developer.apple.com/library/content/qa/qa1940/_index.html](https://developer.apple.com/library/content/qa/qa1940/_index.html)

## Launch your own WordPress API for tours

This app relies on WordPress to display tour and Tour stops. If you have the adequated plugin that handles the extra metadata that this app requires, you can change the default API by typing your own URL on the device browser:

```
curious-edinburgh://REPLACE_WITH_YOUR_DOMAIN/wp-json/wp/v2/?tour=DEFAULT_TOUR_ID&protocol='http|https'
```
e.g. (curious-edinburgh://curiousedinburgh.org/wp-json/wp/v2/?tour=4&protocol='http')

