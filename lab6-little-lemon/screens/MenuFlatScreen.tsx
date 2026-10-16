import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { MenuItemRow } from '../components/MenuItemRow';
import { menuItems } from '../data/menu';
import type { MenuItem } from '../types/menu';

export default function MenuFlatScreen() {
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLocaleLowerCase('uk-UA');
  const visibleItems = menuItems.filter((item) =>
    item.name.toLocaleLowerCase('uk-UA').includes(normalizedQuery),
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Пошук страви…"
        value={query}
        onChangeText={setQuery}
        accessibilityLabel="Пошук у меню"
      />
      <FlatList<MenuItem>
        style={styles.list}
        contentContainerStyle={styles.content}
        data={visibleItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemRow item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={<Text style={styles.header}>Меню Little Lemon</Text>}
        ListEmptyComponent={<Text style={styles.empty}>Страв за запитом не знайдено.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9CDD7',
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#EDEFEE',
    marginHorizontal: 20,
  },
  empty: {
    paddingHorizontal: 20,
    paddingTop: 16,
    fontSize: 16,
    color: '#333333',
  },
});
