# Лабораторна робота №10. HTTP-запити й відповіді в API-клієнті

Навчальна колекція з 12 збережених запитів до echo-сервісу **httpbin.org**.
Дані про страву вигадані. Справжні паролі, токени й персональні дані не
використовувалися.

## Клієнт і сервер

| Параметр | Значення |
| --- | --- |
| API-клієнт | Insomnia Desktop 13.4.0 (локальна колекція, без хмарної синхронізації) |
| Базовий сервер | `https://httpbin.org` |
| Резервний сервер | `https://httpbingo.org` (не використовувався) |
| Формат експорту | Insomnia Export v4 (`lab10-insomnia.json`) |
| Додатковий файл | Postman Collection v2.1 (`lab10-postman.json`) |

Якщо у вашій версії Insomnia інший номер, вкажіть його у звіті: `Help → About`
(або `Insomnia → About` на macOS).

## Файли

```text
lab10-http/
  lab10-insomnia.json      # основний експорт колекції
  lab10-postman.json       # резервний варіант для імпорту в Postman
  README.md                # цей файл
  Звіт_Лабораторна_10.docx # шаблон звіту з таблицею і місцями під скріншоти
  run-summary.json         # статуси, Content-Type, розміри, розібрані поля
  tools/                   # допоміжні скрипти, якими зібрано колекцію й звіт
  responses/               # фактичні тіла відповідей, отримані під час роботи
    01-get.json
    02-get-params.json
    03-post-form.json
    04-post-multipart.json
    05-post-json.json
    06-put.json
    07-patch.json
    08-delete.json
    09-status-204.txt
    10-status-404.txt
    11-status-500.txt
    12-get-post-405.html
```

## Імпорт колекції

1. Відкрити Insomnia.
2. На екрані входу вибрати **Use the local Scratch Pad** (або Local Vault),
   щоб колекція зберігалася локально.
3. Меню застосунку → **Import / Export** → **Import Data** → **From File**.
4. Вибрати `lab10-insomnia.json`.
5. Перевірити, що з'явилася колекція **Лабораторна 10 — HTTP** з 12 запитами.

Якщо версія Insomnia не приймає файл, імпортувати `lab10-postman.json`
(Postman також розуміє Insomnia-експорт, і навпаки).

Базову адресу можна не змінювати: вона вже в кожному запиті.

## Склад колекції

| № | Назва запиту | Метод і шлях | Параметри / заголовки | Body |
| --- | --- | --- | --- | --- |
| 01 | 01 GET — базовий | `GET /get` | немає | порожній |
| 02 | 02 GET — параметри й заголовки | `GET /get` | `title`, `category`, `limit`, `language=uk`; `Accept: application/json`, `X-Lab-Topic: 10` | порожній |
| 03 | 03 POST — URL-encoded form | `POST /post` | `Content-Type: application/x-www-form-urlencoded` (ставить клієнт) | `title`, `category`, `price` |
| 04 | 04 POST — Multipart Form | `POST /post` | `Content-Type: multipart/form-data; boundary=…` (ставить клієнт) | ті самі поля |
| 05 | 05 POST — JSON | `POST /post?source=lab10` | `Accept` і `Content-Type: application/json` | JSON-об'єкт страви |
| 06 | 06 PUT — представлення | `PUT /put` | `Content-Type: application/json` | той самий JSON, що в 05 |
| 07 | 07 PATCH — зміна ціни | `PATCH /patch` | `Content-Type: application/json` | `{"price": 135}` |
| 08 | 08 DELETE — echo | `DELETE /delete` | `Accept: application/json` | порожній |
| 09 | 09 GET — 204 | `GET /status/204` | немає | порожній |
| 10 | 10 GET — 404 | `GET /status/404` | немає | порожній |
| 11 | 11 GET — 500 | `GET /status/500` | немає | порожній |
| 12 | 12 GET — метод не дозволено | `GET /post` | немає | порожній |

## Навчальні дані

```json
{
  "title": "Гарбузовий суп із кмином",
  "category": "main",
  "price": 120,
  "available": true,
  "published": { "year": 2026, "month": 10, "day": 25 },
  "tags": ["vegan", "autumn"]
}
```

Форма (запити 03 і 04) передає ті самі `title`, `category`, `price`, але
значення `price` у формі є рядком `"120"` — так працюють текстові поля форми.

## Фактичні результати

Запити виконані 09.11.2026 через `https://httpbin.org`. Час відповіді залежить
від мережі й у звіті не фіксується як стала величина.

