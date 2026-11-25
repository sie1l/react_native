import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import type { Palette } from '../theme/palette';

type WelcomeScreenProps = {
  colors: Palette;
  email: string;
  onExit: () => void;
  onOpenPreferences?: () => void;
  onOpenCustomers?: () => void;
};

export default function WelcomeScreen({
  colors,
  email,
  onExit,
  onOpenPreferences,
  onOpenCustomers,
}: WelcomeScreenProps) {
  const [name, setName] = useState('');
  const { width } = useWindowDimensions();
  const wide = width >= 600;

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={[styles.hero, wide && styles.heroWide]}>
        <Image
          source={require('../assets/images/logo.png')}
          style={[styles.logo, wide && styles.logoWide]}
          resizeMode="contain"
          accessible
          accessibilityLabel="Логотип Little Lemon"
        />

        <View style={styles.heroText}>
          <Text style={[styles.heading, { color: colors.text }]}>
            Ласкаво просимо до Little Lemon
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.cardText, { color: colors.text }]}>
              Навчальний екран привітання для{' '}
              {email === 'Гість' ? 'гостя' : email}.
            </Text>
          </View>
        </View>
      </View>

      <Text style={[styles.paragraph, { color: colors.text }]}>
        Little Lemon — родинний ресторан середземноморської кухні в самому
        серці Чикаго. Ми поєднуємо традиційні рецепти з Італії, Греції та
        Лівану з місцевими сезонними продуктами.
      </Text>

      <Text style={[styles.paragraph, { color: colors.text }]}>
        У меню — закуски на кшталт хумусу та фалафелю, основні страви з
        лосося й сочевичного бургера, легкі додатки та домашні десерти,
        зокрема баклава й тірамісу.
      </Text>

      <Text style={[styles.paragraph, { color: colors.text }]}>
        Ресторан працює щодня з 11:00 до 22:00. Ми приймаємо як невеликі
        компанії, так і великі родинні зустрічі, а для постійних гостей
        завжди знайдеться столик біля вікна.
      </Text>

      <Text style={[styles.paragraph, { color: colors.text }]}>
        Наша команда шеф-кухарів щотижня оновлює сезонні пропозиції,
        орієнтуючись на свіжість продуктів з місцевих фермерських ринків.
        Загляньте до нас — і відчуйте смак Середземномор'я просто в центрі
        міста.
      </Text>

      <View style={styles.nameSection}>
        <Text style={[styles.label, { color: colors.text }]}>Ваше ім'я</Text>
        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
          placeholder="Введіть ім'я"
          placeholderTextColor={colors.muted}
          value={name}
          onChangeText={setName}
          accessibilityLabel="Ваше ім'я"
        />
        <Text style={[styles.greeting, { color: colors.text }]}>
          {name.trim() ? `Вітаємо, ${name.trim()}!` : 'Введіть ім’я.'}
        </Text>
      </View>

      {onOpenPreferences && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Налаштування"
          onPress={onOpenPreferences}
          style={({ pressed }) => [
            styles.button,
            styles.buttonGap,
            { backgroundColor: colors.accent },
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={[styles.buttonText, { color: colors.onAccent }]}>Налаштування</Text>
        </Pressable>
      )}

      {onOpenCustomers && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Клієнти"
          onPress={onOpenCustomers}
          style={({ pressed }) => [
            styles.button,
            styles.buttonGap,
            { backgroundColor: colors.accent },
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={[styles.buttonText, { color: colors.onAccent }]}>Клієнти</Text>
        </Pressable>
      )}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Повернутися до форми входу"
        onPress={onExit}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: colors.accent },
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={[styles.buttonText, { color: colors.onAccent }]}>
          Повернутися до форми
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  hero: {
    marginBottom: 20,
  },
  heroWide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  logo: {
    width: 120,
    height: 140,
    alignSelf: 'center',
    marginBottom: 16,
  },
  logoWide: {
    alignSelf: 'flex-start',
    marginBottom: 0,
  },
  heroText: {
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  nameSection: {
    marginTop: 8,
    marginBottom: 24,
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
    marginBottom: 8,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGap: {
    marginBottom: 12,
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
