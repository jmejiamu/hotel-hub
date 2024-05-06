module.exports = {
  name: "hotel-hub",
  slug: "hotel-hub",
  version: "1.0.0",
  extra: {
    storybookEnabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED,
  },
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.anonymous.hotelhub",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.anonymous.hotelhub",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
};
