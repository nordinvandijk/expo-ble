import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
    name: "deez-expo",
    slug: "deez-expo",
    scheme: "expo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "dark",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#FF69B4"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.nordinvandijk.deezexpo" // CHANGE
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FF69B4"
      },
      permissions: [
        "android.permission.BLUETOOTH",
        "android.permission.BLUETOOTH_ADMIN",
        "android.permission.BLUETOOTH_CONNECT"
      ],
      package: "com.nordinvandijk.deezexpo" // CHANGE
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
        projectId: "f2d0ccd0-a8ac-42c8-8ce3-0b635f2c79ca" // CHANGE OR DELETE
      }
    }
  })


export default defineConfig;
