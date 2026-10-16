import { StyleSheet, Text, View } from 'react-native';

export function LittleLemonFooter() {
  const year = new Date().getFullYear();

  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© {year} Little Lemon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#495E57',
  },
  text: {
    color: '#EDEFEE',
    fontSize: 12,
    textAlign: 'center',
  },
});
