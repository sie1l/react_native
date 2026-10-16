import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

function isEmailFormatValid(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  function handleEmailBlur() {
    const normalized = email.trim();
    setEmail(normalized);
    setEmailTouched(true);
  }

  const emailStatus =
    !emailTouched || email === ''
      ? null
      : isEmailFormatValid(email)
        ? '✓ Формат email виглядає коректним'
        : 'Перевірте формат email (приклад: name@example.com)';

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <Text style={styles.heading}>Вхід до Little Lemon</Text>
        <Text style={styles.description}>
          Навчальна форма входу: дані перевіряються лише локально, запити на
          сервер не надсилаються.
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="name@example.com"
            value={email}
            onChangeText={setEmail}
            onBlur={handleEmailBlur}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="Email"
          />
          {emailStatus && (
            <Text
              style={[
                styles.status,
                isEmailFormatValid(email) ? styles.statusOk : styles.statusWarn,
              ]}
            >
              {emailStatus}
            </Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Пароль</Text>
          <TextInput
            style={styles.input}
            placeholder="Введіть пароль"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            submitBehavior="blurAndSubmit"
            accessibilityLabel="Пароль"
          />
          <Text style={styles.status}>
            {password === '' ? 'Введіть пароль' : '✓ Пароль введено'}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#5A5A5A',
    marginBottom: 24,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D9CDD7',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },
  status: {
    marginTop: 6,
    fontSize: 13,
    color: '#5A5A5A',
  },
  statusOk: {
    color: '#2F7A3D',
  },
  statusWarn: {
    color: '#9B1C1C',
  },
});
