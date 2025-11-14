import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LeaveRequestScreen() {
  const [reason, setReason] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const colorScheme = useColorScheme();

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const handleSubmit = () => {
    if (!reason.trim()) {
      Alert.alert('Error', 'Please fill in the reason.');
      return;
    }
    Alert.alert('Success', `Leave request submitted for ${date.toDateString()}!`, [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Leave Request</ThemedText>
      <TextInput
        style={[styles.input, { color: Colors[colorScheme ?? 'light'].text, backgroundColor: Colors[colorScheme ?? 'light'].background }]}
        placeholder="Leave Reason"
        placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
        value={reason}
        onChangeText={setReason}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={[styles.input, { backgroundColor: Colors[colorScheme ?? 'light'].background }]} onPress={showDatePicker}>
        <ThemedText style={{ color: Colors[colorScheme ?? 'light'].text }}>{date.toDateString()}</ThemedText>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <ThemedText type="defaultSemiBold">Submit</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
});