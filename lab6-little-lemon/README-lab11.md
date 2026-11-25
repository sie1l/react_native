# Лабораторна робота №11. Fetch API у Little Lemon

Екран `RemoteMenu` завантажує меню з мережі й показує його через `FlatList`.

## Запуск

```bash
npm install
npx tsc --noEmit
npx expo start
```

У `App.tsx` активний навігатор — `StackFlow`. Шлях до екрана: Login → Welcome → кнопка «Меню» у заголовку.

## Джерело даних

`https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json`
(статичний JSON, пароль чи токен не потрібні; сервер повертає `Content-Type: text/plain`, тому JSON розбирається за контрактом).

## Файли

- `types/remoteMenu.ts` — тип позиції та стани завантаження
- `api/remoteMenu.ts` — адреса, перевірка структури (`parseRemoteMenu`), `fetchRemoteMenu`
- `hooks/useRemoteMenu.ts` — життєвий цикл запиту: AbortController, тайм-аут 15 с, повторна спроба
- `screens/RemoteMenuScreen.tsx` — екран, пошук за назвою, лічильник позицій
- `data/remoteMenu.sample.json` — локальний зразок для перевірки парсера

## Результати перевірки парсера (самостійна частина, п. 4)

| Випадок | Результат | Чи має приймати парсер |
| --- | --- | --- |
| ціна `"0"` | прийнято, price = 0 | так, безкоштовна позиція можлива |
| ціна `""` | помилка структури | ні, `Number("")` дало б хибний 0 |
| ціна `"-5"` | помилка ціни | ні, ціна не може бути від'ємною |
| повторний id | помилка дубліката | ні, id має бути унікальним ключем |
| `{"menu": []}` | порожній масив | так, це «Меню порожнє» |
| `{"menu": "wrong"}` | помилка контракту | ні |
