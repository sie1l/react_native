# Лабораторна робота №13. Таблиці, зв'язки та CRUD-запити в SQLite

Варіант 1 — **Університет** (студенти, курси, зарахування). Усі дані вигадані.

## Файли

| Файл | Призначення |
| --- | --- |
| `lab13.sqlite` | готова база (схема + тестові дані) |
| `schema.sql` | створення таблиць і обмежень |
| `seed.sql` | тестові дані |
| `queries.sql` | 8 запитів: SELECT, WHERE/LIMIT, INSERT, UPDATE, DELETE, JOIN, LEFT JOIN, агрегати |
| `transaction.sql` | ROLLBACK і COMMIT |
| `checks.sql` | негативні перевірки обмежень |
| `build_and_verify.py` | перебудова бази й автоматична перевірка всіх скриптів |

Як відтворити: нова база в DB Browser for SQLite → Execute SQL → вставити `schema.sql`, виконати → `seed.sql`, виконати → Write Changes.
Перед роботою: `PRAGMA foreign_keys = ON;`, перевірка `PRAGMA foreign_keys;` має дати `1`.

## Схема зв'язків

```text
students (1) ──< enrollments (N)    enrollments.student_id → students.id
courses  (1) ──< enrollments (N)    enrollments.course_id  → courses.id
```

`students` ↔ `courses` — «багато до багатьох», тому є проміжна таблиця `enrollments`.

| Таблиця | Призначення | Поля | PK | FK |
| --- | --- | --- | --- | --- |
| `students` | студенти | id, full_name, email, year | id | — |
| `courses` | курси | id, code, title, credits | id | — |
| `enrollments` | зарахування студента на курс | id, student_id, course_id, enrolled_on, grade | id | student_id → students.id, course_id → courses.id |

Що може повторюватися: імена студентів (дві «Олени Коваль»), назви курсів, оцінки, роки.
Що унікальне: `students.email`, `courses.code`, пара `(student_id, course_id)` у `enrollments`, усі `id`.
Типи: дата — текст `YYYY-MM-DD`; оцінка — ціле 0..100 або NULL (ще не виставлена).
Обмеження: `NOT NULL`, `UNIQUE`, `CHECK` (рік 1–6, кредити > 0, оцінка 0–100, непорожні імена), `REFERENCES`.

Дані: `students` — 6 (один без зарахувань), `courses` — 5 (один, «Історія науки», без зарахувань), `enrollments` — 10.

## Негативні перевірки (`checks.sql`)

| № | Що перевіряємо | Очікувана відмова | Фактична відмова |
| --- | --- | --- | --- |
| 1 | студента 99 немає | FOREIGN KEY | `FOREIGN KEY constraint failed` |
| 2 | `NULL` у `students.full_name` | NOT NULL | `NOT NULL constraint failed: students.full_name` |
| 3 | оцінка 150 | CHECK | `CHECK constraint failed: grade IS NULL OR grade BETWEEN 0 AND 100` |
| 4 | повторний email | UNIQUE | `UNIQUE constraint failed: students.email` |
| 5 | студент 1 вдруге на курсі 1 | UNIQUE (пара) | `UNIQUE constraint failed: enrollments.student_id, enrollments.course_id` |

Після тестів неправильні рядки не додані.

## Результати запитів

- Студентів на курсі: CS101 — 3, CS201 — 3, MA101 — 2, EN101 — 1, «Історія науки» — **0** (LEFT JOIN).
- Середня оцінка: Олена Коваль (id 1) — 87.5, Марко — 70.0, Олена Коваль (id 3) — 77.5, Іван — 81.5, Софія — NULL (оцінок ще немає).
- Транзакція: оцінка `70 → 75` усередині, після `ROLLBACK` знову `70`, після `COMMIT` — `75`.

> Запити 3–5 змінюють базу. Для чистого повторення перебудуйте файл: `python build_and_verify.py`.