| № | Метод і шлях | Очікуваний статус | Фактичний статус | Що перевірено у відповіді |
| --- | --- | --- | --- | --- |
| 01 | `GET /get` | 200 | **200** | `args` — порожній об'єкт; є `headers`, `origin`, `url`; `Content-Type: application/json` |
| 02 | `GET /get` | 200 | **200** | `args.title`, `args.category=main`, `args.limit="3"`, `args.language="uk"`; у `headers` є `X-Lab-Topic: 10` |
| 03 | `POST /post` | 200 | **200** | `form.title`, `form.category`, `form.price="120"`; `json: null`; запит `application/x-www-form-urlencoded`, відповідь `application/json` |
| 04 | `POST /post` | 200 | **200** | ті самі поля у `form`; `json: null`; у echo-заголовках `multipart/form-data; boundary=…` |
| 05 | `POST /post` | 200 | **200** | `json.title`, `json.price=120` (число), `json.available=true`, `json.published.year=2026`, `json.tags[0]="vegan"`; `args.source="lab10"`; `form={}` |
| 06 | `PUT /put` | 200 | **200** | `json` містить повний об'єкт страви; `Content-Type: application/json` |
| 07 | `PATCH /patch` | 200 | **200** | `json = {"price": 135}`; `price` — число |
| 08 | `DELETE /delete` | 200 | **200** | `args={}`, `json: null`; тіло не передавалося |
| 09 | `GET /status/204` | 204 | **204** | тіло відсутнє (0 байт), `Content-Type` може бути відсутнім або службовим |
| 10 | `GET /status/404` | 404 | **404** | тіло відсутнє; статус змодельований сервісом навмисно |
| 11 | `GET /status/500` | 500 | **500** | тіло відсутнє; статус змодельований сервісом навмисно |
| 12 | `GET /post` | 405 | **405** | `Allow: OPTIONS, POST`; HTML-тіло `Method Not Allowed` |

Примітка: під час першого прогону запит 07 отримав від публічного сервісу
`429 Too Many Requests`. Після короткої паузи запит повторено й отримано
очікуваний `200`. Це обмеження публічного сервісу, а не помилка методу PATCH.

## Що показати на скріншотах

1. **Запит 02** — метод `GET`, URL із query parameters, статус `200`, блок
   `args` з усіма чотирма параметрами й `X-Lab-Topic` у `headers`.
2. **Запит 03** — `POST /post`, вкладка Body з полями URL-encoded форми,
   статус `200` і блок `form` з `price: "120"`.
3. **Запит 05** — `POST /post?source=lab10`, JSON-тіло, статус `200`, блок
   `json` з `published` і `tags`.
4. **Запит 09** — `GET /status/204`, статус `204`, порожня область відповіді.
5. **Запит 12** — `GET /post`, статус `405`, заголовок `Allow` або текст
   `Method Not Allowed`.

Для решти запитів у звіті достатньо таблиці.

## Самостійна частина

1. У запит **02** додано `language=uk`; параметр присутній у `args`.
2. У JSON запиту **05** додано `"tags": ["vegan", "autumn"]`;
   `json.tags[0]` = `"vegan"`.
3. До запиту **05** додано query parameter `source=lab10`; він є в `args`, а
   об'єкт страви залишився в `json`.
4. Умовні адреси для реального API меню (не надсилалися на сторонній сервер):

| Операція | Метод | Адреса | Тіло |
| --- | --- | --- | --- |
| Читання позиції з ID 16 | `GET` | `/menu-items/16` | немає |
| Створення нової позиції | `POST` | `/menu-items` | JSON позиції |
| Зміна лише ціни | `PATCH` | `/menu-items/16` | `{"price": 135}` |
| Видалення | `DELETE` | `/menu-items/16` | немає |

Для повної заміни представлення можна додатково використати
`PUT /menu-items/16`, але для зміни однієї ціни доречніший `PATCH`.

## Важливо

- `httpbin.org` — echo-сервіс: він повертає те, що отримав, але **не зберігає**
  страву. Успішний `POST` не доводить створення запису в базі.
- `204` — успіх без тіла. Відсутність JSON у відповіді тут є нормою.
- `404`, `405`, `500` і тайм-аут — різні види помилок. Тайм-аут узагалі не є
  HTTP-статусом.
- У загальнодоступних скріншотах варто приховати поле `origin` з IP-адресою.
