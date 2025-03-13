# React Native Skia Playground
[Demo](https://skia-playground.netlify.app/)

# Guide

[Expo](https://docs.expo.dev/get-started/set-up-your-environment/)

Local Build

cd ios && pod install && cd ..

https://docs.expo.dev/build-reference/local-builds/

eas build --platform ios --local --profile development

## iOS Simulator 

eas build --profile development-simulator --local --platform ios

## iOS device

eas device:create

eas build --profile development --platform ios --local

bunx expo install expo-dev-client

bun i -g eas-cli

Install

https://docs.fastlane.tools/getting-started/ios/setup/

You are responsible for making sure that the environment has all the necessary tools installed:
Node.js/Yarn/npm
fastlane (iOS only)
CocoaPods (iOS only)
Android SDK and NDK

brew update

brew install fastlane