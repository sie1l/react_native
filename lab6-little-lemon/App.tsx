import { useColorScheme } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Lab7App from './labs/Lab7App';
import Lab8App from './labs/Lab8App';
import DrawerFlow from './navigation/DrawerFlow';
import StackFlow from './navigation/StackFlow';
import TabsFlow from './navigation/TabsFlow';

const activeLab: 'lab7' | 'lab8' | 'lab9' = 'lab9';

// Для №9 змініть цей рядок на StackFlow, TabsFlow або DrawerFlow.
const ActiveNavigator = StackFlow;


export default function App() {
  const isDark = useColorScheme() === 'dark';

  return ( 
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style={isDark && activeLab !== 'lab7' ? 'light' : 'dark'} />
        {activeLab === 'lab7' && <Lab7App />}
        {activeLab === 'lab8' && <Lab8App />}
        {activeLab === 'lab9' && (
          <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
            <ActiveNavigator />
          </NavigationContainer>
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
