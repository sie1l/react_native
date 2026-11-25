import type { ComponentProps } from 'react';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScreenShell } from '../components/ScreenShell';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { useAppColors } from '../theme/useAppColors';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

type LoginProps = BottomTabScreenProps<TabParamList, 'Login'>;
type WelcomeProps = BottomTabScreenProps<TabParamList, 'Welcome'>;
type IconName = ComponentProps<typeof Ionicons>['name'];

function LoginRoute({ navigation }: LoginProps) {
  const colors = useAppColors();

  return (
    <ScreenShell colors={colors}>
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
    <ScreenShell colors={colors}>
      <WelcomeScreen
        colors={colors}
        email={route.params?.email ?? 'Гість'}
        onExit={() => navigation.navigate('Login')}
      />
    </ScreenShell>
  );
}

export default function TabsFlow() {
  const isDark = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      initialRouteName="Login"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: isDark ? '#8AB4F8' : '#175CD3',
        tabBarIcon: ({ color, size, focused }) => {
          const name: IconName =
            route.name === 'Login'
              ? focused
                ? 'log-in'
                : 'log-in-outline'
              : focused
                ? 'home'
                : 'home-outline';

          return <Ionicons name={name} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen
        name="Login"
        component={LoginRoute}
        options={{ title: 'Форма', tabBarLabel: 'Форма' }}
      />
      <Tab.Screen
        name="Welcome"
        component={WelcomeRoute}
        options={{ title: 'Привітання', tabBarLabel: 'Привітання' }}
      />
    </Tab.Navigator>
  );
}
