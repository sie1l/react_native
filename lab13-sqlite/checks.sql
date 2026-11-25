-- Негативні перевірки. Кожен INSERT МАЄ завершитися помилкою — це очікуваний результат.
-- Виконуйте по одній команді (виділіть і натисніть Execute selected).
PRAGMA foreign_keys = ON;

-- 1. Неправильний зовнішній ключ (студента 99 немає).
--    Очікується: FOREIGN KEY constraint failed
INSERT INTO enrollments (student_id, course_id, enrolled_on) VALUES (99, 1, '2026-09-10');

-- 2. NULL у забороненому полі.
--    Очікується: NOT NULL constraint failed: students.full_name
INSERT INTO students (full_name, email, year) VALUES (NULL, 'test1@example.com', 1);

-- 3. Значення проти CHECK (оцінка не може бути 150).
--    Очікується: CHECK constraint failed: grade IS NULL OR grade BETWEEN 0 AND 100
INSERT INTO enrollments (student_id, course_id, enrolled_on, grade) VALUES (6, 1, '2026-09-10', 150);

-- 4. Повтор UNIQUE (такий email уже є).
--    Очікується: UNIQUE constraint failed: students.email
INSERT INTO students (full_name, email, year) VALUES ('Тест', 'olena.koval1@example.com', 1);

-- 5. Повтор UNIQUE(student_id, course_id): студент 1 уже зарахований на курс 1.
--    Очікується: UNIQUE constraint failed: enrollments.student_id, enrollments.course_id
INSERT INTO enrollments (student_id, course_id, enrolled_on) VALUES (1, 1, '2026-09-10');

-- Після тестів: жодного з цих рядків у таблицях немає.
SELECT COUNT(*) AS bad_students FROM students WHERE full_name = 'Тест';   -- 0
SELECT COUNT(*) AS enrollments_total FROM enrollments;                    -- 10 на чистій базі, 9 після видалення в запиті 5
