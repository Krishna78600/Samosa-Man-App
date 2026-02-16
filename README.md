# 🍲 Samosa Man Mobile App

Employee Meal Management System - Mobile Application

## ✨ Features

- 📝 Provide meals to employees
- 🔍 Check employee eligibility
- 📊 View today's meals
- 📋 View employee history
- 🔄 Automatic OTA updates (2-3 minutes)
- 🌡️ Warm food-themed UI
- 🔐 Firebase authentication & database

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Expo account
- Firebase account
- GitHub account

### Local Development
```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/SamosaManApp.git
cd SamosaManApp

# Install dependencies
npm install

# Create .env.local with Firebase config
cp .env.example .env.local
# Edit .env.local with your Firebase credentials

# Start the app
npm start

# Open in Android emulator
npm run android

# Or scan QR code with Expo Go app
```

### Build & Deploy
```bash
# First time - build APK (30 minutes)
npm run build

# Every update - OTA update (2-3 minutes)
npm run update

# Or just push to GitHub - GitHub Actions handles everything!
git push origin main
```

## 📁 Project Structure

SamosaManApp/
├── app/                 # Main app entry
│   ├── _layout.tsx     # Root layout
│   └── index.tsx       # Home screen
├── screens/            # Screen components
│   ├── MealManagementScreen.tsx
│   ├── HistoryScreen.tsx
│   └── SettingsScreen.tsx
├── navigation/         # Navigation setup
│   └── RootNavigator.tsx
├── lib/               # Utilities
│   └── firebase.ts    # Firebase config
├── assets/            # Images & icons
├── app.json          # Expo config
├── eas.json          # EAS config
└── package.json      # Dependencies



## 🔄 CI/CD Pipeline

Every push to `main` branch:

1. ✅ Validate code (linting, tests)
2. 🔥 Build OTA update (2-3 minutes)
3. 📢 Create GitHub release
4. 📲 Notify team (Slack)
5. 👥 Users get update automatically

## 🏗️ Architecture

### Why Fast?
- **OTA Updates**: Only JS bundle changes (2-3 min)
- **Not Full APK**: No native compilation needed
- **First APK**: 30 minutes (one time only)
- **Subsequent Updates**: 2-3 minutes each

### How It Works

You push code
↓
GitHub Actions starts
↓
Validate & build OTA (2 min)
↓
Publish to EAS
↓
Users get update when they open app ✅

# -========================================================================


## 🚨 First-Time Setup

### 1. Create Initial APK
```bash
npm run build
# This takes ~30 minutes
# Result: APK ready for distribution
```

### 2. Distribute APK
```bash
# Download APK from EAS
eas build:download --platform android --latest

# Option A: Firebase App Distribution
firebase appdistribution:distribute app.apk --app=YOUR_APP_ID

# Option B: Direct APK share
# Transfer APK to users, they install directly
```

### 3. Every Update After
```bash
# Just push to main - GitHub Actions does everything
git push origin main
# OTA update published in 2-3 minutes
# Users get it automatically ✅
```

## 🔧 Configuration

### Firebase Setup

1. Create Firebase project
2. Create Android app (package: com.samosaman.app)
3. Add Firestore database
4. Copy config to `.env.local`

### GitHub Secrets

Add these to your GitHub repo settings:

- `EXPO_TOKEN`: From `eas token:create`
- `FIREBASE_TOKEN`: From `firebase login:ci`
- `SLACK_WEBHOOK`: (Optional) Slack notifications

## 📱 Testing

### Local Emulator
```bash
npm run android
# Opens in Android emulator
```

### Real Device
```bash
npm start
# Scan QR code with Expo Go app
```

### Testflight / Firebase Distribution
```bash
npm run build
eas build:download --platform android --latest
firebase appdistribution:distribute app.apk --app=YOUR_APP_ID
```

## 🌟 Tech Stack

- **React Native**: Cross-platform mobile
- **Expo**: Development & building
- **Firebase**: Backend & database
- **React Navigation**: Navigation library
- **TypeScript**: Type safety
- **EAS Update**: Fast OTA updates

## 📊 Performance

| Metric | Time |
|--------|------|
| First APK Build | ~30 min |
| OTA Update Build | 2-3 min |
| User Update Delivery | 24 hours (auto when they open) |
| CI/CD Pipeline | ~2-3 min |

## 🐛 Troubleshooting

### APK Build Fails
```bash
# Check EAS logs
eas build:list
eas build:view <build-id>

# Retry
npm run build
```

### OTA Update Not Publishing
```bash
# Check token
eas whoami

# Verify setup
eas update:configure

# Try manually
npm run update
```

### Firebase Connection Error
```bash
# Check .env.local
cat .env.local

# Verify credentials
firebase projects:list
```

## 📞 Support

- **Expo Docs**: https://docs.expo.dev
- **EAS Docs**: https://docs.expo.dev/eas/
- **Firebase Docs**: https://firebase.google.com/docs
- **React Navigation**: https://reactnavigation.org

## 📝 License

MIT

## 👨‍💻 Author

Krishna Tulaskar

---

Made with ❤️ for Samosa Man



















# ------------------------------------------------------------

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# ---------------------------------------------------------------------------------------------------------------

