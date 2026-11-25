import { useState } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LittleLemonFooter } from '../components/LittleLemonFooter';
import { LittleLemonHeader } from '../components/LittleLemonHeader';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { darkColors, lightColors } from '../theme/palette';

export default function Lab8App() {
  const [demoEmail, setDemoEmail] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: colors.background }]}
      edges={['top', 'bottom']}
    >
      <LittleLemonHeader colors={colors} />
      <View style={styles.content}>
        {demoEmail === null ? (
          <LoginScreen colors={colors} onContinue={setDemoEmail} />
        ) : (
          <WelcomeScreen
            colors={colors}
            email={demoEmail}
            onExit={() => setDemoEmail(null)}
          />
        )}
      </View>
      <LittleLemonFooter colors={colors} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
