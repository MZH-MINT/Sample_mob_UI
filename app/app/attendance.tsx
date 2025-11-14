import { useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

interface Entry {
  in: string;
  out: string | null;
}

export default function AttendanceScreen() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);

  const handleClock = () => {
    const now = new Date().toLocaleTimeString();
    if (!isClockedIn) {
      // Clock in
      setEntries(prev => [...prev, { in: now, out: null }]);
    } else {
      // Clock out
      setEntries(prev => {
        const newEntries = [...prev];
        if (newEntries.length > 0) {
          newEntries[newEntries.length - 1].out = now;
        }
        return newEntries;
      });
    }
    setIsClockedIn(!isClockedIn);
  };

  const renderEntry = ({ item }: { item: Entry }) => (
    <View style={styles.entryRow}>
      <ThemedText style={styles.entryText}>{item.in}</ThemedText>
      <ThemedText style={styles.entryText}>{item.out || '-'}</ThemedText>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleClock}>
        <ThemedText type="defaultSemiBold">{isClockedIn ? 'Clock Out' : 'Clock In'}</ThemedText>
      </TouchableOpacity>
      <ThemedText type="title" style={styles.title}>Attendance Entries</ThemedText>
      <View style={styles.tableHeader}>
        <ThemedText style={styles.headerText}>In Time</ThemedText>
        <ThemedText style={styles.headerText}>Out Time</ThemedText>
      </View>
      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  entryText: {
    flex: 1,
    textAlign: 'center',
  },
});