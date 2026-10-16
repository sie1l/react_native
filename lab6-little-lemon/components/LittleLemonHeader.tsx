import { StyleSheet, Text, View } from 'react-native';

export function LittleLemonHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Little Lemon</Text>
      <Text style={styles.subtitle}>Чикаго · домашня середземноморська кухня</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#495E57',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: '#EDEFEE',
    fontSize: 14,
    marginTop: 4,
  },
});
