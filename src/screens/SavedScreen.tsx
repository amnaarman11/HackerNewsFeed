import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Story } from '../utils/types';
import StoryCard from '../components/StoryCard';

interface Props {
  darkMode: boolean;
  toggleDark: () => void;
}

export default function SavedScreen({ darkMode, toggleDark }: Props) {
  const [savedStories, setSavedStories] = React.useState<Story[]>([]);

  React.useEffect(() => {
    loadSaved();
  }, []);

  const loadSaved = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const savedKeys = keys.filter((k) => k.startsWith('saved_'));
    const items = await AsyncStorage.multiGet(savedKeys);
    const stories = items
      .map(([_, val]) => (val ? JSON.parse(val) : null))
      .filter(Boolean);
    setSavedStories(stories);
  };

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkBg]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🔖 Saved Stories</Text>
        <TouchableOpacity onPress={toggleDark} style={styles.toggleBtn}>
          <Text style={styles.toggleText}>{darkMode ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      </View>
      {savedStories.length === 0 ? (
        <View style={styles.empty}>
          <Text style={[styles.emptyText, darkMode && styles.lightText]}>No saved stories yet!</Text>
          <Text style={[styles.emptySubText, darkMode && styles.lightText]}>Tap 📌 Save on any story to save it here.</Text>
        </View>
      ) : (
        <FlatList
          data={savedStories}
          keyExtractor={(item) => item.objectID}
          renderItem={({ item }) => <StoryCard story={item} darkMode={darkMode} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  darkBg: { backgroundColor: '#121212' },
  header: { backgroundColor: '#ff6600', paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  toggleBtn: { padding: 4 },
  toggleText: { fontSize: 22 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#333' },
  emptySubText: { fontSize: 14, color: '#888', marginTop: 8 },
  lightText: { color: '#eee' },
});