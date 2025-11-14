import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const colorScheme = useColorScheme();

  const handleLogin = () => {
    if (username.toLowerCase() === 'user' && password === 'user123') {
      router.push('/home');
    } else {
      Alert.alert('Invalid credentials', 'Please check your username and password.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Login</ThemedText>
      <TextInput
        style={[styles.input, { color: Colors[colorScheme ?? 'light'].text, backgroundColor: Colors[colorScheme ?? 'light'].background }]}
        placeholder="Username"
        placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, { color: Colors[colorScheme ?? 'light'].text, backgroundColor: Colors[colorScheme ?? 'light'].background }]}
        placeholder="Password"
        placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <ThemedText type="defaultSemiBold">Login</ThemedText>
      </TouchableOpacity>
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
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
});