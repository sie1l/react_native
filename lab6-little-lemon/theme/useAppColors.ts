import { useColorScheme } from 'react-native';
import { darkColors, lightColors } from './palette';

export function useAppColors() {
  return useColorScheme() === 'dark' ? darkColors : lightColors;
}
