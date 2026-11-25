import { StyleSheet, Text, View } from 'react-native';
import type { Palette } from '../theme/palette';

type LittleLemonFooterProps = {
  colors: Palette;
};

export function LittleLemonFooter({ colors }: LittleLemonFooterProps) {
  const year = new Date().getFullYear();

  return (
    <View
      style={[
        styles.footer,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      ]}
    >
      <Text style={[styles.text, { color: colors.muted }]}>
        © {year} Little Lemon
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});
