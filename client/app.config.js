// app.config.js
import 'dotenv/config'; // This loads the .env variables

export default {
  expo: {
    name: 'wieconnectstem',
    slug: 'wieconnectstem',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/logo.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/logo.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/logo.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/logo.png',
    },
    plugins: ['expo-font'],
    extra: {
      apiUrl: process.env.API_URL,  // This will load the local API URL
    },
  },
};
