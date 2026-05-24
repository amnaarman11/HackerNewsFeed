import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.outerCircle}>
        <View style={styles.innerCircle}>
          <View style={styles.flameOuter}>
            <View style={styles.flameMid}>
              <View style={styles.flameInner} />
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.title}>HN FEED</Text>
      <Text style={styles.subtitle}>HACKER NEWS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' },
  outerCircle: { width: 200, height: 200, borderRadius: 100, backgroundColor: '#ff6600', justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: '#ff6600' },
  innerCircle: { width: 184, height: 184, borderRadius: 92, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' },
  flameOuter: { width: 76, height: 104, borderRadius: 38, backgroundColor: '#ff6600', justifyContent: 'center', alignItems: 'center' },
  flameMid: { width: 52, height: 80, borderRadius: 26, backgroundColor: '#ffaa00', justifyContent: 'center', alignItems: 'center' },
  flameInner: { width: 28, height: 52, borderRadius: 14, backgroundColor: '#ffe066' },
  title: { color: '#ffffff', fontSize: 36, fontWeight: '700', letterSpacing: 6, marginTop: 32 },
  subtitle: { color: '#ff6600', fontSize: 14, letterSpacing: 8, marginTop: 8 },
});