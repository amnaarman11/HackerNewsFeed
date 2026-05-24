# HackerNews Feed

A React Native app that displays an infinite-scrolling feed of stories from the Hacker News Algolia API, with optimistic like and save actions, and locally persisted saves.

## How to Run Locally

### Prerequisites
- Node.js v20+
- Android Studio with Android SDK
- A physical Android device or emulator
- JDK 17+

### Steps

1. Clone the repository:
   git clone https://github.com/YOUR_USERNAME/HackerNewsFeed.git
   cd HackerNewsFeed

2. Install dependencies:
   npm install

3. Start Metro bundler:
   npm start

4. In a new terminal, run on Android:
   npm run android

## Platform Tested
- Android (Physical device: Infinix X6833B, Android 14)
- iOS: Not tested

## Architecture & Decisions

### Data Fetching
- Used TanStack React Query with useInfiniteQuery for infinite scrolling
- Axios for HTTP requests to the Hacker News Algolia API
- Automatic pagination using nbPages from API response

### State Management
- React Query handles server state and caching
- Local component state for like/save UI
- AsyncStorage for persisting saved stories

### Optimistic Updates
- Like and Save actions update UI instantly before API response
- Mock API resolves after 300-800ms random delay
- 15% rejection rate with automatic UI rollback on failure
- User informed via Alert on failure

### Performance
- FlatList for efficient large list rendering
- onEndReachedThreshold for smooth infinite scroll
- Pull to refresh with RefreshControl

### UI/UX
- Custom dark mode toggle
- Splash screen on app launch
- Bottom tab navigation (Feed + Saved)
- Time ago format for story timestamps
- Domain name displayed on each card
- Graceful handling of null URLs (Ask HN posts)

## Tradeoffs

- Used custom tab bar instead of react-navigation to avoid NDK compatibility issues
- Likes are not persisted (only saves) — assessment only required save persistence
- No skeleton loading screens — used activity indicator for simplicity

## What I Would Add With More Time

- Skeleton loading cards for better UX
- Search functionality
- Story comments view
- Liked stories persistence and tab
- Offline support with cached stories
- Better error handling with retry logic
- Unit and integration tests
- iOS support

## AI Assistance

Used Claude AI throughout development for:
- Setting up the project structure
- Writing the infinite scroll logic with React Query
- Implementing optimistic updates with rollback
- Debugging Android build errors (NDK, Kotlin version conflicts)

Verified output by:
- Testing each feature on a real Android device
- Checking rollback behavior by observing the 15% failure rate
- Manually verifying saved stories persist after app close/reopen
- Reading and understanding each code file before applying