-- Лабораторна робота №13. Варіант 1: Університет.
-- Сутності: студенти, курси, зарахування.
-- Студенти й курси пов'язані «багато до багатьох» через проміжну таблицю enrollments.

PRAGMA foreign_keys = ON;

-- Студенти. Ім'я НЕ унікальне (можуть бути тезки), унікальний email.
CREATE TABLE students (
    id        INTEGER PRIMARY KEY,
    full_name TEXT    NOT NULL CHECK (length(trim(full_name)) > 0),
    email     TEXT    NOT NULL UNIQUE,
    year      INTEGER NOT NULL CHECK (year BETWEEN 1 AND 6)
);

-- Курси. Код курсу унікальний, кількість кредитів додатна.
CREATE TABLE courses (
    id      INTEGER PRIMARY KEY,
    code    TEXT    NOT NULL UNIQUE,
    title   TEXT    NOT NULL CHECK (length(trim(title)) > 0),
    credits INTEGER NOT NULL CHECK (credits > 0)
);

-- Зарахування студента на курс (подія / зв'язок).
-- Оцінка може бути NULL (ще не виставлена), інакше від 0 до 100.
-- UNIQUE(student_id, course_id): студента не можна зарахувати на той самий курс двічі.
-- Дата — текст у форматі YYYY-MM-DD.
CREATE TABLE enrollments (
    id          INTEGER PRIMARY KEY,
    student_id  INTEGER NOT NULL REFERENCES students(id),
    course_id   INTEGER NOT NULL REFERENCES courses(id),
    enrolled_on TEXT    NOT NULL,
    grade       INTEGER CHECK (grade IS NULL OR grade BETWEEN 0 AND 100),
    UNIQUE (student_id, course_id)
);
