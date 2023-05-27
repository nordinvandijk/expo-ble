import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
    name: "deez-expo",
    slug: "deez-expo",
    scheme: "expo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.nordinvandijk.deezexpo"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      permissions: [
        "android.permission.BLUETOOTH",
        "android.permission.BLUETOOTH_ADMIN",
        "android.permission.BLUETOOTH_CONNECT"
      ]
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      [
        "@config-plugins/react-native-ble-plx",
        {
          isBackgroundEnabled: true
        }
      ]
    ],
    extra: {
      eas: {
        projectId: "f2d0ccd0-a8ac-42c8-8ce3-0b635f2c79ca"
      }
    }
  })


export default defineConfig;
