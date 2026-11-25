import AsyncStorage from '@react-native-async-storage/async-storage';

export type Preferences = {
  pushNotifications: boolean;
  emailMarketing: boolean;
  latestNews: boolean;
  showMenuHints: boolean;
};

export const defaults: Preferences = {
  pushNotifications: false,
  emailMarketing: false,
  latestNews: false,
  showMenuHints: false,
};

// Один власний ключ для всього об'єкта налаштувань.
export const KEY = '@little-lemon/preferences/v1';

// Поточна версія формату запису. Версія 1 мала три параметри (без showMenuHints).
const CURRENT_VERSION = 2;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/**
 * Перетворює рядок зі сховища на Preferences.
 * - null (ключа немає) -> стандартні значення;
 * - некоректний JSON або неправильна структура -> помилка, а не мовчазне
 *   перезаписування стандартними значеннями;
 * - формат версії 1 (три параметри) читається й доповнюється значенням
 *   за замовчуванням для нового параметра.
 */
export function parsePreferences(raw: string | null): Preferences {
  if (raw === null) return { ...defaults };

  const value: unknown = JSON.parse(raw);
  if (!isRecord(value) || !('version' in value) || !('data' in value)) {
    throw new Error('Невірний формат налаштувань.');
  }
  if (value.version !== 1 && value.version !== CURRENT_VERSION) {
    throw new Error('Невідома версія налаштувань.');
  }

  const p = value.data;
  if (
    !isRecord(p) ||
    typeof p.pushNotifications !== 'boolean' ||
    typeof p.emailMarketing !== 'boolean' ||
    typeof p.latestNews !== 'boolean'
  ) {
    throw new Error('Пошкоджені налаштування.');
  }

  let showMenuHints = defaults.showMenuHints;
  if (value.version === CURRENT_VERSION) {
    if (typeof p.showMenuHints !== 'boolean') {
      throw new Error('Пошкоджені налаштування.');
    }
    showMenuHints = p.showMenuHints;
  }

  return {
    pushNotifications: p.pushNotifications,
    emailMarketing: p.emailMarketing,
    latestNews: p.latestNews,
    showMenuHints,
  };
}

export async function readPreferences(): Promise<Preferences> {
  return parsePreferences(await AsyncStorage.getItem(KEY));
}

export async function writePreferences(data: Preferences): Promise<void> {
  await AsyncStorage.setItem(
    KEY,
    JSON.stringify({ version: CURRENT_VERSION, data }),
  );
}

// removeItem, а не clear(): видаляємо тільки власний ключ, а не весь AsyncStorage.
export async function removePreferences(): Promise<void> {
  await AsyncStorage.removeItem(KEY);
}
