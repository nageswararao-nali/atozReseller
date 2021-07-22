#!/bin/bash
set -x

npm start &

react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

#react-native run-android

curl "http://localhost:8081/index.bundle?platform=android" -o "android/app/src/main/assets/index.android.bundle"

cd android && ./gradlew clean assembleDebug

set +x