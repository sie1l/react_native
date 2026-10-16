import { StyleSheet, Text, View } from 'react-native';
import type { MenuItem } from '../types/menu';

type MenuItemRowProps = {
  item: MenuItem;
};

export function MenuItemRow({ item }: MenuItemRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price.toFixed(2)} грн</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginRight: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495E57',
  },
});
