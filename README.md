# 🚀 Startup Idea Evaluator

A React Native mobile application where users can submit startup ideas, receive a simulated AI rating, explore ideas from the community, vote on them, and view a leaderboard of the most-voted ideas.

Built as part of the PGAGI SDE Intern – Mobile Application Assignment.

## 📱 Overview

Startup Idea Evaluator follows a simple flow:

**Submit an idea → Get an AI rating → Explore ideas → Vote → View the leaderboard**

The application demonstrates:

- React Native development
- TypeScript
- Redux Toolkit state management
- Local data persistence
- React Navigation
- Theme management
- Component-based UI development
- User interaction and local voting logic

## ✨ Features

### 💡 Submit Startup Ideas

Users can submit a startup idea with:

- Idea name
- Tagline
- Description

The form includes validation to ensure the required fields are completed.

### 🤖 Simulated AI Rating

When an idea is submitted, the application generates a simulated rating between 0 and 100.

The rating is generated once during submission and stored with the idea, so it does not change when the application re-renders or restarts.

### 📋 Explore Startup Ideas

Users can browse all submitted startup ideas.

- Startup name
- Tagline
- Description
- AI rating
- Vote count

### 👍 Community Voting

Users can upvote startup ideas.

The application prevents the same device from voting for the same idea more than once.

Vote history is stored locally using AsyncStorage.

> **Note:** Since this implementation uses local storage rather than a backend voting system, the one-vote restriction is device-level rather than server-side.

### 📖 Read More

Long descriptions can be expanded and collapsed using:

- Read More
- Show Less

### 🔀 Sorting

Startup ideas can be sorted by:

- ⭐ AI Rating
- 👍 Vote Count

### 🏆 Leaderboard

The leaderboard displays the top 5 startup ideas based on vote count.

- Rank
- Startup name
- Tagline
- AI rating
- Vote count

The leaderboard uses custom rank badges and gradient cards for visual hierarchy.

### 🌙 Dark Mode

The application supports:

- Light Mode
- Dark Mode

The selected theme is persisted locally, so the user's preference remains after restarting the application.

## 🎨 UI / UX

- Floating glass-style bottom navigation
- Separate floating "+" button for submitting ideas
- Light and dark themes
- Theme-aware navigation
- Safe Area handling
- Custom leaderboard cards
- Rank badges
- Gradient cards
- Empty states
- Interactive sorting controls
- Expandable descriptions
- Visual feedback for voted ideas
- Consistent spacing and typography

The visual design uses a blue/indigo color palette to represent technology, creativity, and innovation.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React Native | Mobile application framework |
| Expo | Development and build environment |
| TypeScript | Type safety |
| Redux Toolkit | Global state management |
| React Redux | Connecting Redux with React Native |
| React Navigation | Application navigation |
| AsyncStorage | Local data persistence |
| Expo Blur | Glass-style UI effects |
| Expo Linear Gradient | Gradient UI elements |
| Expo Vector Icons | Icons |
| React Native Safe Area Context | Safe area handling |

## 🏗️ Project Structure

```
StartupIdeas/
│
├── App.tsx
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
│
└── src/
    │
    ├── components/
    │   └── FloatingBottomBar.tsx
    │
    ├── navigation/
    │   ├── RootNavigator.tsx
    │   └── MainTabNavigator.tsx
    │
    ├── screens/
    │   ├── HomeScreen.tsx
    │   ├── IdeasListScreen.tsx
    │   ├── LeaderboardScreen.tsx
    │   └── SubmitIdeaScreen.tsx
    │
    ├── store/
    │   ├── slices/
    │   │   ├── ideaSlice.ts
    │   │   └── themeSlice.ts
    │   ├── hooks.ts
    │   └── index.ts
    │
    ├── theme/
    │   ├── theme.ts
    │   └── useAppTheme.ts
    │
    ├── types/
    │   └── idea.ts
    │
    └── utils/
        ├── generateRating.ts
        ├── storage.ts
        └── voteStorage.ts
```

## 🧱 Architecture

The application follows a modular architecture that separates UI, state management, persistence, theme management, and utility logic.

### Presentation Layer

- Screens
- Reusable UI components
- Navigation
- User interactions
- Theme-aware UI rendering

### State Management Layer

Redux Toolkit manages application-wide state including:

- Startup ideas
- Vote counts
- Theme state

### Persistence Layer

AsyncStorage is used for local persistence of:

- Startup ideas
- Vote history
- Theme preference

### Utility Layer

Utility modules handle:

- Simulated rating generation
- Idea persistence
- Vote persistence

This separation keeps UI, state management, persistence, and utility logic independent and easier to maintain.

## 🧠 State Management

Redux Toolkit is used as the global state management solution.

The application contains two main slices.

### Ideas Slice

- Adding startup ideas
- Updating vote counts
- Loading persisted ideas

### Theme Slice

- Light/dark mode state
- Theme switching
- Restoring the saved theme preference

Typed Redux hooks are used throughout the application to provide type-safe state access and dispatching.

## 💾 Local Data Persistence

The application uses AsyncStorage for local persistence.

### Startup Ideas

Each idea stores:

- ID
- Name
- Tagline
- Description
- AI rating
- Vote count
- Creation timestamp

### Vote History

The IDs of ideas voted on by the current device are stored locally.

This prevents duplicate voting for the same idea on that device.

### Theme Preference

