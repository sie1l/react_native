import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function WelcomeScreen() {
  const [name, setName] = useState('');

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Ласкаво просимо до Little Lemon</Text>

      <Text style={styles.paragraph}>
        Little Lemon — родинний ресторан середземноморської кухні в самому
        серці Чикаго. Ми поєднуємо традиційні рецепти з Італії, Греції та
        Лівану з місцевими сезонними продуктами.
      </Text>

      <Text style={styles.paragraph}>
        У меню — закуски на кшталт хумусу та фалафелю, основні страви з
        лосося й сочевичного бургера, легкі додатки та домашні десерти,
        зокрема баклава й тірамісу.
      </Text>

      <Text style={styles.paragraph}>
        Ресторан працює щодня з 11:00 до 22:00. Ми приймаємо як невеликі
        компанії, так і великі родинні зустрічі, а для постійних гостей
        завжди знайдеться столик біля вікна.
      </Text>

      <Text style={styles.paragraph}>
        Наша команда шеф-кухарів щотижня оновлює сезонні пропозиції,
        орієнтуючись на свіжість продуктів з місцевих фермерських ринків.
        Загляньте до нас — і відчуйте смак Середземномор'я просто в центрі
        міста.
      </Text>

      <View style={styles.nameSection}>
        <Text style={styles.label}>Ваше ім'я</Text>
        <TextInput
          style={styles.input}
          placeholder="Введіть ім'я"
          value={name}
          onChangeText={setName}
          accessibilityLabel="Ваше ім'я"
        />
        <Text style={styles.greeting}>
          {name.trim() ? `Вітаємо, ${name.trim()}!` : 'Введіть ім’я.'}
        </Text>
      </View>
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
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    marginBottom: 16,
  },
  nameSection: {
    marginTop: 8,
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
    marginBottom: 8,
  },
  greeting: {
    fontSize: 16,
    color: '#495E57',
    fontWeight: '600',
  },
});
