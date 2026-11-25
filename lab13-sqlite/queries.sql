PRAGMA foreign_keys = ON;

-- 1. SELECT з явним переліком полів і ORDER BY: студенти за іменем.
SELECT id, full_name, email, year
FROM students
ORDER BY full_name, id;

-- 2. Дві умови WHERE + сортування + LIMIT: оцінка виставлена й не менша за 80,
--    від найвищої, лише три перші.
SELECT id, student_id, course_id, grade
FROM enrollments
WHERE grade IS NOT NULL AND grade >= 80
ORDER BY grade DESC
LIMIT 3;

-- 3. Додавання нового запису: новий студент.
INSERT INTO students (full_name, email, year)
VALUES ('Анна Гончар', 'anna.honchar@example.com', 1);

-- 4. Зміна одного запису за первинним ключем.
--    Є дві «Олени Коваль», тому змінюємо за id, а не за іменем.
SELECT id, full_name, year FROM students WHERE id = 3;
UPDATE students SET year = 4 WHERE id = 3;
SELECT id, full_name, year FROM students WHERE id IN (1, 3);   -- id = 1 лишився на 1 курсі

-- 5. Видалення одного запису за первинним ключем (дочірній запис, FK не заважає).
SELECT * FROM enrollments WHERE id = 10;
DELETE FROM enrollments WHERE id = 10;
SELECT * FROM enrollments WHERE id = 10;                       -- порожньо

-- 6. JOIN трьох таблиць: хто на який курс зарахований і з якою оцінкою.
SELECT s.full_name, c.code, c.title, e.enrolled_on, e.grade
FROM enrollments AS e
JOIN students AS s ON s.id = e.student_id
JOIN courses  AS c ON c.id = e.course_id
ORDER BY s.full_name, s.id, c.code;

-- 7. LEFT JOIN: усі курси, включно з «Історія науки» без зарахувань (student_id = NULL).
SELECT c.id, c.code, c.title, e.student_id
FROM courses AS c
LEFT JOIN enrollments AS e ON e.course_id = c.id
ORDER BY c.id, e.id;

-- 8а. Підсумок 1: кількість студентів на кожному курсі.
--     COUNT(e.id) для порожнього курсу дає 0 (COUNT(*) дав би 1).
SELECT c.id, c.title, COUNT(e.id) AS student_count
FROM courses AS c
LEFT JOIN enrollments AS e ON e.course_id = c.id
GROUP BY c.id, c.title
ORDER BY c.id;

-- 8б. Підсумок 2: кількість курсів і середня оцінка кожного студента.
--     AVG ігнорує NULL (оцінки, які ще не виставлені).
SELECT s.id, s.full_name,
       COUNT(e.id)            AS course_count,
       ROUND(AVG(e.grade), 1) AS avg_grade
FROM students AS s
JOIN enrollments AS e ON e.student_id = s.id
GROUP BY s.id, s.full_name
ORDER BY s.id;
