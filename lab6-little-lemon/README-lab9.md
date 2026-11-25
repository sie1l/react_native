# Лабораторна робота №9. Навігація в React Native

Продовження застосунку Little Lemon (матеріали лабораторних №6–8).

## Що реалізовано

- Три окремі варіанти навігації:
  - `navigation/StackFlow.tsx` — Native Stack `Login → Welcome` зі стандартною кнопкою «Назад»;
  - `navigation/TabsFlow.tsx` — нижні вкладки з підписами та іконками Ionicons;
  - `navigation/DrawerFlow.tsx` — бічне меню з відкриттям кнопкою заголовка й жестом.
- Типізовані параметри маршрутів у `navigation/types.ts`.
- Оболонки маршрутів `LoginRoute` / `WelcomeRoute`, які передають екранам `colors` і callback-и.
- Спільний хук палітри `theme/useAppColors.ts`.
- `WelcomeScreen` відкривається і як гість (`route.params?.email ?? 'Гість'`) у вкладках і Drawer.
- Збережено форму, логотип, опис закладу, світлу/темну тему, шапку й підвал.
- Єдиний корінь: `GestureHandlerRootView → SafeAreaProvider → NavigationContainer`.

## Запуск

```bash
cd lab6-little-lemon
npm install
npx expo start
```

Далі відкрийте застосунок в Expo Go або development build, сумісному з Expo SDK 58.

Після додавання нативних залежностей (`react-native-screens`, `react-native-gesture-handler`, `react-native-reanimated`, `react-native-worklets`) власну development build потрібно перебудувати. Expo Go має бути версії, сумісної з SDK проєкту.

## Як перемикати варіант навігації

У `App.tsx` є рядок:

```tsx
const ActiveNavigator = StackFlow;
```

Замініть `StackFlow` на `TabsFlow` або `DrawerFlow` і повністю перезавантажте застосунок. Усі три файли залишаються в проєкті, одночасно активний лише один навігатор.

## Перевірка

```bash
npx tsc --noEmit
npx expo install --check
```

`npx expo install --check` може пропонувати оновити patch-версії `expo`, `expo-status-bar` і `react-native`. Згідно з методичкою, оновлювати Expo/React Native лише заради цієї роботи не потрібно.

### Stack

1. Початковий екран — `Login` із заголовком «Навчальна форма».
2. Порожня або некоректна форма не переходить далі.
3. Коректний email і непорожній пароль відкривають `Welcome`.
4. Стандартна кнопка «Назад» у заголовку повертає до форми.
5. Власна кнопка «Повернутися до форми» робить те саме.

### Tabs

1. Обидві вкладки доступні, мають підписи «Форма» і «Привітання» та іконки.
2. Пряме відкриття `Welcome` показує гостьове привітання без помилки.
3. Перехід через форму передає email.
4. Пароль не потрапляє в параметри маршруту.

### Drawer

1. Меню відкривається кнопкою в заголовку.
2. Пункти «Форма» і «Привітання» перемикають екрани.
3. Жест відкриття працює на підтримуваному пристрої.
4. Нижньої панелі вкладок немає.

## Структура

```text
App.tsx
index.ts
navigation/
  types.ts
  StackFlow.tsx
  TabsFlow.tsx
  DrawerFlow.tsx
screens/
  LoginScreen.tsx
  WelcomeScreen.tsx
  MenuFlatScreen.tsx
  MenuGroupedScreen.tsx
components/
  ScreenShell.tsx
  LittleLemonHeader.tsx
  LittleLemonFooter.tsx
  MenuItemRow.tsx
theme/
  palette.ts
  useAppColors.ts
assets/
  images/
    logo.png
```

## Примітка про безпечні відступи

`ScreenShell` приймає `safeBottom`. Для Stack і Drawer він додає нижній відступ під системний home indicator. У Tabs цей відступ уже враховує tab bar, тому там `safeBottom` не передається.
