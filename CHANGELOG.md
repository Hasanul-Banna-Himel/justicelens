# Changelog

All notable changes to this project will be documented in this file.

## Uncommitted Changes

- M app/(auth)/signup.tsx
- M app/(tabs)/_layout.tsx
- M app/(tabs)/contacts.tsx
- AM app/(tabs)/edit-profile.tsx
- M app/(tabs)/index.tsx
- M app/(tabs)/notification.tsx
- M app/(tabs)/profiles.tsx
- M app/(tabs)/schedule.tsx
- M app/_layout.tsx
- M contexts/authContext.tsx
- M contexts/postContext.tsx
- M package-lock.json
- M package.json
- M types/index.ts
- ?? app/(public)/
- ?? app/(tabs)/settings.tsx
- ?? assets/images/auth/female.png
- ?? assets/images/auth/male.png
- ?? assets/images/brand/
- ?? components/custom/StyledInput.tsx
- ?? components/custom/StyledSelect.tsx
- ?? components/custom/StyledTimePicker.tsx
- ?? components/custom/UpdateSchedule.tsx
- ?? contexts/globalDataContext.tsx
- ?? layout/LogoHeader.tsx
- ?? utils/functions/deepEqual.ts
- ?? views/

---

## [1.0.0] - 2025-08-29

### ✨ Features

- **(Nudge System)**: Implemented a global nudge modal system.
- **(Nudge System)**: Added sender's schedule to nudge notifications.
- **(Nudge System)**: Implemented "Accept/Deny" status for nudges (client-side update).
- **(Logging)**: Implemented notification logging to Firestore (`notifications` collection).
- **(Contacts)**: Updated Contacts tab to show user-specific contacts from `users/{userId}/contacts` sub-collection.
- **(UI)**: Combined Notifications and Travel History into one "Activity" tab with state-based sub-tabs.
- **(Logging)**: Implemented travel history logging to Firestore (`traveled_with` collection).
- **(Nudge Modal)**: Integrated `NudgeModal` to display sender's schedule and handle status updates.

### 🐛 Bug Fixes

- **(Firestore Rules)**: Fixed and refined Firestore security rules for `users`, `notifications`, `traveled_with`, and `contacts` (top-level and sub-collection).
- **(Dependencies)**: Resolved `expo doctor` and linting issues by updating dependencies to exact compatible versions.

### 🛠️ Chores

- **(Security)**: Moved Firebase client configuration to `.env` for enhanced security.
- **(Cleanup)**: Cleaned up `index.tsx` by removing redundant local nudge modal logic.
- **(Cleanup)**: Removed `traveled_log.tsx` and related layout entries.
- **(Context)**: Created `nudgeModalContext.tsx` for global modal management.

---

## [Unreleased]

### ✨ Features

- **(auth)**: signin button added (9ba2b0d)
  - `app/(auth)/get-started-1.tsx`
- **(auth)**: sign up page completed (706f4f5)
  - `app/(auth)/signup.tsx`
- **(auth)**: created (748a77f)
  - `app/(auth)/signin.tsx`
  - `app/(tabs)/index.tsx`
  - `contexts/authContext.tsx`
  - `utils/functions/validation.ts`
- **(components)**: component added (164a6a5)
  - `components/custom/SchedulePost.tsx`
- **(components)**: component added (634e7eb)
  - `components/custom/Chip.tsx`
- **(global)**: global clean container created (d096981)
  - `layout/ContainerGlobalClean.tsx`
- **(theme)**: theme context created (8232dd1)
  - `contexts/themeContext.tsx`
- **(auth)**: created (bad8d6f)
  - `contexts/authContext.tsx`
- **(assets)**: added (d40cf91)
  - `assets/images/auth/gs-1.png`
  - `assets/images/auth/gs-2.png`
  - `assets/images/auth/gs-3.png`
- **(auth)**: page created (c0ea94f)
  - `app/(auth)/signup.tsx`
- **(auth)**: page created (d05d6e5)
  - `app/(auth)/signin.tsx`
- **(firebase)**: firebase initialized (c891add)
  - `utils/firebase.ts`
- **(auth)**: page created (8eddc0d)
  - `app/(auth)/get-started-3.tsx`
- **(auth)**: page created (79747b2)
  - `app/(auth)/get-started-2.tsx`
- **(auth)**: page created (a63fcf6)
  - `app/(auth)/get-started-1.tsx`
- **(routes)**: created and added routes (27339cd)
  - `app/(auth)/_layout.tsx`
- **(packages)**: packages installed and added (3194cef)
  - `package-lock.json`
  - `package.json`
- **(config)**: generated (4d6a39d)
  - `metro.config.js`

### 🐛 Bug Fixes

- **(auth)**: fix (5ef62fb)
  - `app/_layout.tsx`

### 💅 Styling

- **(platform)**: updates to platform specific (ed4cb8e)
  - `layout/ContainerGlobalClean.tsx`
- **(colors)**: updated colors (42f9e16)
  - `constants/Colors.ts`
