export type Palette = {
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  accent: string;
  onAccent: string;
  error: string;
};

export const lightColors: Palette = {
  background: '#FFFFFF',
  surface: '#EDEFEE',
  text: '#25332E',
  muted: '#46584F',
  border: '#697B70',
  accent: '#EE9972',
  onAccent: '#222222',
  error: '#B3261E',
};

export const darkColors: Palette = {
  background: '#121815',
  surface: '#23312A',
  text: '#F2F5F3',
  muted: '#B4C4BA',
  border: '#81958A',
  accent: '#EE9972',
  onAccent: '#222222',
  error: '#FFB4AB',
};
