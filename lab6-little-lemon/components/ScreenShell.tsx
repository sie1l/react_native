import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LittleLemonFooter } from './LittleLemonFooter';
import { LittleLemonHeader } from './LittleLemonHeader';
import type { Palette } from '../theme/palette';

type ScreenShellProps = {
  colors: Palette;
  children: ReactNode;
  /**
   * Stack і Drawer не мають нижньої панелі, тому їм потрібен відступ під
   * системний home indicator. У Tabs цей відступ уже враховує tab bar.
   */
  safeBottom?: boolean;
};

export function ScreenShell({
  colors,
  children,
  safeBottom = false,
}: ScreenShellProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.shell,
        {
          backgroundColor: colors.background,
          paddingBottom: safeBottom ? insets.bottom : 0,
        },
      ]}
    >
      <LittleLemonHeader colors={colors} />
      <View style={styles.content}>{children}</View>
      <LittleLemonFooter colors={colors} />
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