- **(auth)**: updates (c896497)
  - `app/(auth)/signin.tsx`
- **(auth)**: color change (8c15676)
  - `app/(auth)/get-started-1.tsx`
  - `app/(auth)/get-started-2.tsx`
  - `app/(auth)/get-started-3.tsx`
- **(colors)**: updates (afb15f3)
  - `constants/Colors.ts`

### 🛠️ Chores

- **(types)**: types and interfaces added (69e5ea3)
  - `types/index.ts`
- **(context)**: created post context (c2c64d1)
  - `contexts/postContext.tsx`
- **(logic)**: updates in logic and destructure (7e2044b)
  - `contexts/authContext.tsx`
- **(files)**: moved to different file location (baebe12)
  - `components/ui/HapticTab.tsx`
- **(screens)**: completed the screen (a0612e6)
  - `app/(tabs)/index.tsx`
- **(screens)**: created screens (5c2b937)
  - `app/(tabs)/contacts.tsx`
  - `app/(tabs)/notification.tsx`
  - `app/(tabs)/profiles.tsx`
  - `app/(tabs)/schedule.tsx`
- **(tabs)**: updated the tabs, added postContext and stylings (f33dd1c)
  - `app/(tabs)/_layout.tsx`
- **(not-found)**: updated (bc6c4c3)
  - `app/+not-found.tsx`
- **(data)**: added data files (2e7137e)
  - `data/areas.json`
  - `data/dhakaThanas.json`
  - `data/districts.json`
- **(files)**: removed un necessary files (ea472bd)
  - `app/(tabs)/explore.tsx`
  - `components/Collapsible.tsx`
  - `components/ExternalLink.tsx`
  - `components/HapticTab.tsx`
  - `components/HelloWave.tsx`
  - `components/ParallaxScrollView.tsx`
  - `components/ThemedText.tsx`
  - `components/ThemedView.tsx`
  - `components/ui/IconSymbol.ios.tsx`
  - `components/ui/IconSymbol.tsx`
  - `components/ui/TabBarBackground.ios.tsx`
  - `components/ui/TabBarBackground.tsx`
- **(auth)**: made the button to be sign up (a582ff8)
  - `app/(auth)/get-started-3.tsx`
- **(auth)**: updated the sign up function (9345815)
  - `contexts/authContext.tsx`
- **(auth)**: signup function added (ba122d9)
  - `contexts/authContext.tsx`
- **(auth)**: updates (dab3f86)
  - `contexts/authContext.tsx`
- **(tabs)**: updates (d799be3)
  - `app/(tabs)/index.tsx`
- **(tabs)**: updates (79bf917)
  - `app/(tabs)/_layout.tsx`
- **(firebase)**: updated (a0b9a59)
  - `utils/firebase.ts`
- **(auth)**: completed (2c3b1fb)
  - `app/(auth)/signin.tsx`
- **(hooks)**: updated (bf8dbf7)
  - `hooks/useThemeColor.ts`
- **(colors)**: updated (209e71b)
  - `constants/Colors.ts`
- **(tabs)**: page updated (b26f87c)
  - `app/(tabs)/_layout.tsx`
- **(app)**: updated & added auth context and (auth) route (15f1927)
  - `app/_layout.tsx`
- **(app)**: updated (ad79c2a)
  - `app.json`

### 📕 Docs

- **(initial)**: Initial commit (f6e7f2b)
  - `.gitignore`
  - `.vscode/settings.json`
  - `README.md`
  - `app.json`
  - `app/(tabs)/_layout.tsx`
  - `app/(tabs)/explore.tsx`
  - `app/(tabs)/index.tsx`
  - `app/+not-found.tsx`
  - `app/_layout.tsx`
  - `assets/fonts/SpaceMono-Regular.ttf`
  - `assets/images/adaptive-icon.png`
  - `assets/images/favicon.png`
  - `assets/images/icon.png`
  - `assets/images/partial-react-logo.png`
  - `assets/images/react-logo.png`
  - `assets/images/react-logo@2x.png`
  - `assets/images/react-logo@3x.png`
  - `assets/images/splash-icon.png`
  - `components/Collapsible.tsx`
  - `components/ExternalLink.tsx`
  - `components/HapticTab.tsx`
  - `components/HelloWave.tsx`
  - `components/ParallaxScrollView.tsx`
  - `components/ThemedText.tsx`
  - `components/ThemedView.tsx`
  - `components/ui/IconSymbol.ios.tsx`
  - `components/ui/IconSymbol.tsx`
  - `components/ui/TabBarBackground.ios.tsx`
  - `components/ui/TabBarBackground.tsx`
  - `constants/Colors.ts`
  - `eslint.config.js`
  - `hooks/useColorScheme.ts`
  - `hooks/useColorScheme.web.ts`
  - `hooks/useThemeColor.ts`
  - `package-lock.json`
  - `package.json`
  - `scripts/reset-project.js`
  - `tsconfig.json`