export default {
  expo: {
    name: "NuEats",
    slug: "NuEats",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "nueats",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      icon: "./assets/images/icon.png"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#2c3e91"
      },
      edgeToEdgeEnabled: true,
      package: "com.anonymous.NuEats",
      permissions: [
        "WRITE_EXTERNAL_STORAGE",
        "READ_EXTERNAL_STORAGE",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.READ_MEDIA_VISUAL_USER_SELECTED",
        "android.permission.READ_MEDIA_IMAGES",
        "android.permission.READ_MEDIA_VIDEO",
        "android.permission.READ_MEDIA_AUDIO"
      ]
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/adaptive-icon.png",
          resizeMode: "contain",
          backgroundColor: "#2c3e91"
        }
      ],
      [
        "expo-media-library",
        {
          photosPermission: "Allow NuEats to save receipts to your photo library.",
          savePhotosPermission: "Allow NuEats to save receipts to your photo library."
        }
      ],
      "expo-web-browser"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {},
      eas: {
        projectId: "fb529525-f8e8-4ece-9541-d755e2c24240"
      },
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY
    }
  }
};