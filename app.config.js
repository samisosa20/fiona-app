module.exports = {
  name: 'Fiona App',
  slug: 'Fiona-App',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  expo: {
    extra: {
      apiUrl: process.env.API_URL || null,
      eas: {
        projectId: 'aabad705-0ae3-4875-9140-5e25f3a4f3ba',
      },
    },
    ios: {
      bundleIdentifier: 'com.papirico69.fionaapp',
      buildNumber: '1.0.0',
    },
    android: {
      package: 'com.papirico69.fionaapp',
      versionCode: 1,
    },
    web: {
      favicon: './assets/favicon.png',
    }
  },
};