The selected light/dark theme is also persisted locally.

When the application starts, the saved data is loaded and restored into Redux state.

> **Note:** Because this implementation uses local storage, vote protection is device-level rather than server-side.

## 🤖 AI Rating Logic

The assignment requires an AI-generated rating.

For this implementation, a simulated rating is generated using a random integer between 0 and 100.

The rating is generated only once when the idea is submitted and then stored with the idea.

```
User submits idea
       ↓
Generate rating
       ↓
Create StartupIdea object
       ↓
Store in Redux
       ↓
Persist using AsyncStorage
```

This prevents the rating from changing during re-renders or application restarts.

> **Note:** The rating is intentionally simulated for this assignment and does not represent a real AI/ML inference system.

## 👍 Voting Logic

Voting uses a combination of Redux state and AsyncStorage.

```
User taps Upvote
       ↓
Check local vote history
       ↓
  Already voted?
   ↙          ↘
 Yes           No
 ↓             ↓
Block vote   Increase vote count
              ↓
        Save idea ID locally
```

This provides device-level duplicate-vote protection while keeping the implementation fully local.

## 🧭 Navigation

The application uses React Navigation with:

- Native Stack Navigator
- Bottom Tab Navigator

### Main Tabs

- 🏠 Home
- 💡 Ideas
- 🏆 Leaderboard

### Stack Screen

- Submit Idea

The custom floating bottom navigation provides access to the main sections, while the floating "+" button opens the idea submission screen.

## 🎨 Theme System

The application uses a centralized theme system.

Two themes are defined:

- Light Theme
- Dark Theme

Theme values include:

- Background colors
- Surface colors
- Primary colors
- Text colors
- Secondary text colors
- Borders
- Input backgrounds
- Error colors

Screens and reusable components consume the active theme rather than hardcoding colors throughout the UI.

This makes the UI easier to maintain and extend.

## 🏆 Leaderboard

The leaderboard displays the top 5 ideas based on vote count.

Each leaderboard entry contains:

- Rank
- Startup name
- Tagline
- Rating
- Vote count

The UI uses:

- Rank badges
- Gradient cards
- Visual hierarchy
- Trophy/medal icons

to make the leaderboard easy to scan.

## 🔄 Application Flow

```
                    ┌─────────────────┐
                    │      Home       │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ↓              ↓              ↓
         Submit Idea       Ideas       Leaderboard
              │              │              │
              ↓              ↓              ↓
        Generate Rating   Vote Ideas     Top 5 Ideas
              │              │
              ↓              ↓
          Save Idea       Save Vote
              │              │
              └───────┬──────┘
                      ↓
                 AsyncStorage
```

## 📱 Screens

### Home

Provides the main entry point into the application and gives users access to:

- Application overview
- Idea submission
- Ideas
- Leaderboard
- Theme switching

### Submit Idea

Allows users to enter:

- Startup name
- Tagline
- Description

After submission, a simulated AI rating is generated and the idea is saved.

### Ideas

Displays submitted startup ideas with:

- Rating
- Vote count
- Upvote action
- Read More / Show Less
- Sorting by rating or votes

### Leaderboard

Displays the top 5 most-voted startup ideas with a dedicated ranking UI.

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Expo development environment
- Android Studio or Expo Go

### Installation

Clone the repository:

```bash
git clone https://github.com/digvijay-io/startup-idea-evaluator.git
```

Navigate to the project:

```bash
cd startup-idea-evaluator
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npx expo start
```

The application can then be opened using:

- Expo Go
- Android Emulator
- Physical Android device

## 🧪 Testing Checklist

- ✓ Submit startup idea
- ✓ Required field validation
- ✓ Generate simulated AI rating
- ✓ Persist startup ideas
- ✓ Display submitted ideas
- ✓ Read More / Show Less
- ✓ Sort by rating
- ✓ Sort by vote count
- ✓ Upvote an idea
- ✓ Prevent duplicate voting on the same device
- ✓ Persist vote history
- ✓ Display leaderboard
- ✓ Display top 5 ideas
- ✓ Switch between light and dark mode
- ✓ Persist theme preference
- ✓ Navigate between application sections
- ✓ Test Android APK build
- ✓ Verify Android native UI rendering

## 🎁 Bonus Feature

### 🌙 Dark Mode

Dark mode was implemented as an additional feature.

The theme can be switched from the Home screen and the selected preference is persisted locally using AsyncStorage.

## 📦 Project Links

### 💻 Source Code

View GitHub Repository: https://github.com/digvijay-io/startup-idea-evaluator

### 📱 Android App

Download Android APK: https://expo.dev/artifacts/eas/sTx5hzE6JUySDpzmgM4FrixS_ZFqxMmOLpjZLUzb3vs.apk

The APK can be installed directly on an Android device for testing.

### 🔨 Build Details

View EAS Build: https://expo.dev/accounts/digvijay.d/projects/StartupIdeas/builds/d747c9f7-9642-4d31-b0b9-27adbe654700

### 🎥 Walkthrough

Walkthrough video link will be added here.

## 📋 Assignment

PGAGI – SDE Intern – Mobile Application Assignment

Project: Startup Idea Evaluator 🚀 – AI + Voting App

## 👨‍💻 Author

**Digvijay Deshmukh**
React Native Developer
GitHub: https://github.com/digvijay-io

## 📄 License

This project was created for educational and recruitment purposes.