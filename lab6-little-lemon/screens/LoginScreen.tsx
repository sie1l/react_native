import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { Palette } from '../theme/palette';

type LoginScreenProps = {
  colors: Palette;
  onContinue: (email: string) => void;
};

function isEmailFormatValid(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function LoginScreen({ colors, onContinue }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleEmailChange(value: string) {
    setEmail(value);
    if (error !== null) {
      setError(null);
    }
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
    if (error !== null) {
      setError(null);
    }
  }

  function handleEmailBlur() {
    const normalized = email.trim();
    setEmail(normalized);
    setEmailTouched(true);
  }

  function handleContinue() {
    const normalizedEmail = email.trim();
    const emailLooksValid = isEmailFormatValid(normalizedEmail);

    if (!emailLooksValid) {
      setError('Введіть email у форматі name@example.com.');
      return;
    }

    if (password.length === 0) {
      setError('Введіть навчальний пароль.');
      return;
    }

    setError(null);
    Keyboard.dismiss();
    setPassword('');
    onContinue(normalizedEmail);
  }

  const emailLooksValid = isEmailFormatValid(email);
  const emailStatus =
    !emailTouched || email === ''
      ? null
      : emailLooksValid
        ? '✓ Формат email виглядає коректним'
        : 'Перевірте формат email (приклад: name@example.com)';

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <Text style={[styles.heading, { color: colors.text }]}>
          Вхід до Little Lemon
        </Text>
        <Text style={[styles.description, { color: colors.muted }]}>
          Навчальна форма входу: дані перевіряються лише локально, запити на
          сервер не надсилаються.
        </Text>

        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.text }]}>Email</Text>
          <TextInput
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            placeholder="name@example.com"
            placeholderTextColor={colors.muted}
            value={email}
            onChangeText={handleEmailChange}
            onBlur={handleEmailBlur}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="Email"
          />
          {emailStatus !== null && (
            <Text
              style={[
                styles.status,
                { color: emailLooksValid ? colors.muted : colors.error },
              ]}
            >
              {emailStatus}
            </Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.text }]}>Пароль</Text>
          <TextInput
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            placeholder="Введіть пароль"
            placeholderTextColor={colors.muted}
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            submitBehavior="blurAndSubmit"
            accessibilityLabel="Пароль"
          />
          <Text style={[styles.status, { color: colors.muted }]}>
            {password === '' ? 'Введіть пароль' : '✓ Пароль введено'}
          </Text>
        </View>

        {error !== null && (
          <Text
            style={[styles.message, { color: colors.error }]}
            accessibilityLiveRegion="polite"
          >
            {error}
          </Text>
        )}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Увійти в демонстраційний акаунт"
          onPress={handleContinue}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: colors.accent },
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={[styles.buttonText, { color: colors.onAccent }]}>
            Увійти (демо)
          </Text>
        </Pressable>
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
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },
  status: {
    marginTop: 6,
    fontSize: 13,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 12,
  },
  button: {
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
