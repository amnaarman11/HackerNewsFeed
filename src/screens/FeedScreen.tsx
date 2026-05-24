import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFeed } from '../hooks/useFeed';
import StoryCard from '../components/StoryCard';
import { Story } from '../utils/types';

interface Props {
  darkMode: boolean;
  toggleDark: () => void;
}

export default function FeedScreen({ darkMode, toggleDark }: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useFeed();

  const stories: Story[] = data?.pages.flatMap((page) => page.hits) ?? [];

  if (isLoading) {
    return (
      <View style={[styles.centered, darkMode && styles.darkBg]}>
        <ActivityIndicator size="large" color="#ff6600" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.centered, darkMode && styles.darkBg]}>
        <Text style={styles.error}>Failed to load stories.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkBg]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>⚡ Hacker News</Text>
        <TouchableOpacity onPress={toggleDark} style={styles.toggleBtn}>
          <Text style={styles.toggleText}>{darkMode ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={stories}
        keyExtractor={(item) => item.objectID}
        renderItem={({ item }) => (
          <StoryCard story={item} darkMode={darkMode} />
        )}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={['#ff6600']}
          />
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="small" color="#ff6600" style={styles.footer} />
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  darkBg: { backgroundColor: '#121212' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: 'red', fontSize: 16 },
  header: {
    backgroundColor: '#ff6600',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  toggleBtn: { padding: 4 },
  toggleText: { fontSize: 22 },
  footer: { paddingVertical: 16 },
});