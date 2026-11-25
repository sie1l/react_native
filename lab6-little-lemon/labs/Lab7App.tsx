import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LittleLemonFooter } from "../components/LittleLemonFooter";
import { LittleLemonHeader } from "../components/LittleLemonHeader";
import LoginScreen from "../screens/LoginScreen";
import MenuFlatScreen from "../screens/MenuFlatScreen";
import MenuGroupedScreen from "../screens/MenuGroupedScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { lightColors } from "../theme/palette";

// Лабораторні №6–7: без навігації, один активний екран між шапкою та підвалом.
// Для демонстрації по черзі підставляйте сюди:
// 'menu-flat', 'menu-grouped', 'welcome', 'login'.
const activeScreen: "menu-flat" | "menu-grouped" | "welcome" | "login" =
  "login";

// У №6–7 ще не було темної теми, тому використовуємо світлу палітру.
const colors = lightColors;

function ActiveScreen() {
  switch (activeScreen) {
    case "menu-flat":
      return <MenuFlatScreen />;
    case "menu-grouped":
      return <MenuGroupedScreen />;
    case "welcome":
      return <WelcomeScreen colors={colors} email="Гість" onExit={() => {}} />;
    case "login":
      return <LoginScreen colors={colors} onContinue={() => {}} />;
  }
}

export default function Lab7App() {
  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <LittleLemonHeader colors={colors} />
      <View style={styles.content}>
        <ActiveScreen />
      </View>
      <LittleLemonFooter colors={colors} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
