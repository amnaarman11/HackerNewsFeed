import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Linking,
} from 'react-native';
import { Story } from '../utils/types';
import { mockLikeSave } from '../utils/mockApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  story: Story;
  darkMode: boolean;
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function getDomain(url: string | null): string {
  if (!url) return 'Ask HN';
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return '';
  }
}

export default function StoryCard({ story, darkMode }: Props) {
  const [liked, setLiked] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    AsyncStorage.getItem(`saved_${story.objectID}`).then((val) => {
      if (val) setSaved(true);
    });
  }, []);

  const handleLike = async () => {
    const prev = liked;
    setLiked(!liked);
    try {
      await mockLikeSave();
    } catch {
      setLiked(prev);
      Alert.alert('Error', 'Could not like story. Please try again.');
    }
  };

  const handleSave = async () => {
    const prev = saved;
    setSaved(!saved);
    try {
      await mockLikeSave();
      if (!saved) {
        await AsyncStorage.setItem(`saved_${story.objectID}`, JSON.stringify(story));
      } else {
        await AsyncStorage.removeItem(`saved_${story.objectID}`);
      }
    } catch {
      setSaved(prev);
      Alert.alert('Error', 'Could not save story. Please try again.');
    }
  };

  const handleOpen = () => {
    if (story.url) {
      Linking.openURL(story.url);
    } else {
      Alert.alert('Ask HN', story.story_text || 'No content available.');
    }
  };

  const dark = darkMode;

  return (
    <TouchableOpacity
      onPress={handleOpen}
      style={[styles.card, dark && styles.cardDark]}
    >
      <Text style={[styles.domain, dark && styles.domainDark]}>
        {getDomain(story.url)}
      </Text>
      <Text style={[styles.title, dark && styles.titleDark]}>
        {story.title}
      </Text>
      <View style={styles.metaRow}>
        <Text style={[styles.meta, dark && styles.metaDark]}>
          👤 {story.author}
        </Text>
        <Text style={[styles.meta, dark && styles.metaDark]}>
          ⬆️ {story.points}
        </Text>
        <Text style={[styles.meta, dark && styles.metaDark]}>
          💬 {story.num_comments}
        </Text>
        <Text style={[styles.meta, dark && styles.metaDark]}>
          🕐 {timeAgo(story.created_at)}
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleLike} style={styles.actionBtn}>
          <Text style={[styles.actionText, liked && styles.liked]}>
            {liked ? '❤️ Liked' : '🤍 Like'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={styles.actionBtn}>
          <Text style={[styles.actionText, saved && styles.saved]}>
            {saved ? '🔖 Saved' : '📌 Save'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 6,
    padding: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  cardDark: { backgroundColor: '#1e1e1e' },
  domain: { fontSize: 11, color: '#ff6600', fontWeight: '600', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  domainDark: { color: '#ff8c42' },
  title: { fontSize: 16, fontWeight: '700', color: '#1a1a1a', lineHeight: 22, marginBottom: 10 },
  titleDark: { color: '#f0f0f0' },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  meta: { fontSize: 12, color: '#888' },
  metaDark: { color: '#aaa' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginBottom: 10 },
  actions: { flexDirection: 'row', gap: 16 },
  actionBtn: { paddingVertical: 4, paddingHorizontal: 8 },
  actionText: { fontSize: 13, color: '#aaa', fontWeight: '500' },
  liked: { color: '#e53e3e' },
  saved: { color: '#3182ce' },
});