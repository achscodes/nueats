import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { supabase } from '../../lib/supabase';

export default function RecoveryScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleUrl = async (url) => {
      if (!url) return;
      const hash = url.split('#')[1] || '';
      const params = new URLSearchParams(hash);
      if (params.get('type') === 'recovery') {
        const access_token = params.get('access_token');
        const refresh_token = params.get('refresh_token');
        if (access_token && refresh_token) {
          await supabase.auth.setSession({ access_token, refresh_token });
        }
      }
    };
    Linking.getInitialURL().then(handleUrl);
    const sub = Linking.addEventListener('url', ({ url }) => handleUrl(url));
    return () => sub.remove();
  }, []);

  const onSubmit = async () => {
    setMessage('');
    if (!password || password.length < 6) {
      setMessage('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setMessage('Passwords do not match.');
      return;
    }
    try {
      setBusy(true);
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setMessage(error.message || 'Failed to update password.');
        setBusy(false);
        return;
      }
      Alert.alert('Success', 'Password updated. Please sign in.');
      navigation.replace('/Login');
    } catch (e) {
      setMessage(e.message || 'Unexpected error.');
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />
      {message ? <Text style={styles.error}>{message}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={busy}>
        <Text style={styles.buttonText}>{busy ? 'Updating...' : 'Update Password'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { height: 48, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 12, marginBottom: 12 },
  button: { backgroundColor: '#2c3e91', padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
  error: { color: '#b91c1c', marginBottom: 12, textAlign: 'center' },
});


