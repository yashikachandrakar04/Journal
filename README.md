# 📔 Journal

A beautiful and intuitive digital diary application built with React Native CLI. Capture your thoughts, track your mood, and preserve your memories with a clean, modern interface.

![React Native](https://img.shields.io/badge/React%20Native-0.72+-61DAFB?style=flat-square&logo=react)
![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-lightgrey?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![AsyncStorage](https://img.shields.io/badge/Storage-AsyncStorage-blue?style=flat-square)

---

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#️-configuration)
- [Usage](#-usage)
- [Components Overview](#-components-overview)
- [Storage API](#-storage-api)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## ✨ Features

- 📝 **Create Entries** – Write diary entries with a title, content, and mood.
- 🎭 **Mood Tracking** – Select from 6 moods (Happy, Neutral, Sad, Angry, Tired, Excited).
- 📚 **View All Entries** – Scrollable list showing title, date, mood, and preview.
- ✏️ **Edit Entries** – Update your thoughts anytime with inline editing.
- 🗑️ **Delete Entries** – Remove entries with a confirmation dialog.
- 💾 **Persistent Storage** – Data survives app restarts via AsyncStorage.
- 📅 **Smart Date Formatting** – Human-readable dates (e.g., "Mon, Oct 5, 2026").
- 🔢 **Character Counter** – 5000 character limit for content with live counter.
- 🎨 **Empty State** – Friendly message when no entries exist.
- 📊 **Entry Stats** – Shows total number of entries.
- ➕ **Floating Action Button** – Quick access to create new entries.
- ⌨️ **Keyboard-Aware UI** – `KeyboardAvoidingView` for smooth form input.
- 🕒 **Last Edited Timestamp** – Shows when an entry was last modified.

---


## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React Native CLI** | Core framework |
| **React Navigation (Stack)** | Screen navigation |
| **AsyncStorage** | Local data persistence |
| **react-native-vector-icons** | Ionicons for UI |
| **react-native-gesture-handler** | Gesture support |
| **react-native-safe-area-context** | Safe area handling |
| **uuid** | Unique entry IDs |
| **react-native-get-random-values** | Crypto polyfill for uuid |

---

## 📂 Project Structure

```
Journal/
├── src/
│   ├── components/
│   │   ├── DiaryEntry.js       # Single entry card
│   │   ├── DiaryList.js        # FlatList of entries
│   │   └── Header.js           # Reusable header
│   ├── screens/
│   │   ├── HomeScreen.js       # Main list screen
│   │   ├── AddEntryScreen.js   # Create new entry
│   │   └── ViewEntryScreen.js  # View/edit/delete entry
│   ├── utils/
│   │   └── Storage.js          # AsyncStorage utilities
│   └── navigation/
│       └── AppNavigator.js     # Stack navigator
├── App.js
├── package.json
└── README.md
```

---

## 🚀 Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js** (>= 16)
- **npm** or **yarn**
- **React Native CLI** environment setup ([official guide](https://reactnative.dev/docs/environment-setup))
- **Xcode** (for iOS) / **Android Studio** (for Android)

### Step 1: Create the Project

```bash
npx react-native init Journal
cd Journal
```

### Step 2: Install Dependencies

```bash
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install @react-native-async-storage/async-storage
npm install react-native-vector-icons
npm install react-native-gesture-handler
npm install react-native-get-random-values
npm install uuid
```

### Step 3: iOS Setup

```bash
cd ios && pod install && cd ..
```

### Step 4: Add Project Files

Copy all the code files from the [Project Structure](#-project-structure) into their respective directories.

### Step 5: Run the App

**iOS:**

```bash
npx react-native run-ios
```

**Android:**

```bash
npx react-native run-android
```

---

## ⚙️ Configuration

### React Native Vector Icons Setup

**iOS** – Add to `ios/Journal/Info.plist`:

```xml
<key>UIAppFonts</key>
<array>
  <string>Ionicons.ttf</string>
</array>
```

**Android** – Add to `android/app/build.gradle`:

```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

Then rebuild the app:

```bash
cd ios && pod install && cd ..
npx react-native run-ios   # or run-android
```

---

## 📱 Usage

1. **Launch the app** – You'll land on the Home screen showing all your entries.
2. **Tap the ➕ FAB** – Opens the Add Entry screen.
3. **Fill in details** – Enter a title, select a mood, and write your content.
4. **Tap "Save Entry"** – Your entry is stored in AsyncStorage.
5. **Tap any entry** – Opens the View Entry screen.
6. **Edit or Delete** – Use the action bar at the bottom to modify or remove entries.

---

## 🧩 Components Overview

| Component | File | Description |
|-----------|------|-------------|
| `AppNavigator` | `navigation/AppNavigator.js` | Stack navigation between screens |
| `Header` | `components/Header.js` | Reusable header with back/action buttons |
| `DiaryEntry` | `components/DiaryEntry.js` | Entry card with title, date, preview, mood |
| `DiaryList` | `components/DiaryList.js` | FlatList of entries with empty state |
| `HomeScreen` | `screens/HomeScreen.js` | Main screen with list + FAB |
| `AddEntryScreen` | `screens/AddEntryScreen.js` | Form for creating new entries |
| `ViewEntryScreen` | `screens/ViewEntryScreen.js` | View, edit, and delete entry |
| `Storage` | `utils/Storage.js` | AsyncStorage CRUD utilities |

---

## 💾 Storage API

All data is stored under the key `@Journal:entries` as a JSON array.

### Available Functions

```javascript
import {
  saveEntry,
  getAllEntries,
  updateEntry,
  deleteEntry,
  clearAllEntries,
} from './src/utils/Storage';
```

| Function | Parameters | Returns | Description |
|----------|-----------|---------|-------------|
| `saveEntry(entry)` | `entry: Object` | `boolean` | Adds a new entry |
| `getAllEntries()` | – | `Array` | Retrieves all entries |
| `updateEntry(entry)` | `entry: Object` | `boolean` | Updates an existing entry |
| `deleteEntry(id)` | `id: string` | `boolean` | Removes an entry by ID |
| `clearAllEntries()` | – | `boolean` | Deletes all entries |

### Entry Object Shape

```javascript
{
  id: "uuid-v4-string",
  title: "My First Entry",
  content: "Today was a great day...",
  mood: "😊 Happy",
  date: "2026-10-05T10:30:00.000Z",
  lastEdited: "2026-10-05T11:00:00.000Z" // optional
}
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

### Ideas for Contributions

- 🌙 Dark mode support
- 🔍 Search and filter entries
- 📤 Export/import entries (JSON, PDF)
- 🔐 Passcode or biometric lock
- ☁️ Cloud sync (Firebase / Supabase)
- 🖼 Image attachments
- 📌 Pin favorite entries
- 🏷 Tags and categories

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [React Native](https://reactnative.dev/) – Framework
- [React Navigation](https://reactnavigation.org/) – Navigation
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) – Storage
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) – Icons
- [uuid](https://github.com/uuidjs/uuid) – Unique IDs

---

## 📞 Contact

Have questions or suggestions? Open an issue or reach out!

- **GitHub Issues**: [Report a bug](https://github.com/yashikachandrakar04/Journal/issues)
- **Pull Requests**: [Contribute](https://github.com/yashikachandrakar04/Journal/pulls)

---

<p align="center">
  Made with ❤️ using React Native
</p>

<p align="center">
  ⭐ If you like this project, give it a star! ⭐
</p>