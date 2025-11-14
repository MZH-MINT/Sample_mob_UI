import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Services</ThemedText>
      <ThemedView style={styles.servicesContainer}>
        <TouchableOpacity style={styles.serviceItem} onPress={() => router.push('/leave-request')}>
          <ThemedView style={styles.iconCircle}>
            <IconSymbol name="calendar" size={30} color="#fff" />
          </ThemedView>
          <ThemedText type="subtitle">Leaves</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.serviceItem} onPress={() => router.push('/attendance')}>
          <ThemedView style={styles.iconCircle}>
            <IconSymbol name="person.circle" size={30} color="#fff" />
          </ThemedView>
          <ThemedText type="subtitle">Attendance</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  serviceItem: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});