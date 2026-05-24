import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FeedScreen from './src/screens/FeedScreen';
import SavedScreen from './src/screens/SavedScreen';
import SplashScreen from './src/screens/SplashScreen';

const queryClient = new QueryClient();

export default function App() {
  const [activeTab, setActiveTab] = React.useState<'Feed' | 'Saved'>('Feed');
  const [darkMode, setDarkMode] = React.useState(false);
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleDark = () => setDarkMode((prev) => !prev);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <View style={[styles.container, darkMode && styles.darkBg]}>
          <View style={styles.screen}>
            {activeTab === 'Feed' ? (
              <FeedScreen darkMode={darkMode} toggleDark={toggleDark} />
            ) : (
              <SavedScreen darkMode={darkMode} toggleDark={toggleDark} />
            )}
          </View>
          <View style={[styles.tabBar, darkMode && styles.tabBarDark]}>
            <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('Feed')}>
              <Text style={styles.tabIcon}>🏠</Text>
              <Text style={[styles.tabLabel, activeTab === 'Feed' && styles.active]}>Feed</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('Saved')}>
              <Text style={styles.tabIcon}>🔖</Text>
              <Text style={[styles.tabLabel, activeTab === 'Saved' && styles.active]}>Saved</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  darkBg: { backgroundColor: '#121212' },
  screen: { flex: 1 },
  tabBar: { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee', paddingBottom: 8 },
  tabBarDark: { backgroundColor: '#1e1e1e', borderTopColor: '#333' },
  tab: { flex: 1, alignItems: 'center', paddingTop: 8 },
  tabIcon: { fontSize: 20 },
  tabLabel: { fontSize: 12, color: '#999', marginTop: 2 },
  active: { color: '#ff6600', fontWeight: 'bold' },
});