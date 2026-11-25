import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenShell } from '../components/ScreenShell';
import CustomersScreen from '../screens/CustomersScreen';
import LoginScreen from '../screens/LoginScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import RemoteMenuScreen from '../screens/RemoteMenuScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { useAppColors } from '../theme/useAppColors';
import type { StackParamList } from './types';

const Stack = createNativeStackNavigator<StackParamList>();

type LoginProps = NativeStackScreenProps<StackParamList, 'Login'>;
type WelcomeProps = NativeStackScreenProps<StackParamList, 'Welcome'>;

function LoginRoute({ navigation }: LoginProps) {
  const colors = useAppColors();

  return (
    <ScreenShell colors={colors} safeBottom>
      <LoginScreen
        colors={colors}
        onContinue={(email) => navigation.navigate('Welcome', { email })}
      />
    </ScreenShell>
  );
}

function WelcomeRoute({ navigation, route }: WelcomeProps) {
  const colors = useAppColors();

  return (
    <ScreenShell colors={colors} safeBottom>
      <WelcomeScreen
        colors={colors}
        email={route.params.email}
        onExit={() => navigation.goBack()}
        onOpenPreferences={() => navigation.navigate('Preferences')}
        onOpenCustomers={() => navigation.navigate('Customers')}
      />
    </ScreenShell>
  );
}

export default function StackFlow() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginRoute}
        options={{ title: 'Навчальна форма' }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeRoute}
        options={({ navigation }) => ({
          title: 'Привітання',
          headerRight: () => (
            <Button title="Меню" onPress={() => navigation.navigate('RemoteMenu')} />
          ),
        })}
      />
      <Stack.Screen
        name="RemoteMenu"
        component={RemoteMenuScreen}
        options={{ title: 'Меню Little Lemon' }}
      />
      <Stack.Screen
        name="Preferences"
        component={PreferencesScreen}
        options={{ title: 'Налаштування' }}
      />
      <Stack.Screen
        name="Customers"
        component={CustomersScreen}
        options={{ title: 'Клієнти' }}
      />
    </Stack.Navigator>
  );
}
