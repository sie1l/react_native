import { SectionList, StyleSheet, Text, View } from 'react-native';
import type { SectionListData } from 'react-native';
import { MenuItemRow } from '../components/MenuItemRow';
import { categories, menuItems } from '../data/menu';
import type { CategoryInfo, MenuItem } from '../types/menu';

const sections: SectionListData<MenuItem, CategoryInfo>[] = categories.map(
  (category) => ({
    ...category,
    data: menuItems.filter((item) => item.category === category.key),
  }),
);

export default function MenuGroupedScreen() {
  return (
    <SectionList<MenuItem, CategoryInfo>
      style={styles.list}
      contentContainerStyle={styles.content}
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <MenuItemRow item={item} />}
      renderSectionHeader={({ section }) => (
        <Text style={styles.sectionTitle}>{section.title}</Text>
      )}
      stickySectionHeadersEnabled={true}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={<Text style={styles.header}>Меню за категоріями</Text>}
    />
  );
}

const styles = StyleSheet.create({
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
    paddingTop: 16,
    paddingBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    backgroundColor: '#495E57',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#EDEFEE',
    marginHorizontal: 20,
  },
});
