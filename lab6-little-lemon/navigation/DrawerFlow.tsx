import { createDrawerNavigator } from '@react-navigation/drawer';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { ScreenShell } from '../components/ScreenShell';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { useAppColors } from '../theme/useAppColors';
import type { DrawerParamList } from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();

type LoginProps = DrawerScreenProps<DrawerParamList, 'Login'>;
type WelcomeProps = DrawerScreenProps<DrawerParamList, 'Welcome'>;

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
        email={route.params?.email ?? 'Гість'}
        onExit={() => navigation.navigate('Login')}
      />
    </ScreenShell>
  );
}

export default function DrawerFlow() {
  return (
    <Drawer.Navigator
      initialRouteName="Login"
      screenOptions={{ drawerPosition: 'left' }}
    >
      <Drawer.Screen
        name="Login"
        component={LoginRoute}
        options={{ title: 'Навчальна форма', drawerLabel: 'Форма' }}
      />
      <Drawer.Screen
        name="Welcome"
        component={WelcomeRoute}
        options={{ title: 'Привітання', drawerLabel: 'Привітання' }}
      />
    </Drawer.Navigator>
  );
}
